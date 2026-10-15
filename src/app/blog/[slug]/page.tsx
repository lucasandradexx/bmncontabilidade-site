import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArtigoBlog from "@/components/blog/artigo";
import { getPostBySlug, getPostsRelacionados, getTodosSlugs } from "@/lib/blog";

// Revalida a cada 5 minutos para posts agendados entrarem no ar sem novo deploy.
// Edições feitas no admin atualizam a página na hora (revalidatePath).
export const revalidate = 300;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getTodosSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Artigo não encontrado" };
  }

  return {
    title: post.titulo,
    description: post.resumo,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.titulo,
      description: post.resumo,
      url: `/blog/${post.slug}`,
      publishedTime: post.publicadoEm,
      modifiedTime: post.atualizadoEm ?? undefined,
      authors: [post.autor.nome],
      images: post.capa ? [post.capa] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const relacionados = await getPostsRelacionados(post);

  return <ArtigoBlog post={post} relacionados={relacionados} />;
}
