import type { NextConfig } from "next";

// Cabeçalhos de segurança enviados em todas as páginas.
const CABECALHOS_SEGURANCA = [
  // Ninguém de fora pode exibir o site num iframe (clickjacking). O CSP é a versão moderna;
  // o X-Frame-Options fica para navegadores antigos. Este CSP não restringe scripts.
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // O navegador não "adivinha" o tipo de um arquivo (ex.: upload disfarçado de imagem).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Sites externos recebem só o domínio de onde veio o clique, não o caminho completo.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Recursos que o site não usa ficam bloqueados (vale também para o mapa embutido).
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // Só HTTPS por 2 anos. Sem "preload" de propósito: sair da lista de preload leva meses.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: CABECALHOS_SEGURANCA }];
  },
  async redirects() {
    return [
      // BPO Financeiro passou a seguir o padrão /servicos/...
      {
        source: "/bpo-financeiro",
        destination: "/servicos/bpo-financeiro",
        permanent: true,
      },
      // As páginas de plano viraram o botão "Quero uma proposta".
      {
        source: "/bpo-financeiro/plano/:slug",
        destination: "/servicos/bpo-financeiro#planos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
