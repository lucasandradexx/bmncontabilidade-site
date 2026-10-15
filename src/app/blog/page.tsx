import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/landing/whatsappButton";
import CookieNotice from "@/components/landing/cookieNotice";
import { BotaoLink, BotaoWhatsApp, CtaFinal, HeroPagina } from "@/components/paginas/blocos";
import { CardPost, FiltrosBlog, Paginacao, PostDestaque } from "@/components/blog/blocosBlog";
import { getCategorias, getPostDestaque, getPosts } from "@/lib/blog";
import { MENSAGENS_WHATSAPP } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos da BMN Contabilidade sobre impostos, Reforma Tributária, gestão financeira e rotina contábil para pequenas e médias empresas.",
  alternates: { canonical: "/blog" },
};

const MENSAGEM = MENSAGENS_WHATSAPP.blog;

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function texto(valor: string | string[] | undefined) {
  return typeof valor === "string" && valor.trim() ? valor.trim() : undefined;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const categoria = texto(params.categoria);
  const busca = texto(params.busca);
  const paginaPedida = Number(texto(params.pagina) ?? 1) || 1;

  const filtrando = Boolean(categoria || busca);
  const mostrarDestaque = !filtrando && paginaPedida === 1;

  const [categorias, destaque] = await Promise.all([getCategorias(), getPostDestaque()]);
  const { posts, total, pagina, totalPaginas } = await getPosts({
    categoria,
    busca,
    pagina: paginaPedida,
    excluirSlug: !filtrando && destaque ? destaque.slug : undefined,
  });

  const nomeCategoria = categorias.find((c) => c.slug === categoria)?.nome;

  return (
    <>
      <Header />

      <main>
        <HeroPagina
          tag="Blog BMN"
          titulo="Contabilidade explicada para quem toca uma empresa"
          subtitulo="Impostos, Reforma Tributária, gestão financeira e rotina contábil, sem juridiquês. Escrito pelos sócios e pela equipe da BMN."
        />

        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {mostrarDestaque && destaque && (
              <div className="mb-12">
                <PostDestaque post={destaque} />
              </div>
            )}

            <FiltrosBlog categorias={categorias} categoriaAtual={categoria} busca={busca} />

            {filtrando && (
              <p className="mt-6 text-sm text-slate-600">
                {total} {total === 1 ? "artigo encontrado" : "artigos encontrados"}
                {nomeCategoria && (
                  <>
                    {" "}em <strong className="text-primary">{nomeCategoria}</strong>
                  </>
                )}
                {busca && (
                  <>
                    {" "}para <strong className="text-primary">&ldquo;{busca}&rdquo;</strong>
                  </>
                )}
                .{" "}
                <Link href="/blog" className="font-semibold text-secondary hover:underline">
                  Limpar filtros
                </Link>
              </p>
            )}

            {posts.length > 0 ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <CardPost key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <p className="text-lg font-bold text-primary">Nenhum artigo encontrado</p>
                <p className="mt-2 text-sm text-slate-600">
                  Tente outro termo de busca ou veja todos os artigos.
                </p>
                <div className="mt-6">
                  <Link href="/blog" className="btn btn-primary">
                    Ver todos os artigos
                  </Link>
                </div>
              </div>
            )}

            <Paginacao pagina={pagina} totalPaginas={totalPaginas} categoria={categoria} busca={busca} />
          </div>
        </section>

        <CtaFinal
          titulo="Ficou com dúvida sobre a sua empresa?"
          descricao="Os artigos dão o caminho geral. Para saber o que vale no seu caso, fale com a BMN ou faça o Diagnóstico Fiscal gratuito."
        >
          <BotaoWhatsApp mensagem={MENSAGEM}>Falar com a BMN</BotaoWhatsApp>
          <BotaoLink href="/diagnostico-fiscal" variante="secundario">
            Diagnóstico Fiscal gratuito
          </BotaoLink>
        </CtaFinal>
      </main>

      <Footer />
      <WhatsAppButton mensagem={MENSAGEM} />
      <CookieNotice />
    </>
  );
}
