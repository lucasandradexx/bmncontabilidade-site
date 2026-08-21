import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";
import { SERVICOS } from "@/lib/servicos";

const PLANOS_BPO = ["essencial", "performance", "estrategico"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paginasEstaticas: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/bpo-financeiro`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const paginasServicos: MetadataRoute.Sitemap = SERVICOS.map((servico) => ({
    url: `${SITE_URL}/servicos/${servico.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const paginasPlanosBpo: MetadataRoute.Sitemap = PLANOS_BPO.map((slug) => ({
    url: `${SITE_URL}/bpo-financeiro/plano/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...paginasEstaticas, ...paginasServicos, ...paginasPlanosBpo];
}
