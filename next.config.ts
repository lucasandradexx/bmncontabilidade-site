import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      /* Domínio principal do site */
      {
        protocol: "https",
        hostname: "barralcontabilidade.com.br",
        pathname: "/**",
      },
      /* Domínio de staging (usado nos banners) */
      {
        protocol: "https",
        hostname: "barralcontabilidade-com-br.us.stackstaging.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;