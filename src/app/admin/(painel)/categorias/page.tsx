import type { Metadata } from "next";
import GerenciarCategorias from "@/components/admin/gerenciarCategorias";
import { CabecalhoPagina } from "@/components/admin/ui";
import { exigirSessao } from "@/lib/admin/sessao";
import { listarCategorias, listarPosts } from "@/lib/blogDados";

export const metadata: Metadata = { title: "Categorias" };

export default async function CategoriasPage() {
  await exigirSessao();
  const [categorias, posts] = await Promise.all([listarCategorias(), listarPosts()]);

  const contagem: Record<number, number> = {};
  for (const p of posts) contagem[p.categoriaId] = (contagem[p.categoriaId] ?? 0) + 1;

  return (
    <>
      <CabecalhoPagina
        titulo="Categorias"
        descricao="Aparecem como filtros no blog, na ordem definida aqui. Só categorias com artigo publicado são exibidas."
      />
      <GerenciarCategorias categorias={categorias} contagem={contagem} />
    </>
  );
}
