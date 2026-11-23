'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { InteractivePrecisionField } from '@/components/ui/InteractivePrecisionField';

const contactSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  subject: z.string().min(1),
  message: z.string().trim().min(5).max(2000),
});

const ContactUs: React.FC = () => {
  const locale = useLocale();
  const isEs = locale === 'es';
  const t = useTranslations('contact');
  const searchParams = useSearchParams();
  const machineParam = searchParams.get('machine');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: machineParam ? 'Product Inquiry' : 'General',
    message: '',
  });

  useEffect(() => {
    if (!machineParam) return;
    const readableMachine = machineParam.replace(/-/g, ' ');
    setFormData((prev) => ({
      ...prev,
      subject: 'Product Inquiry',
      message:
        prev.message ||
        (isEs
          ? `Hola, me gustaría solicitar información y cotización sobre: ${readableMachine}.`
          : `Hi, I would like to request information and a quote for: ${readableMachine}.`),
    }));
  }, [machineParam, isEs]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      setErrorMessage(
        isEs
          ? 'Por favor verifique su nombre, correo electrónico válido y mensaje.'
          : 'Please enter your name, a valid email address, and your message.',
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const composedMessage = formData.phone
        ? `[${formData.subject}] Phone: ${formData.phone}\n\n${formData.message}`
        : `[${formData.subject}]\n\n${formData.message}`;

      const response = await fetch(
        'https://servicesjmk-backend.onrender.com/enviar-correo-robotics',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name: formData.fullName,
            email: formData.email,
            message: composedMessage,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(t('form.error.text'));
      }

      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'General',
        message: '',
      });
    } catch {
      setErrorMessage(
        isEs
          ? 'No pudimos enviar el mensaje en este momento. Puede escribirnos directo por WhatsApp o a info@servicesjmk.com.'
          : 'Could not send your message right now. Please reach out via WhatsApp or info@servicesjmk.com.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative overflow-hidden bg-[#F4F3EF] text-[#0F141E]">
      {/* Clean Hero Header */}
      <section className="relative overflow-hidden border-b border-[#0F141E]/[0.09] bg-[#FAF9F6] py-14 lg:py-20">
        <InteractivePrecisionField theme="light" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9E1C28]">
              JMK Robotics · Miami, FL
            </p>
            <div className="mt-4 h-[3px] w-14 bg-[#9E1C28]" />
            <h1 className="mt-5 text-4xl font-black tracking-[-0.03em] text-[#0F141E] sm:text-5xl lg:text-6xl">
              {isEs ? 'Conversemos sobre su proyecto.' : 'Connect with our team.'}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#475569] sm:text-lg">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            {/* Contact Form */}
            <div className="rounded-[2px] border border-[#0F141E]/[0.09] bg-[#FAF9F6] p-6 shadow-[0_20px_50px_-24px_rgba(9,24,46,0.14)] sm:p-10 lg:col-span-7">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[2px] bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-black text-[#0F141E]">
                      {t('form.success.title')}
                    </h2>
                    <p className="mx-auto max-w-md text-sm text-[#475569]">
                      {t('form.success.text')}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-2 rounded-[2px] border border-[#0B2D5B]/20 px-5 py-2.5 text-xs font-bold text-[#1E3A5F] transition-colors hover:bg-[#0E131D] hover:text-white"
                    >
                      {isEs ? 'Enviar otro mensaje' : 'Send another message'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-2xl font-black tracking-tight text-[#0F141E]">
                      {t('form.title')}
                    </h2>
                    <p className="mt-1.5 text-sm text-[#5C6575]">{t('form.subtitle')}</p>

                    <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label htmlFor="fullName" className="text-xs font-semibold text-[#334155]">
                            {t('form.fields.fullName.label')} *
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            placeholder={t('form.fields.fullName.placeholder')}
                            className="w-full rounded-[2px] border border-[#0F141E]/[0.13] bg-[#F4F3EF] px-4 py-3 text-sm text-[#0F141E] placeholder-[#94A3B8] focus:border-[#0B2D5B] focus:bg-[#FAF9F6] focus:outline-none focus:ring-2 focus:ring-[#0B2D5B]/15"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="email" className="text-xs font-semibold text-[#334155]">
                            {t('form.fields.email.label')} *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder={t('form.fields.email.placeholder')}
                            className="w-full rounded-[2px] border border-[#0F141E]/[0.13] bg-[#F4F3EF] px-4 py-3 text-sm text-[#0F141E] placeholder-[#94A3B8] focus:border-[#0B2D5B] focus:bg-[#FAF9F6] focus:outline-none focus:ring-2 focus:ring-[#0B2D5B]/15"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label htmlFor="phone" className="text-xs font-semibold text-[#334155]">
                            {isEs ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (786) 000-0000"
                            className="w-full rounded-[2px] border border-[#0F141E]/[0.13] bg-[#F4F3EF] px-4 py-3 text-sm text-[#0F141E] placeholder-[#94A3B8] focus:border-[#0B2D5B] focus:bg-[#FAF9F6] focus:outline-none focus:ring-2 focus:ring-[#0B2D5B]/15"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="subject" className="text-xs font-semibold text-[#334155]">
                            {t('form.fields.subject.label')}
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full rounded-[2px] border border-[#0F141E]/[0.13] bg-[#F4F3EF] px-4 py-3 text-sm text-[#0F141E] focus:border-[#0B2D5B] focus:bg-[#FAF9F6] focus:outline-none focus:ring-2 focus:ring-[#0B2D5B]/15"
                          >
                            <option value="General">{t('form.fields.subject.options.general')}</option>
                            <option value="Product Inquiry">{t('form.fields.subject.options.product')}</option>
                            <option value="Support">{t('form.fields.subject.options.support')}</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="message" className="text-xs font-semibold text-[#334155]">
                          {t('form.fields.message.label')} *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          placeholder={t('form.fields.message.placeholder')}
                          className="w-full resize-none rounded-[2px] border border-[#0F141E]/[0.13] bg-[#F4F3EF] px-4 py-3 text-sm text-[#0F141E] placeholder-[#94A3B8] focus:border-[#0B2D5B] focus:bg-[#FAF9F6] focus:outline-none focus:ring-2 focus:ring-[#0B2D5B]/15"
                        />
                      </div>

                      {errorMessage && (
                        <div className="flex items-start gap-2 rounded-[2px] border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-[#9E1C28]">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full items-center justify-center gap-2 rounded-[2px] bg-[#9E1C28] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_12px_28px_-8px_rgba(184,29,43,0.45)] transition-all hover:bg-[#0E131D] disabled:opacity-60"
                      >
                        <Send className="h-4 w-4" />
                        <span>
                          {isSubmitting ? t('form.submit.loading') : t('form.submit.idle')}
                        </span>
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Contact Details Card */}
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-[2px] obsidian-stage p-7 text-white sm:p-9">
                <h3 className="text-xl font-bold">{t('info.title')}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  {t('info.text')}
                </p>

                <div className="mt-7 space-y-5">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] bg-white/10 text-[#F87171]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {t('info.email.label')}
                      </p>
                      <a
                        href="mailto:info@servicesjmk.com"
                        className="mt-0.5 block text-sm font-semibold text-white hover:text-[#F87171]"
                      >
                        info@servicesjmk.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] bg-white/10 text-[#F87171]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {t('info.phone.label')}
                      </p>
                      <a
                        href="tel:+17862587335"
                        className="mt-0.5 block font-mono text-sm font-semibold text-white hover:text-[#F87171]"
                      >
                        +1 (786) 258-7335
                      </a>
                      <a
                        href="https://wa.me/17862587335?text=Hello%20JMK%20Robotics%2C%20I%20would%20like%20more%20information."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:underline"
                      >
                        <span>{isEs ? 'Escribir por WhatsApp' : 'Message on WhatsApp'}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] bg-white/10 text-[#F87171]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {isEs ? 'Base de Operaciones' : 'Location'}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-white">
                        Miami, Florida — USA
                      </p>
                      <p className="text-xs text-slate-400">
                        {isEs
                          ? 'Atención en inglés y español'
                          : 'Support in English and Spanish'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Clock className="h-4 w-4 text-[#F87171]" />
                    <span>{t('info.responseTime.title')}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {t('info.responseTime.text')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
