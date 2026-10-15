import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtigoBlog from "@/components/blog/artigo";
import { BadgeStatus } from "@/components/admin/ui";
import { exigirSessao } from "@/lib/admin/sessao";
import { getPostParaPrevia, getPostsRelacionados } from "@/lib/blog";

export const metadata: Metadata = { title: "Pré-visualização" };

type PageProps = {
  params: Promise<{ id: string }>;
};

// Mostra o artigo como ficará no site, em qualquer status (rascunho, agendado...).
export default async function PreviaPage({ params }: PageProps) {
  await exigirSessao();
  const { id } = await params;
  const post = await getPostParaPrevia(Number(id));
  if (!post) notFound();

  const relacionados = await getPostsRelacionados(post);

  return (
    <div className="bg-white">
      <div className="flex flex-wrap items-center justify-center gap-3 bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900">
        Pré-visualização <BadgeStatus status={post.status} />
        <Link href={`/admin/posts/${post.id}`} className="underline">
          Voltar a editar
        </Link>
      </div>
      <ArtigoBlog post={post} relacionados={relacionados} previa />
    </div>
  );
}
