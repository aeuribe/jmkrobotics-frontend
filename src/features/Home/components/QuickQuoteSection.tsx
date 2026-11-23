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
    <section id="quote" className="relative bg-[#F4F3EF] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Context */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9E1C28]">
              {isEs ? 'Cotización' : 'Get a Quote'}
            </p>

            <h2 className="text-3xl font-black leading-[1.05] tracking-[-0.03em] text-[#0F141E] sm:text-4xl">
              {isEs ? (
                <>
                  Cuéntenos qué necesita{' '}
                  <span className="text-[#1E3A5F]">para su línea.</span>
                </>
              ) : (
                <>
                  Tell us what you need{' '}
                  <span className="text-[#1E3A5F]">for your line.</span>
                </>
              )}
            </h2>

            <p className="text-sm leading-relaxed text-[#475263] sm:text-base">
              {isEs
                ? 'Déjenos sus datos y una breve descripción de su producto o proyecto. Un especialista de JMK Robotics se comunicará con usted para asesorarle sin compromiso.'
                : 'Leave your contact info and a brief note about your project. A JMK Robotics specialist will reach out to recommend the right equipment and pricing.'}
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#0F141E]/[0.09] bg-[#FAF9F6] text-[#1E3A5F]">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F141E]">
                    {isEs ? 'Respuesta rápida' : 'Fast Response'}
                  </h3>
                  <p className="text-xs text-[#5C6575]">
                    {isEs
                      ? 'Nuestro equipo revisa su proyecto y responde en menos de 24 horas.'
                      : 'Our team reviews your inquiry and replies within one business day.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#0F141E]/[0.09] bg-[#FAF9F6] text-[#9E1C28]">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F141E]">
                    {isEs ? 'Asesoría y respaldo en EE. UU.' : 'US Advisory & Support'}
                  </h3>
                  <p className="text-xs text-[#5C6575]">
                    {isEs
                      ? 'Instalación, puesta en marcha y stock de repuestos desde Miami.'
                      : 'Installation, commissioning, and local spare parts out of Miami.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border border-[#0F141E]/[0.09] bg-[#FAF9F6] p-4 text-xs font-medium text-[#0F141E]">
              <a
                href="tel:+17862587335"
                className="inline-flex items-center gap-2 hover:text-[#9E1C28]"
              >
                <Phone className="h-4 w-4 text-[#9E1C28]" />
                <span className="font-mono font-semibold">+1 (786) 258-7335</span>
              </a>
              <a
                href="mailto:info@servicesjmk.com"
                className="inline-flex items-center gap-2 hover:text-[#9E1C28]"
              >
                <Mail className="h-4 w-4 text-[#1E3A5F]" />
                <span>info@servicesjmk.com</span>
              </a>
            </div>
          </div>

          {/* Right Elevated Porcelain Silk Form */}
          <div
            className="chamfer-card lg:col-span-7 border border-[#0F141E]/[0.10] bg-[#FAF9F6] p-6 sm:p-9"
            style={{ boxShadow: 'var(--shadow-float-stage)' }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black tracking-[-0.02em] text-[#0F141E]">
                    {isEs ? '¡Solicitud Recibida!' : 'Request Received!'}
                  </h3>
                  <p className="mx-auto max-w-md text-sm text-[#475263]">
                    {isEs
                      ? 'Gracias por contactarnos. Un asesor de JMK Robotics se comunicará muy pronto con usted.'
                      : 'Thank you for reaching out. A JMK Robotics specialist will be in touch with you shortly.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-2 border border-[#0F141E]/[0.18] bg-[#F4F3EF] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0F141E] transition-colors hover:bg-[#0E131D] hover:text-[#FAF9F6]"
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
                      <label htmlFor="quote-name" className="text-xs font-semibold text-[#2D3748]">
                        {isEs ? 'Nombre completo *' : 'Full name *'}
                      </label>
                      <input
                        id="quote-name"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                        placeholder={isEs ? 'Ej. Carlos Martínez' : 'e.g. Alex Carter'}
                        className="w-full border border-[#0F141E]/[0.12] bg-[#F4F3EF] px-3.5 py-2.5 text-sm text-[#0F141E] placeholder-[#8A94A6] transition-colors focus:border-[#1E3A5F] focus:bg-[#FAF9F6] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="quote-email" className="text-xs font-semibold text-[#2D3748]">
                        {isEs ? 'Correo electrónico *' : 'Work email *'}
                      </label>
                      <input
                        id="quote-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder={isEs ? 'nombre@empresa.com' : 'name@company.com'}
                        className="w-full border border-[#0F141E]/[0.12] bg-[#F4F3EF] px-3.5 py-2.5 text-sm text-[#0F141E] placeholder-[#8A94A6] transition-colors focus:border-[#1E3A5F] focus:bg-[#FAF9F6] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="quote-phone" className="text-xs font-semibold text-[#2D3748]">
                        {isEs ? 'Teléfono / WhatsApp *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        id="quote-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (786) 000-0000"
                        className="w-full border border-[#0F141E]/[0.12] bg-[#F4F3EF] px-3.5 py-2.5 text-sm text-[#0F141E] placeholder-[#8A94A6] transition-colors focus:border-[#1E3A5F] focus:bg-[#FAF9F6] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="quote-company" className="text-xs font-semibold text-[#2D3748]">
                        {isEs ? 'Empresa (opcional)' : 'Company (optional)'}
                      </label>
                      <input
                        id="quote-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                        placeholder={isEs ? 'Nombre de su empresa' : 'Your company'}
                        className="w-full border border-[#0F141E]/[0.12] bg-[#F4F3EF] px-3.5 py-2.5 text-sm text-[#0F141E] placeholder-[#8A94A6] transition-colors focus:border-[#1E3A5F] focus:bg-[#FAF9F6] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="quote-comments" className="text-xs font-semibold text-[#2D3748]">
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
                      className="w-full resize-none border border-[#0F141E]/[0.12] bg-[#F4F3EF] px-3.5 py-2.5 text-sm text-[#0F141E] placeholder-[#8A94A6] transition-colors focus:border-[#1E3A5F] focus:bg-[#FAF9F6] focus:outline-none"
                    />
                  </div>

                  {validationError && (
                    <div className="flex items-center gap-2 border border-[#9E1C28]/25 bg-[#9E1C28]/8 px-3.5 py-2.5 text-xs font-medium text-[#9E1C28]">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="chamfer-btn btn-satin-obsidian flex w-full items-center justify-center gap-2 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#FAF9F6] disabled:opacity-60"
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
