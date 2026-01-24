"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

// 1. Definimos las interfaces para los objetos de Pipedrive
interface PipedriveLeadboosterConfig {
  base: string;
  companyId: number;
  playbookUuid: string;
  version: number;
}

interface LeadBooster {
  // Cambiamos any por unknown para mayor seguridad
  q: Array<{ t: string; n: string; h?: unknown }>;
  on: (n: string, h: unknown) => void;
  trigger: (n: string) => void;
}
// 2. Extendemos la interfaz global de Window
declare global {
  interface Window {
    pipedriveLeadboosterConfig: PipedriveLeadboosterConfig;
    LeadBooster: LeadBooster;
  }
}

const playbooks: Record<string, string> = {
  en: "aafb9f21-b60c-4b15-9fc4-2c8df4b0d115",
  es: "0d02eab8-91ca-4bcc-a3f3-17944a50dfcb",
};

export default function PipedriveChat() {
  const locale = useLocale();
  const playbookUuid = playbooks[locale] ?? playbooks.en;

  useEffect(() => {
    // 3. Ahora podemos asignar sin 'as any' y con autocompletado
    window.pipedriveLeadboosterConfig = {
      base: "leadbooster-chat.pipedrive.com",
      companyId: 14324019,
      playbookUuid,
      version: 2,
    };

    window.LeadBooster = {
      q: [],
      on: function (n: string, h: unknown) {
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

  }, [playbookUuid]);

  return null;
}