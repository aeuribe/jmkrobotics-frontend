'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  AlertCircle,
} from 'lucide-react';
import { Locale } from '@/features/Home/data/catalogData';

const quoteSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7),
  company: z.string().trim().optional(),
  comments: z.string().trim().max(1200).optional(),
});

export function QuickQuoteSection() {
  const locale = useLocale() as Locale;
  const isEs = locale === 'es';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    comments: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const parsed = quoteSchema.safeParse(formData);
    if (!parsed.success) {
      setValidationError(
        isEs
          ? 'Por favor verifique su nombre, correo electrónico y teléfono.'
          : 'Please verify your full name, valid email address, and phone number.',
      );
      return;
    }

    setStatus('submitting');
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="quote" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Context & Contact */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B81D2B]">
              {isEs ? 'Cotización' : 'Get a Quote'}
            </p>

            <h2 className="text-3xl font-black leading-[1.05] tracking-[-0.03em] text-[#09182E] sm:text-4xl">
              {isEs ? (
                <>
                  Cuéntenos qué necesita{' '}
                  <span className="text-[#0B2D5B]">para su línea.</span>
                </>
              ) : (
                <>
                  Tell us what you need{' '}
                  <span className="text-[#0B2D5B]">for your line.</span>
                </>
              )}
            </h2>

            <p className="text-sm leading-relaxed text-[#475569] sm:text-base">
              {isEs
                ? 'Déjenos sus datos y una breve descripción de su producto o proyecto. Un especialista de Services JMK LLC se comunicará con usted para asesorarle sin compromiso.'
                : 'Leave your contact info and a brief note about your project. A Services JMK LLC specialist will reach out to recommend the right equipment and pricing.'}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0B2D5B]/8 text-[#0B2D5B]">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#09182E]">
                    {isEs ? 'Respuesta rápida' : 'Fast Response'}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {isEs
                      ? 'Nuestro equipo revisa su proyecto y responde en menos de 24 horas.'
                      : 'Our team reviews your inquiry and replies within one business day.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#B81D2B]/10 text-[#B81D2B]">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#09182E]">
                    {isEs ? 'Asesoría y respaldo en EE. UU.' : 'US Advisory & Support'}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {isEs
                      ? 'Instalación, puesta en marcha y repuestos con Services JMK LLC.'
                      : 'Installation, commissioning, and local parts by Services JMK LLC.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#0B2D5B]/10 bg-[#F8FAFC] p-4 text-xs font-medium text-[#09182E]">
              <a
                href="tel:+17862587335"
                className="inline-flex items-center gap-2 hover:text-[#B81D2B]"
              >
                <Phone className="h-4 w-4 text-[#B81D2B]" />
                <span className="font-mono font-semibold">+1 (786) 258-7335</span>
              </a>
              <a
                href="mailto:info@servicesjmk.com"
                className="inline-flex items-center gap-2 hover:text-[#B81D2B]"
              >
                <Mail className="h-4 w-4 text-[#0B2D5B]" />
                <span>info@servicesjmk.com</span>
              </a>
            </div>
          </div>

          {/* Right Frictionless Lead Capture Form */}
          <div className="lg:col-span-7 rounded-3xl border border-[#0B2D5B]/12 bg-[#F8FAFC] p-6 shadow-[0_24px_60px_-24px_rgba(9,24,46,0.14)] sm:p-8">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black text-[#09182E]">
                    {isEs ? '¡Solicitud Recibida!' : 'Request Received!'}
                  </h3>
                  <p className="mx-auto max-w-md text-sm text-[#475569]">
                    {isEs
                      ? 'Gracias por contactarnos. Un asesor de Services JMK LLC se comunicará muy pronto con usted.'
                      : 'Thank you for reaching out. A Services JMK LLC specialist will be in touch with you shortly.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-2 rounded-full border border-[#0B2D5B]/20 bg-white px-5 py-2.5 text-xs font-bold text-[#0B2D5B] hover:bg-[#0B2D5B] hover:text-white transition-colors"
                  >
                    {isEs ? 'Enviar otra solicitud' : 'Submit another inquiry'}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  noValidate
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="quote-name" className="text-xs font-semibold text-[#334155]">
                        {isEs ? 'Nombre completo *' : 'Full name *'}
                      </label>
                      <input
                        id="quote-name"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                        placeholder={isEs ? 'Ej. Carlos Martínez' : 'e.g. Alex Carter'}
                        className="w-full rounded-xl border border-[#0B2D5B]/15 bg-white px-3.5 py-2.5 text-sm text-[#09182E] placeholder-[#94A3B8] focus:border-[#0B2D5B] focus:outline-none focus:ring-2 focus:ring-[#0B2D5B]/15"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="quote-email" className="text-xs font-semibold text-[#334155]">
                        {isEs ? 'Correo electrónico *' : 'Work email *'}
                      </label>
                      <input
                        id="quote-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="name@company.com"
                        className="w-full rounded-xl border border-[#0B2D5B]/15 bg-white px-3.5 py-2.5 text-sm text-[#09182E] placeholder-[#94A3B8] focus:border-[#0B2D5B] focus:outline-none focus:ring-2 focus:ring-[#0B2D5B]/15"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="quote-phone" className="text-xs font-semibold text-[#334155]">
                        {isEs ? 'Teléfono / WhatsApp *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        id="quote-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (786) 000-0000"
                        className="w-full rounded-xl border border-[#0B2D5B]/15 bg-white px-3.5 py-2.5 text-sm text-[#09182E] placeholder-[#94A3B8] focus:border-[#0B2D5B] focus:outline-none focus:ring-2 focus:ring-[#0B2D5B]/15"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="quote-company" className="text-xs font-semibold text-[#334155]">
                        {isEs ? 'Empresa (opcional)' : 'Company (optional)'}
                      </label>
                      <input
                        id="quote-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                        placeholder={isEs ? 'Nombre de su empresa' : 'Your company'}
                        className="w-full rounded-xl border border-[#0B2D5B]/15 bg-white px-3.5 py-2.5 text-sm text-[#09182E] placeholder-[#94A3B8] focus:border-[#0B2D5B] focus:outline-none focus:ring-2 focus:ring-[#0B2D5B]/15"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="quote-comments" className="text-xs font-semibold text-[#334155]">
                      {isEs
                        ? '¿Qué producto envasa o qué equipo está buscando?'
                        : 'What product are you packaging or looking to automate?'}
                    </label>
                    <textarea
                      id="quote-comments"
                      rows={4}
                      value={formData.comments}
                      onChange={(e) => setFormData((prev) => ({ ...prev, comments: e.target.value }))}
                      placeholder={
                        isEs
                          ? 'Cuéntenos brevemente sobre su producto, envase o necesidad...'
                          : 'Share a brief overview of your product, container, or project...'
                      }
                      className="w-full resize-none rounded-xl border border-[#0B2D5B]/15 bg-white px-3.5 py-2.5 text-sm text-[#09182E] placeholder-[#94A3B8] focus:border-[#0B2D5B] focus:outline-none focus:ring-2 focus:ring-[#0B2D5B]/15"
                    />
                  </div>

                  {validationError && (
                    <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-[#B81D2B]">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#B81D2B] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_28px_-8px_rgba(184,29,43,0.45)] transition-all hover:bg-[#0B2D5B] hover:shadow-[0_12px_28px_-8px_rgba(11,45,91,0.4)] disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    <span>
                      {status === 'submitting'
                        ? isEs
                          ? 'Enviando...'
                          : 'Sending...'
                        : isEs
                          ? 'Solicitar Cotización'
                          : 'Request a Quote'}
                    </span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
