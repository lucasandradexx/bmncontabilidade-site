// src/lib/site.ts

// Defina NEXT_PUBLIC_SITE_URL no ambiente de deploy se o domínio final for diferente.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bmncontabilidade.com";
