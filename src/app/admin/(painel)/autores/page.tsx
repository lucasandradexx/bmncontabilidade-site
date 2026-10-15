import type { Metadata } from "next";
import GerenciarAutores from "@/components/admin/gerenciarAutores";
import { CabecalhoPagina } from "@/components/admin/ui";
import { exigirSessao } from "@/lib/admin/sessao";
import { listarAutores, listarPosts } from "@/lib/blogDados";

export const metadata: Metadata = { title: "Autores" };

export default async function AutoresPage() {
  await exigirSessao();
  const [autores, posts] = await Promise.all([listarAutores(), listarPosts()]);

  const contagem: Record<number, number> = {};
  for (const p of posts) contagem[p.autorId] = (contagem[p.autorId] ?? 0) + 1;

  return (
    <>
      <CabecalhoPagina titulo="Autores" descricao="Quem assina os artigos. Nome, cargo e foto aparecem no blog." />
      <GerenciarAutores autores={autores} contagem={contagem} />
    </>
  );
}
