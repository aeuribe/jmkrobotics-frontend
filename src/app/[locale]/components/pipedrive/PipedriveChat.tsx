"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

const playbooks: Record<string, string> = {
  en: "aafb9f21-b60c-4b15-9fc4-2c8df4b0d115",
  es: "0d02eab8-91ca-4bcc-a3f3-17944a50dfcb",
};

export default function PipedriveChat() {
  const locale = useLocale();
  const playbookUuid = playbooks[locale] ?? playbooks.en;

  useEffect(() => {
    // Configuración para la carga inicial
    (window as any).pipedriveLeadboosterConfig = {
      base: "leadbooster-chat.pipedrive.com",
      companyId: 14324019,
      playbookUuid,
      version: 2,
    };

    (window as any).LeadBooster = {
      q: [],
      on: function (n: string, h: any) {
        this.q.push({ t: "o", n, h });
      },
      trigger: function (n: string) {
        this.q.push({ t: "t", n });
      },
    };

    const script = document.createElement("script");
    script.src = "https://leadbooster-chat.pipedrive.com/assets/loader.js";
    script.async = true;
    document.body.appendChild(script);

    // No necesitamos cleanup de recarga aquí porque confiamos en la navegación del Layout
  }, [playbookUuid]);

  return null;
}