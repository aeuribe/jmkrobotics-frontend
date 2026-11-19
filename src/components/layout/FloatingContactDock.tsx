'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Locale = 'en' | 'es';

const WHATSAPP_NUMBER = '17862587335';
const EASE = [0.22, 1, 0.36, 1] as const;

const quickChatSchema = z.object({
  name: z.string().trim().min(2),
  contact: z.string().trim().min(5),
  message: z.string().trim().min(4).max(1000),
});

const QUICK_PROMPTS: Record<Locale, string[]> = {
  en: [
    'I would like a quote for packaging machinery.',
    'Looking for a complete or high-speed line.',
    'Need technical support or spare parts.',
  ],
  es: [
    'Quisiera cotizar maquinaria de envasado.',
    'Busco una línea completa o de alta velocidad.',
    'Necesito soporte técnico o repuestos.',
  ],
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.32-1.66a11.86 11.86 0 0 0 5.74 1.47h.01c6.55 0 11.9-5.35 11.9-11.91 0-3.18-1.24-6.17-3.45-8.42ZM12.07 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.75.98 1-3.65-.24-.38a9.84 9.84 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.89-9.89 9.89Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function FloatingContactDock() {
  const locale = useLocale() as Locale;
  const isEs = locale === 'es';

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const prefilledWhatsAppText = encodeURIComponent(
    formData.message.trim() ||
      (isEs
        ? 'Hola JMK Robotics, me gustaría recibir información sobre maquinaria de envasado.'
        : 'Hi JMK Robotics, I would like information about your packaging machinery.'),
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${prefilledWhatsAppText}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const parsed = quickChatSchema.safeParse(formData);
    if (!parsed.success) {
      setErrorMsg(
        isEs
          ? 'Indique su nombre, teléfono o correo y su mensaje.'
          : 'Please enter your name, phone or email, and message.',
      );
      return;
    }

    setStatus('submitting');
    // Ready to wire into /api/contact or n8n lead webhook
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus('success');
  };

  const resetChat = () => {
    setFormData({ name: '', contact: '', message: '' });
    setStatus('idle');
    setErrorMsg(null);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Quick-Message Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label={isEs ? 'Escribir a JMK Robotics' : 'Message JMK Robotics'}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="w-[calc(100vw-2.5rem)] max-w-[370px] overflow-hidden rounded-3xl border border-[#0B2D5B]/15 bg-white shadow-[0_28px_70px_-16px_rgba(7,26,54,0.34)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#071A36] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-1.5 shadow-sm ring-2 ring-white/15">
                  <Image
                    src="/JMKRobotics.png"
                    alt="JMK Robotics"
                    width={36}
                    height={36}
                    className="h-auto w-full object-contain"
                  />
                  <span
                    className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#071A36]"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight">JMK Robotics</p>
                  <p className="text-[11px] text-slate-300">
                    {isEs
                      ? 'Escríbenos directo · Respuesta desde Miami'
                      : 'Direct message · Reply from Miami'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={isEs ? 'Cerrar chat' : 'Close chat'}
                className="rounded-full p-1.5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              {status === 'success' ? (
                <div className="py-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#09182E]">
                    {isEs ? '¡Mensaje enviado!' : 'Message sent!'}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#475569]">
                    {isEs
                      ? 'Nuestro equipo de Services JMK LLC te responderá a la brevedad.'
                      : 'Our Services JMK LLC team will reply to you shortly.'}
                  </p>
                  <button
                    type="button"
                    onClick={resetChat}
                    className="mt-1 rounded-full border border-[#0B2D5B]/20 px-4 py-1.5 text-xs font-semibold text-[#0B2D5B] hover:bg-[#0B2D5B] hover:text-white transition-colors"
                  >
                    {isEs ? 'Enviar otro mensaje' : 'Send another message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  {/* Quick Starter Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_PROMPTS[locale].map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, message: prompt }))}
                        className="rounded-full border border-[#0B2D5B]/12 bg-[#F8FAFC] px-2.5 py-1 text-[11px] font-medium text-[#334155] transition-colors hover:border-[#0B2D5B]/35 hover:text-[#0B2D5B]"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder={isEs ? 'Tu nombre *' : 'Your name *'}
                    aria-label={isEs ? 'Tu nombre' : 'Your name'}
                    className="w-full rounded-xl border border-[#0B2D5B]/15 bg-[#F8FAFC] px-3.5 py-2.5 text-xs text-[#09182E] placeholder-[#94A3B8] focus:border-[#0B2D5B] focus:bg-white focus:outline-none"
                  />

                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contact: e.target.value }))}
                    placeholder={isEs ? 'WhatsApp o correo electrónico *' : 'Phone / WhatsApp or email *'}
                    aria-label={isEs ? 'WhatsApp o correo electrónico' : 'Phone or email'}
                    className="w-full rounded-xl border border-[#0B2D5B]/15 bg-[#F8FAFC] px-3.5 py-2.5 text-xs text-[#09182E] placeholder-[#94A3B8] focus:border-[#0B2D5B] focus:bg-white focus:outline-none"
                  />

                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder={
                      isEs
                        ? '¿En qué te podemos ayudar? *'
                        : 'How can we help with your project? *'
                    }
                    aria-label={isEs ? 'Mensaje' : 'Message'}
                    className="w-full resize-none rounded-xl border border-[#0B2D5B]/15 bg-[#F8FAFC] px-3.5 py-2.5 text-xs text-[#09182E] placeholder-[#94A3B8] focus:border-[#0B2D5B] focus:bg-white focus:outline-none"
                  />

                  {errorMsg && (
                    <div className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-[11px] font-medium text-[#B81D2B]">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0B2D5B] py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#B81D2B] disabled:opacity-60"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>
                      {status === 'submitting'
                        ? isEs
                          ? 'Enviando...'
                          : 'Sending...'
                        : isEs
                          ? 'Enviar mensaje'
                          : 'Send message'}
                    </span>
                  </button>

                  {/* Direct WhatsApp Bridge */}
                  <div className="border-t border-[#0B2D5B]/8 pt-3 text-center">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 transition-colors hover:text-emerald-800"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      <span>
                        {isEs ? 'O escríbenos directo por WhatsApp' : 'Or chat directly on WhatsApp'}
                      </span>
                      <ExternalLink className="h-3 w-3 opacity-70" />
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unified Floating Dual-Action Capsule (Bottom-Right — Zero Left-Corner Clutter) */}
      <div className="flex items-center gap-1.5 rounded-full border border-[#0B2D5B]/15 bg-white/95 p-1.5 shadow-[0_14px_38px_-10px_rgba(7,26,54,0.28)] backdrop-blur-md">
        {/* 1-Click Direct WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={isEs ? 'Escribir por WhatsApp' : 'Chat on WhatsApp'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-transform hover:scale-105 hover:bg-[#1FB859]"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>

        {/* Quick-Message Chat Trigger */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isEs ? 'Abrir chat rápido' : 'Open quick message'}
          className={cn(
            'inline-flex h-11 items-center gap-2 rounded-full px-4 text-xs font-bold text-white transition-all',
            isOpen
              ? 'bg-[#B81D2B] hover:bg-[#9E1422]'
              : 'bg-[#0B2D5B] hover:bg-[#071A36]',
          )}
        >
          {isOpen ? (
            <>
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">{isEs ? 'Cerrar' : 'Close'}</span>
            </>
          ) : (
            <>
              <MessageSquare className="h-4 w-4" />
              <span>{isEs ? 'Escríbenos' : 'Message us'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
