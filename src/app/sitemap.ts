import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";
import { SERVICOS } from "@/lib/servicos";
import { getTodosSlugs } from "@/lib/blog";

const PAGINAS: { caminho: string; prioridade: number }[] = [
  { caminho: "", prioridade: 1 },
  { caminho: "/diagnostico-fiscal", prioridade: 0.9 },
  { caminho: "/contabilidade-estrategica", prioridade: 0.9 },
  { caminho: "/reforma-tributaria", prioridade: 0.9 },
  { caminho: "/tecnologia", prioridade: 0.7 },
  { caminho: "/atendimento-digital", prioridade: 0.7 },
  { caminho: "/politica-de-privacidade", prioridade: 0.2 },
  { caminho: "/termos-de-uso", prioridade: 0.2 },
];

// Revalida para posts agendados entrarem no sitemap sem novo deploy.
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paginasEstaticas: MetadataRoute.Sitemap = PAGINAS.map((p) => ({
    url: `${SITE_URL}${p.caminho}`,
    changeFrequency: "monthly",
    priority: p.prioridade,
  }));

  const paginasServicos: MetadataRoute.Sitemap = SERVICOS.map((servico) => ({
    url: `${SITE_URL}/servicos/${servico.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const posts = await getTodosSlugs();
  const paginasBlog: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.atualizadoEm,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...paginasEstaticas, ...paginasServicos, ...paginasBlog];
}
