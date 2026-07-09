import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/landing/whatsappButton";
import CookieNotice from "@/components/landing/cookieNotice";

import { SERVICOS, getServicoBySlug, getServicosRelacionados } from "@/lib/servicos";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const servico = getServicoBySlug(slug);

  if (!servico) {
    return {
      title: "Serviço não encontrado | BMN",
      description: "A página solicitada não foi encontrada.",
    };
  }

  return {
    title: servico.seo.title,
    description: servico.seo.description,
  };
}

export default async function ServicoPage({ params }: PageProps) {
  const { slug } = await params;
  const servico = getServicoBySlug(slug);

  if (!servico) notFound();

  const relacionados = getServicosRelacionados(servico.relacionados);

  return (
    <>
      <Header />

      <main className="bg-slate-50 min-h-screen">
        {/* HERO DO SERVIÇO */}
        <section className="bg-[#041d2c] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <Link href="/#hub" className="text-cyan-300 text-sm hover:text-cyan-200 transition-colors">
              ← Voltar
            </Link>

            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold">{servico.titulo}</h1>
            <p className="mt-3 text-white/85 max-w-3xl">{servico.resumo}</p>
          </div>
        </section>

        {/* CONTEÚDO DO SERVIÇO */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-3 gap-6">
          <article className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900">Visão geral</h2>
              <p className="mt-3 text-slate-700 leading-relaxed">{servico.descricao}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900">Benefícios</h2>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                {servico.beneficios.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-slate-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900">Etapas do atendimento</h2>
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                {servico.etapas.map((etapa) => (
                  <div key={etapa.titulo} className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                    <h3 className="font-semibold text-slate-900">{etapa.titulo}</h3>
                    <p className="mt-2 text-sm text-slate-700">{etapa.descricao}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ específico do serviço */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900">Dúvidas frequentes deste serviço</h2>
              <div className="mt-4 space-y-3">
                {servico.faq.map((item) => (
                  <details key={item.pergunta} className="rounded-xl border border-slate-200 p-4">
                    <summary className="cursor-pointer font-medium text-slate-900">{item.pergunta}</summary>
                    <p className="mt-2 text-slate-700">{item.resposta}</p>
                  </details>
                ))}
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900">Indicado para</h3>
              <ul className="mt-3 space-y-2">
                {servico.paraQuem.map((item) => (
                  <li key={item} className="text-sm text-slate-700 list-disc ml-5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900">Serviços relacionados</h3>
              <div className="mt-3 space-y-2">
                {relacionados.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/servicos/${rel.slug}`}
                    className="block rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    {rel.titulo}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CookieNotice />
    </>
  );
}