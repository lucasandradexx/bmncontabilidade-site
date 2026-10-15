import type { Metadata } from "next";
import Link from "next/link";
import FormPost from "@/components/admin/formPost";
import { exigirSessao } from "@/lib/admin/sessao";
import { listarAutores, listarCategorias } from "@/lib/blogDados";

export const metadata: Metadata = { title: "Novo artigo" };

export default async function NovoPostPage() {
  await exigirSessao();
  const [categorias, autores] = await Promise.all([listarCategorias(), listarAutores()]);

  if (categorias.length === 0 || autores.length === 0) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
        Antes de escrever, cadastre ao menos{" "}
        {categorias.length === 0 && (
          <Link href="/admin/categorias" className="font-bold underline">uma categoria</Link>
        )}
        {categorias.length === 0 && autores.length === 0 && " e "}
        {autores.length === 0 && (
          <Link href="/admin/autores" className="font-bold underline">um autor</Link>
        )}
        .
      </div>
    );
  }

  return (
    <>
      <Link href="/admin/posts" className="text-sm font-semibold text-secondary hover:underline">
        ← Artigos
      </Link>
      <div className="mt-4">
        <FormPost post={null} status="rascunho" categorias={categorias} autores={autores} />
      </div>
    </>
  );
}
