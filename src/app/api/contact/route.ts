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

  const tableRows = rows
    .map(
      ([label, val]) =>
        `<tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#475263;width:36%;font-size:13px;">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#0f141e;font-size:14px;">${escapeHtml(val)}</td>
        </tr>`,
    )
    .join('');

  const messageHtml = data.message
    ? `<div style="margin-top:20px;padding:16px;background:#f4f3ef;border-left:3px solid #9e1c28;color:#0f141e;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</div>`
    : '';

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:24px;background:#f4f3ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;">
      <div style="background:#0e131d;padding:20px 24px;color:#faf9f6;">
        <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#d15a65;font-weight:700;">JMK Robotics · Nuevo Lead</div>
        <h1 style="margin:6px 0 0;font-size:20px;font-weight:800;">Nueva Solicitud desde jmkrobotics.com</h1>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
        ${messageHtml}
      </div>
      <div style="padding:14px 24px;background:#faf9f6;border-top:1px solid #e5e7eb;font-size:11px;color:#6e7787;">
        Enviado automáticamente desde el formulario de jmkrobotics.com
      </div>
    </div>
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
