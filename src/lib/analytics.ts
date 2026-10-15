// src/lib/analytics.ts
// Eventos de conversão enviados ao Google Tag Manager, Google Analytics 4 e Pixel da Meta.
// Cada ferramenta só recebe eventos se o respectivo ID estiver configurado no ambiente.

type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function enviar(eventoGa: string, eventoMeta: string, params: Params) {
  if (typeof window === "undefined") return;

  window.dataLayer?.push({ event: eventoGa, ...params });
  window.gtag?.("event", eventoGa, params);
  window.fbq?.("track", eventoMeta, params);
}

// Clique em qualquer link do WhatsApp → "Contato" na Meta.
export function trackWhatsappClick(origem: string) {
  enviar("whatsapp_click", "Contact", { origem });
}

// Envio de formulário → "Lead" na Meta e "generate_lead" no GA4.
export function trackLead(origem: string) {
  enviar("generate_lead", "Lead", { origem });
}
