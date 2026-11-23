import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

export const runtime = 'nodejs';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const ipRequests = new Map<string, number[]>();

const contactPayloadSchema = z
  .object({
    fullName: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(160).optional().or(z.literal('')),
    phone: z.string().trim().max(60).optional().or(z.literal('')),
    contact: z.string().trim().max(160).optional().or(z.literal('')),
    company: z.string().trim().max(160).optional().or(z.literal('')),
    subject: z.string().trim().max(160).optional().or(z.literal('')),
    message: z.string().trim().max(2500).optional().or(z.literal('')),
    source: z.enum(['home-quote', 'contact-page', 'floating-dock']).default('contact-page'),
    locale: z.enum(['en', 'es']).default('en'),
    website: z.string().max(100).optional(), // honeypot
  })
  .refine((data) => Boolean(data.email || data.phone || data.contact), {
    message: 'At least one contact method (email or phone) is required.',
  });

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (ipRequests.get(ip) ?? []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequests.set(ip, recent);
    return true;
  }
  ipRequests.set(ip, [...recent, now]);
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseRecipients(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((addr) => addr.trim())
    .filter((addr) => addr.includes('@'));
}

const SOURCE_LABELS: Record<'home-quote' | 'contact-page' | 'floating-dock', string> = {
  'home-quote': 'Home — Cotización Rápida / Quick Quote',
  'contact-page': 'Página de Contacto / Contact Page',
  'floating-dock': 'Chat Flotante / Floating Quick Chat',
};

function buildEmailHtml(data: z.infer<typeof contactPayloadSchema>): string {
  const rows: Array<[string, string]> = [
    ['Origen / Source', SOURCE_LABELS[data.source]],
    ['Nombre / Name', data.fullName],
    ...(data.company ? [['Empresa / Company', data.company] as [string, string]] : []),
    ...(data.email ? [['Correo / Email', data.email] as [string, string]] : []),
    ...(data.phone ? [['Teléfono / Phone', data.phone] as [string, string]] : []),
    ...(data.contact && !data.email && !data.phone
      ? [['Contacto / Contact', data.contact] as [string, string]]
      : []),
    ...(data.subject ? [['Asunto / Subject', data.subject] as [string, string]] : []),
    ['Idioma / Locale', data.locale.toUpperCase()],
  ];

  const fieldBlocks = rows
    .map(
      ([label, val]) =>
        `<div style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
          <div style="font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;margin-bottom:3px;">${escapeHtml(label)}</div>
          <div style="font-size:14px;color:#0f141e;line-height:1.45;word-break:break-word;overflow-wrap:anywhere;">${escapeHtml(val)}</div>
        </div>`,
    )
    .join('');

  const messageHtml = data.message
    ? `<div style="margin-top:18px;padding:14px 16px;background:#f4f3ef;border-left:3px solid #9e1c28;color:#0f141e;font-size:14px;line-height:1.6;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;">${escapeHtml(data.message)}</div>`
    : '';

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>
  <body style="margin:0;padding:16px 12px;background:#f4f3ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:580px;width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #e2e8f0;">
            <tr>
              <td style="background:#0e131d;padding:20px 20px;color:#faf9f6;">
                <div style="font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#d15a65;font-weight:700;">JMK Robotics · Nuevo Lead</div>
                <h1 style="margin:6px 0 0;font-size:19px;line-height:1.25;font-weight:800;color:#faf9f6;">Nueva solicitud desde <a href="https://jmkrobotics.com" style="color:#93c5fd;text-decoration:none;">jmkrobotics.com</a></h1>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 20px;">
                ${fieldBlocks}
                ${messageHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:14px 20px;background:#faf9f6;border-top:1px solid #e5e7eb;font-size:11px;color:#6e7787;">
                Enviado automáticamente desde el formulario de <a href="https://jmkrobotics.com" style="color:#2563eb;text-decoration:underline;">jmkrobotics.com</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 },
      );
    }

    const rawBody: unknown = await req.json();
    const parsed = contactPayloadSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form submission.', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const data = parsed.data;

    // Silent honeypot success for bots
    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com';
    const smtpPort = Number(process.env.SMTP_PORT || '587');
    const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;
    const smtpUser = process.env.SMTP_USER || 'noreply@servicesjmk.com';
    const smtpPass = process.env.SMTP_PASS || process.env.MAIL_PASS;
    const smtpFrom = process.env.SMTP_FROM || smtpUser;
    const recipients = parseRecipients(
      process.env.CONTACT_RECIPIENTS ||
        'juribe@servicesjmk.com,kmendez@servicesjmk.com,aeuribe@servicesjmk.com',
    );

    if (!smtpHost || !smtpUser || !smtpPass || recipients.length === 0) {
      console.error('[api/contact] Missing SMTP password (SMTP_PASS / MAIL_PASS) or CONTACT_RECIPIENTS.');
      return NextResponse.json(
        { error: 'Email service is not configured on the server.' },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const replyToEmail =
      data.email ||
      (data.contact && data.contact.includes('@') ? data.contact : undefined);

    const subjectLine = `[JMK Robotics] ${data.subject || SOURCE_LABELS[data.source]} — ${data.fullName}`;

    await transporter.sendMail({
      from: `"JMK Robotics Web" <${smtpFrom}>`,
      to: recipients,
      replyTo: replyToEmail,
      subject: subjectLine,
      text: [
        `Origen: ${SOURCE_LABELS[data.source]}`,
        `Nombre: ${data.fullName}`,
        data.company ? `Empresa: ${data.company}` : null,
        data.email ? `Correo: ${data.email}` : null,
        data.phone ? `Teléfono: ${data.phone}` : null,
        data.contact ? `Contacto: ${data.contact}` : null,
        data.subject ? `Asunto: ${data.subject}` : null,
        '',
        data.message || '',
      ]
        .filter(Boolean)
        .join('\n'),
      html: buildEmailHtml(data),
    });

    return NextResponse.json({ ok: true, recipientsCount: recipients.length });
  } catch (error) {
    console.error('[api/contact] Failed to deliver inquiry email:', error);
    return NextResponse.json(
      { error: 'Unable to send your inquiry right now. Please try again later.' },
      { status: 500 },
    );
  }
}
