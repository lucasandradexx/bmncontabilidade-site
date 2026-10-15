import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
