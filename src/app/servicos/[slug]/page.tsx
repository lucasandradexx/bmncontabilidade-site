import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/landing/whatsappButton";
import CookieNotice from "@/components/landing/cookieNotice";

import {
  SERVICOS,
  SLUGS_COM_FORM,
  getServicoBySlug,
  getServicosRelacionados,
} from "@/lib/servicos";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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

  // Se SLUGS_COM_FORM for Set, troque para: SLUGS_COM_FORM.has(servico.slug)
  const exibirFormulario = SLUGS_COM_FORM.has(servico.slug);
  const tituloFormulario =
    servico.slug === "bpo-financeiro"
      ? "Não sabe qual o plano ideal para sua empresa? Responda esse formulário e lhe auxiliaremos na escolha"
      : "Solicitar atendimento";

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

            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              {servico.titulo}
            </h1>
            <p className="mt-3 max-w-3xl text-white/85">{servico.resumo}</p>
          </div>
        </section>

        {/* CONTEÚDO */}
        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
          <article className={`space-y-6 ${exibirFormulario ? "lg:col-span-2" : "lg:col-span-3"}`}>
            <div className="rounded-2xl border border-cyan-100/20 bg-[#0b3f5e]/55 p-6 text-slate-100 backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <h2 className="text-xl font-bold text-white">Visão geral</h2>
              <p className="mt-3 leading-relaxed text-slate-100/90">
                {servico.descricao}
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-100/20 bg-[#0b3f5e]/55 p-6 text-slate-100 backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
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

            <div className="rounded-2xl border border-cyan-100/20 bg-[#0b3f5e]/55 p-6 text-slate-100 backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <h2 className="text-xl font-bold text-white">Etapas do atendimento</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {servico.etapas.map((etapa) => (
                  <div
                    key={etapa.titulo}
                    className="rounded-xl border border-cyan-100/20 bg-[#0f4f72]/45 p-4"
                  >
                    <h3 className="font-semibold text-white">{etapa.titulo}</h3>
                    <p className="mt-2 text-sm text-slate-100/90">
                      {etapa.descricao}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {servico.planos?.length ? (
              <div className="rounded-2xl border border-cyan-100/20 bg-[#0b3f5e]/55 p-6 text-slate-100 backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <h2 className="text-xl font-bold text-white">Planos do BPO Financeiro</h2>
                <p className="mt-2 text-sm text-slate-100/85">
                  Escolha o plano ideal para o momento da sua empresa.
                </p>

                {/* items-stretch força mesma altura visual por linha */}
                <div className="mt-4 grid gap-4 md:grid-cols-3 items-stretch">
                  {servico.planos.map((plano) => (
                    <div
                      key={plano.nome}
                      className={`rounded-xl border p-4 transition-colors h-full flex flex-col ${
                        plano.destaque
                          ? "border-cyan-300/50 bg-cyan-400/10"
                          : "border-cyan-100/20 bg-[#0f4f72]/40"
                      }`}
                    >
                      <h3 className="text-lg font-bold text-white">{plano.nome}</h3>
                      {plano.preco ? (
                        <p className="mt-1 font-semibold text-cyan-200">{plano.preco}</p>
                      ) : null}
                      <p className="mt-2 text-sm text-slate-100/90">{plano.descricao}</p>

                      <ul className="mt-3 space-y-2">
                        {plano.recursos.map((r) => (
                          <li key={r} className="ml-5 list-disc text-sm text-slate-100/95">
                            {r}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-auto p-0">
                      {plano.ctaHref ? (
                        <a
                          href={plano.ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex self-start rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-cyan-300"
                        >
                          {plano.ctaTexto ?? "Falar sobre este plano"}
                        </a>
                      ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-2xl border border-cyan-100/20 bg-[#0b3f5e]/55 p-6 text-slate-100 backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <h2 className="text-xl font-bold text-white">
                Dúvidas frequentes deste serviço
              </h2>

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

            <div className="rounded-2xl border border-cyan-100/20 bg-[#0b3f5e]/55 p-6 text-slate-100 backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <h3 className="font-bold text-white">Indicado para</h3>
              <ul className="mt-3 space-y-2">
                {servico.paraQuem.map((item) => (
                  <li key={item} className="ml-5 list-disc text-sm text-slate-100/95">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-cyan-100/20 bg-[#0b3f5e]/55 p-6 text-slate-100 backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
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
          
          {exibirFormulario ? (
            <aside className="space-y-6">
              {exibirFormulario ? (
                <div className="rounded-2xl border border-cyan-100/20 bg-[#0b3f5e]/55 p-6 text-slate-100 backdrop-blur-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <h3 className="font-bold text-white">{tituloFormulario}</h3>
                  <p className="mt-2 text-sm text-slate-100/85">
                    Preencha os dados abaixo e nossa equipe entrará em contato.
                  </p>

                  <form action="/api/lead-servico" method="POST" className="mt-4 space-y-4">
                    {/* Campos ocultos para identificação do serviço */}
                    <input type="hidden" name="servicoSlug" value={servico.slug} />
                    <input type="hidden" name="servicoTitulo" value={servico.titulo} />

                    {/* Honeypot anti-spam */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                    />

                    <div>
                      <label htmlFor="nome" className="mb-1 block text-sm text-slate-100">
                        Nome *
                      </label>
                      <input
                        id="nome"
                        name="nome"
                        type="text"
                        required
                        maxLength={120}
                        className="w-full rounded-lg border border-cyan-100/20 bg-[#0f4f72]/40 px-3 py-2 text-sm text-white placeholder:text-slate-300/70 outline-none transition-colors focus:border-cyan-300/45"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label htmlFor="razaoSocial" className="mb-1 block text-sm text-slate-100">
                        Razão Social *
                      </label>
                      <input
                        id="razaoSocial"
                        name="razaoSocial"
                        type="text"
                        required
                        maxLength={180}
                        className="w-full rounded-lg border border-cyan-100/20 bg-[#0f4f72]/40 px-3 py-2 text-sm text-white placeholder:text-slate-300/70 outline-none transition-colors focus:border-cyan-300/45"
                        placeholder="Razão social da empresa"
                      />
                    </div>

                    <div>
                      <label htmlFor="cnpj" className="mb-1 block text-sm text-slate-100">
                        CNPJ *
                      </label>
                      <input
                        id="cnpj"
                        name="cnpj"
                        type="text"
                        required
                        maxLength={18}
                        className="w-full rounded-lg border border-cyan-100/20 bg-[#0f4f72]/40 px-3 py-2 text-sm text-white placeholder:text-slate-300/70 outline-none transition-colors focus:border-cyan-300/45"
                        placeholder="00.000.000/0000-00"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-1 block text-sm text-slate-100">
                        E-mail *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={160}
                        className="w-full rounded-lg border border-cyan-100/20 bg-[#0f4f72]/40 px-3 py-2 text-sm text-white placeholder:text-slate-300/70 outline-none transition-colors focus:border-cyan-300/45"
                        placeholder="voce@empresa.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefone" className="mb-1 block text-sm text-slate-100">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        required
                        maxLength={20}
                        className="w-full rounded-lg border border-cyan-100/20 bg-[#0f4f72]/40 px-3 py-2 text-sm text-white placeholder:text-slate-300/70 outline-none transition-colors focus:border-cyan-300/45"
                        placeholder="(81) 99999-9999"
                      />
                    </div>

                    <fieldset className="rounded-lg border border-cyan-100/20 p-3">
                      <legend className="px-1 text-sm text-white">
                        Qual o regime de tributação da empresa? *
                      </legend>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2">
                        {["Simples Nacional", "Lucro Presumido", "Lucro Real", "MEI"].map(
                          (opcao) => (
                            <label
                              key={opcao}
                              className="inline-flex items-center gap-2 text-sm text-slate-100/95"
                            >
                              <input
                                type="radio"
                                name="regimeTributacao"
                                value={opcao}
                                required
                                className="h-4 w-4 accent-cyan-400"
                              />
                              {opcao}
                            </label>
                          )
                        )}
                      </div>
                    </fieldset>

                    <fieldset className="rounded-lg border border-cyan-100/20 p-3">
                      <legend className="px-1 text-sm text-white">
                        Quantos colaboradores a empresa possui? *
                      </legend>
                      <div className="mt-2 grid gap-2">
                        {[
                          "Nenhum colaborador",
                          "1 a 5 colaboradores",
                          "6 a 20 colaboradores",
                          "21 a 50 colaboradores",
                          "Mais de 50 colaboradores",
                        ].map((opcao) => (
                          <label
                            key={opcao}
                            className="inline-flex items-center gap-2 text-sm text-slate-100/95"
                          >
                            <input
                              type="radio"
                              name="quantidadeColaboradores"
                              value={opcao}
                              required
                              className="h-4 w-4 accent-cyan-400"
                            />
                            {opcao}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div>
                      <label htmlFor="faturamento" className="mb-1 block text-sm text-slate-100">
                        Qual o faturamento da empresa? *
                      </label>
                      <input
                        id="faturamento"
                        name="faturamento"
                        type="text"
                        required
                        maxLength={120}
                        className="w-full rounded-lg border border-cyan-100/20 bg-[#0f4f72]/40 px-3 py-2 text-sm text-white placeholder:text-slate-300/70 outline-none transition-colors focus:border-cyan-300/45"
                        placeholder="Ex.: R$ 80.000/mês"
                      />
                    </div>

                    <fieldset className="rounded-lg border border-cyan-100/20 p-3">
                      <legend className="px-1 text-sm text-white">
                        Já possui contador? *
                      </legend>
                      <div className="mt-2 flex gap-4">
                        {["Sim", "Não"].map((opcao) => (
                          <label
                            key={opcao}
                            className="inline-flex items-center gap-2 text-sm text-slate-100/95"
                          >
                            <input
                              type="radio"
                              name="jaPossuiContador"
                              value={opcao}
                              required
                              className="h-4 w-4 accent-cyan-400"
                            />
                            {opcao}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset className="rounded-lg border border-cyan-100/20 p-3">
                      <legend className="px-1 text-sm text-white">
                        Deseja migrar de contabilidade? *
                      </legend>
                      <div className="mt-2 flex gap-4">
                        {["Sim", "Não"].map((opcao) => (
                          <label
                            key={opcao}
                            className="inline-flex items-center gap-2 text-sm text-slate-100/95"
                          >
                            <input
                              type="radio"
                              name="desejaMigrar"
                              value={opcao}
                              required
                              className="h-4 w-4 accent-cyan-400"
                            />
                            {opcao}
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-cyan-300"
                    >
                      Enviar solicitação
                    </button>
                  </form>
                </div>
              ) : null}
            </aside>
          ) : null}
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CookieNotice />
    </>
  );
}