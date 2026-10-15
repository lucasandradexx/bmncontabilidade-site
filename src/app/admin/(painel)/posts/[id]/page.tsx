import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FormPost from "@/components/admin/formPost";
import { exigirSessao } from "@/lib/admin/sessao";
import { listarAutores, listarCategorias, obterPost } from "@/lib/blogDados";
import { statusEfetivo } from "@/lib/blogTipos";

export const metadata: Metadata = { title: "Editar artigo" };

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function EditarPostPage({ params, searchParams }: PageProps) {
  await exigirSessao();
  const [{ id }, { criado }] = await Promise.all([params, searchParams]);

  const [post, categorias, autores] = await Promise.all([
    obterPost(Number(id)),
    listarCategorias(),
    listarAutores(),
  ]);
  if (!post) notFound();

  const status = statusEfetivo(post);
  const mensagemCriado = criado
    ? { rascunho: "Rascunho criado.", agendado: "Publicação agendada.", publicado: "Artigo publicado.", arquivado: "Artigo arquivado." }[status]
    : undefined;

  return (
    <>
      <Link href="/admin/posts" className="text-sm font-semibold text-secondary hover:underline">
        ← Artigos
      </Link>
      <div className="mt-4">
        {/* key: remonta o formulário se outro post for aberto na mesma rota */}
        <FormPost
          key={post.id}
          post={post}
          status={status}
          categorias={categorias}
          autores={autores}
          mensagemInicial={mensagemCriado}
        />
      </div>
    </>
  );
}
