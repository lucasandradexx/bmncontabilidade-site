import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/landing/whatsappButton";
import CookieNotice from "@/components/landing/cookieNotice";
import LeadForm from "@/components/leadForm";

import {
  SERVICOS,
  SLUGS_COM_FORM,
  getServicoBySlug,
  getServicosRelacionados,
  mensagemWhatsappServico,
} from "@/lib/servicos";
import { waLink } from "@/lib/empresa";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// BPO Financeiro e BPO Fiscal têm páginas próprias em /servicos/bpo-*.
const SLUGS_COM_PAGINA_PROPRIA = new Set(["bpo-financeiro", "bpo-fiscal"]);

export function generateStaticParams() {
  return SERVICOS.filter((s) => !SLUGS_COM_PAGINA_PROPRIA.has(s.slug)).map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const servico = getServicoBySlug(slug);

  if (!servico) {
    return {
      title: "Serviço não encontrado",
      description: "A página solicitada não foi encontrada.",
    };
  }

  return {
    title: servico.seo.title,
    description: servico.seo.description,
  };
}

const CARD =
  "rounded-2xl border border-cyan-100/20 bg-gradient-to-br from-[#0b3f5e] to-secondary/60 p-6 text-slate-100 backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";

export default async function ServicoPage({ params }: PageProps) {
  const { slug } = await params;
  const servico = getServicoBySlug(slug);

  if (!servico) notFound();

  const relacionados = getServicosRelacionados(servico.relacionados);
  const exibirFormulario = SLUGS_COM_FORM.has(servico.slug);
  const mensagemWhatsapp = mensagemWhatsappServico(servico);

  return (
    <>
      <Header />

      <main className="gradient-primary min-h-screen bg-slate-50">
        {/* HERO */}
        <section className="bg-[#041d2c] text-white">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <Link
              href="/#servicos"
              className="text-sm text-cyan-300 transition-colors hover:text-cyan-200"
            >
              ← Voltar
            </Link>

            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{servico.titulo}</h1>
            <p className="mt-3 max-w-3xl text-white/85">{servico.resumo}</p>

            <a
              href={waLink(mensagemWhatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-black uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300"
            >
              <FaWhatsapp className="text-base" />
              Falar no WhatsApp
            </a>
          </div>
        </section>

        {/* CONTEÚDO */}
        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
          <article className="space-y-6 lg:col-span-2">
            <div className={CARD}>
              <h2 className="text-xl font-bold text-white">Visão geral</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-slate-100/90">
                {servico.descricao.split("\n\n").map((paragrafo, index) => (
                  <p key={index}>{paragrafo}</p>
                ))}
              </div>
            </div>

            <div className={CARD}>
              <h2 className="text-xl font-bold text-white">Benefícios</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {servico.beneficios.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-cyan-100/20 bg-[#0f4f72]/45 px-4 py-3 text-slate-100/95"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={CARD}>
              <h2 className="text-xl font-bold text-white">Etapas do atendimento</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {servico.etapas.map((etapa) => (
                  <div
                    key={etapa.titulo}
                    className="rounded-xl border border-cyan-100/20 bg-[#0f4f72]/45 p-4"
                  >
                    <h3 className="font-semibold text-white">{etapa.titulo}</h3>
                    <p className="mt-2 text-sm text-slate-100/90">{etapa.descricao}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={CARD}>
              <h2 className="text-xl font-bold text-white">Dúvidas frequentes deste serviço</h2>

              <div className="mt-4 space-y-3">
                {servico.faq.map((item) => (
                  <details
                    key={item.pergunta}
                    className="group rounded-xl border border-cyan-100/20 bg-[#0f4f72]/40 p-4 transition-colors duration-200 hover:border-cyan-300/35 hover:bg-cyan-400/10"
                  >
                    <summary className="cursor-pointer font-medium text-white transition-colors duration-200 group-hover:text-cyan-100">
                      {item.pergunta}
                    </summary>
                    <p className="mt-2 text-slate-100/90">{item.resposta}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className={CARD}>
              <h3 className="font-bold text-white">Indicado para</h3>
              <ul className="mt-3 space-y-2">
                {servico.paraQuem.map((item) => (
                  <li key={item} className="ml-5 list-disc text-sm text-slate-100/95">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={CARD}>
              <h3 className="font-bold text-white">Serviços relacionados</h3>
              <div className="mt-3 space-y-2">
                {relacionados.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/servicos/${rel.slug}`}
                    className="block rounded-lg border border-cyan-100/20 bg-[#0f4f72]/40 px-3 py-2 text-sm text-slate-100/95 transition-colors hover:border-cyan-300/35 hover:bg-cyan-400/10"
                  >
                    {rel.titulo}
                  </Link>
                ))}
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-cyan-300/30 bg-[#041d2c] p-6 text-slate-100">
              <h2 className="text-lg font-bold text-white">{servico.cta.titulo}</h2>
              <p className="mt-2 text-sm text-slate-100/85">{servico.cta.descricao}</p>
              <a
                href={waLink(mensagemWhatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300"
              >
                <FaWhatsapp className="text-base" />
                {servico.cta.botaoTexto}
              </a>
              <Link
                href="/diagnostico-fiscal"
                className="mt-3 block text-center text-sm text-cyan-200 underline hover:text-white"
              >
                Ou faça o Diagnóstico Fiscal gratuito
              </Link>
            </div>

            {exibirFormulario ? (
              <div className="rounded-2xl border border-cyan-100/20 bg-[#0b3f5e]/55 p-6 text-slate-100 backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <h2 className="font-bold text-white">Prefere que a gente chame você?</h2>
                <p className="mt-2 mb-5 text-sm text-slate-100/85">
                  Preencha os dados abaixo e nossa equipe entra em contato pelo WhatsApp.
                </p>
                <LeadForm
                  origem={servico.titulo}
                  variante="escuro"
                  colunas={1}
                  textoBotao="Enviar solicitação"
                />
              </div>
            ) : null}
          </aside>
        </section>
      </main>

      <Footer />
      <WhatsAppButton mensagem={mensagemWhatsapp} />
      <CookieNotice />
    </>
  );
}
