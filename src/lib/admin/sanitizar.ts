// Limpa o HTML do editor antes de salvar: só passam as tags que o blog sabe exibir.
import "server-only";
import sanitizeHtml from "sanitize-html";

export function sanitizarConteudo(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "h2", "h3", "strong", "em", "u", "s",
      "a", "ul", "ol", "li", "blockquote", "hr", "img",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https"] },
    allowProtocolRelative: false,
    transformTags: {
      // Links externos abrem em nova aba e sem passar autoridade de SEO de graça.
      a: (tagName, attribs) => {
        const href = attribs.href ?? "#";
        const novos: Record<string, string> = { href };
        if (/^https?:\/\//i.test(href)) {
          novos.target = "_blank";
          novos.rel = "noopener noreferrer nofollow";
        }
        return { tagName, attribs: novos };
      },
    },
  }).trim();
}

// Texto puro do HTML, para contar palavras.
export function textoPuro(html: string) {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
}

export function calcularTempoLeitura(html: string) {
  const palavras = textoPuro(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(palavras / 200));
}
