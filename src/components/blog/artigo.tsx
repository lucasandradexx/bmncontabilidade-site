// Página completa de um artigo. Usada no site (/blog/[slug]) e na pré-visualização do admin.
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/landing/whatsappButton";
import CookieNotice from "@/components/landing/cookieNotice";
import LeadForm from "@/components/leadForm";
import { BotaoWhatsApp, CtaFinal } from "@/components/paginas/blocos";
import {
  AutorPost,
  CapaPost,
  CardPost,
  Compartilhar,
  MetaPost,
  TagCategoria,
  hrefBlog,
} from "@/components/blog/blocosBlog";
import { formatarData, type Post } from "@/lib/blogTipos";
import { MENSAGENS_WHATSAPP, NOME_MARCA, waLink } from "@/lib/empresa";
import { SITE_URL } from "@/lib/site";

export default function ArtigoBlog({
  post,
  relacionados,
  previa = false,
}: {
  post: Post;
  relacionados: Post[];
  previa?: boolean;
}) {
  const mensagem = `${MENSAGENS_WHATSAPP.blog} Li o artigo "${post.titulo}".`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.resumo,
    datePublished: post.publicadoEm,
    dateModified: post.atualizadoEm ?? post.publicadoEm,
    author: { "@type": "Person", name: post.autor.nome },
    publisher: { "@type": "Organization", name: NOME_MARCA },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    ...(post.capa ? { image: post.capa } : {}),
  };

  return (
    <>
      <Header />

      <main>
        {!previa && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
          />
        )}

        {/* CABEÇALHO DO ARTIGO */}
        <section className="bg-[#041d2c] text-white">
          <div className="mx-auto max-w-4xl px-4 pt-12 pb-32 sm:px-6 lg:px-8 lg:pt-16 lg:pb-40">
            <nav aria-label="Trilha" className="flex flex-wrap items-center gap-2 text-sm text-cyan-300">
              <Link href="/blog" className="transition-colors hover:text-cyan-200">
                Blog
              </Link>
              <span aria-hidden className="text-white/30">/</span>
              <Link
                href={hrefBlog({ categoria: post.categoria.slug })}
                className="transition-colors hover:text-cyan-200"
              >
                {post.categoria.nome}
              </Link>
            </nav>

            <div className="mt-6">
              <TagCategoria categoria={post.categoria} escuro />
            </div>
            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">{post.titulo}</h1>
            <p className="mt-5 text-base leading-relaxed text-slate-200 sm:text-lg">{post.resumo}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <AutorPost autor={post.autor} escuro />
              <MetaPost post={post} escuro />
            </div>
          </div>
        </section>

        {/* CAPA */}
        <div className="mx-auto -mt-24 max-w-5xl px-4 sm:px-6 lg:-mt-28 lg:px-8">
          <CapaPost
            post={post}
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
            className="aspect-[16/9] rounded-3xl shadow-xl sm:aspect-[21/9]"
          />
        </div>

        {/* CONTEÚDO + LATERAL */}
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
            <article>
              {/* O HTML é sanitizado ao salvar (lib/admin/sanitizar.ts). */}
              <div className="blog-conteudo" dangerouslySetInnerHTML={{ __html: post.conteudo }} />

              {post.atualizadoEm && (
                <p className="mt-10 text-xs text-slate-500">
                  Atualizado em <time dateTime={post.atualizadoEm}>{formatarData(post.atualizadoEm)}</time>.
                </p>
              )}

              <div className="mt-10 flex flex-col gap-6 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <AutorPost autor={post.autor} />
                <Compartilhar post={post} />
              </div>

              <p className="mt-8 rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
                Conteúdo informativo, com base na legislação vigente na data de publicação. Não substitui a
                análise do caso da sua empresa por um contador.
              </p>
            </article>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-cyan-300/30 bg-[#041d2c] p-6 text-slate-100">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200">Fale com a BMN</p>
                <h2 className="mt-3 text-lg font-bold text-white">Quer saber como isso se aplica à sua empresa?</h2>
                <p className="mt-2 text-sm text-slate-100/85">
                  Os sócios analisam o seu caso e mostram o que muda, com números.
                </p>
                <a
                  href={waLink(mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black uppercase tracking-wide text-slate-900 transition hover:bg-cyan-300"
                >
                  Falar no WhatsApp
                </a>
                <Link
                  href="/diagnostico-fiscal"
                  className="mt-3 block text-center text-sm text-cyan-200 underline hover:text-white"
                >
                  Ou faça o Diagnóstico Fiscal gratuito
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="font-bold text-primary">Prefere que a gente chame você?</h2>
                <p className="mt-2 mb-5 text-sm text-slate-600">
                  Deixe seus dados e nossa equipe entra em contato pelo WhatsApp.
                </p>
                <LeadForm origem={`Blog: ${post.titulo}`} colunas={1} textoBotao="Quero ser chamado" />
              </div>
            </aside>
          </div>
        </section>

        {/* RELACIONADOS */}
        {relacionados.length > 0 && (
          <section className="bg-slate-50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="tag-section">Continue lendo</span>
                  <h2 className="section-title mt-2 !mb-0">Artigos relacionados</h2>
                </div>
                <Link href="/blog" className="text-sm font-semibold text-secondary hover:underline">
                  Ver todos os artigos →
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relacionados.map((p) => (
                  <CardPost key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaFinal
          titulo="Contabilidade que ajuda a decidir"
          descricao="A BMN atende pequenas e médias empresas de todo o Brasil, com atendimento 100% digital e acesso direto aos sócios."
        >
          <BotaoWhatsApp mensagem={mensagem}>Falar com a BMN</BotaoWhatsApp>
        </CtaFinal>
      </main>

      <Footer />
      {!previa && <WhatsAppButton mensagem={mensagem} />}
      {!previa && <CookieNotice />}
    </>
  );
}
