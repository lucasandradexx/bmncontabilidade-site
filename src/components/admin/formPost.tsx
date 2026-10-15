"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaExternalLinkAlt, FaEye, FaTrash } from "react-icons/fa";
import EditorTexto from "@/components/admin/editorTexto";
import UploadImagem from "@/components/admin/uploadImagem";
import { Aviso, BOTAO, BadgeStatus, CARTAO, INPUT, LABEL } from "@/components/admin/ui";
import { excluirPostAcao, salvarPostAcao, type EntradaPost } from "@/app/admin/acoes";
import {
  formatarDataHora,
  slugify,
  type AutorRegistro,
  type CategoriaRegistro,
  type PostRegistro,
  type StatusPost,
} from "@/lib/blogTipos";

type Acao = EntradaPost["acao"];

// ISO -> valor do <input type="datetime-local"> no fuso do navegador.
function paraInputData(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

export default function FormPost({
  post,
  status,
  categorias,
  autores,
  mensagemInicial,
}: {
  post: PostRegistro | null;
  status: StatusPost;
  categorias: CategoriaRegistro[];
  autores: AutorRegistro[];
  mensagemInicial?: string;
}) {
  const router = useRouter();
  const [pendente, iniciar] = useTransition();
  const [aviso, setAviso] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(
    mensagemInicial ? { tipo: "sucesso", texto: mensagemInicial } : null,
  );
  const [alterado, setAlterado] = useState(false);

  const [titulo, setTitulo] = useState(post?.titulo ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugManual, setSlugManual] = useState(Boolean(post));
  const [resumo, setResumo] = useState(post?.resumo ?? "");
  const [conteudo, setConteudo] = useState(post?.conteudo ?? "");
  const [capaUrl, setCapaUrl] = useState<string | null>(post?.capaUrl ?? null);
  const [capaAlt, setCapaAlt] = useState(post?.capaAlt ?? "");
  const [categoriaId, setCategoriaId] = useState(post?.categoriaId ?? categorias[0]?.id ?? 0);
  const [autorId, setAutorId] = useState(
    post?.autorId ?? autores.find((a) => a.ativo)?.id ?? autores[0]?.id ?? 0,
  );
  const [destaque, setDestaque] = useState(post?.destaque ?? false);
  const [dataPublicacao, setDataPublicacao] = useState(paraInputData(post?.publicadoEm ?? null));
  const [marcarAtualizado, setMarcarAtualizado] = useState(false);

  // Qualquer setter de campo marca o formulário como alterado.
  function mudar<T>(setter: (v: T) => void) {
    return (valor: T) => {
      setter(valor);
      setAlterado(true);
    };
  }

  const slugFinal = slugManual ? slug : slugify(titulo);
  const noAr = status === "publicado" || status === "agendado";
  const dataFutura = dataPublicacao !== "" && new Date(dataPublicacao) > new Date();

  // Avisa antes de sair da página com alterações não salvas.
  useEffect(() => {
    if (!alterado) return;
    const aviso = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", aviso);
    return () => window.removeEventListener("beforeunload", aviso);
  }, [alterado]);

  function salvar(acao: Acao) {
    setAviso(null);
    iniciar(async () => {
      const resultado = await salvarPostAcao({
        id: post?.id ?? null,
        acao,
        titulo,
        slug: slugFinal,
        resumo,
        conteudo,
        capaUrl: capaUrl ?? "",
        capaAlt,
        categoriaId,
        autorId,
        destaque,
        publicadoEm: dataPublicacao ? new Date(dataPublicacao).toISOString() : null,
        marcarAtualizado,
      });
      // Post novo: a ação redireciona para a página de edição e não chega aqui.
      if (!resultado) return;
      setAviso({ tipo: resultado.ok ? "sucesso" : "erro", texto: resultado.ok ? resultado.mensagem : resultado.erro });
      if (resultado.ok) {
        setAlterado(false);
        setMarcarAtualizado(false);
      }
    });
  }

  // Ctrl+S salva mantendo o status atual.
  const salvarRef = useRef(salvar);
  useEffect(() => {
    salvarRef.current = salvar;
  });
  useEffect(() => {
    function atalho(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        salvarRef.current(noAr ? "publicar" : status === "arquivado" ? "arquivar" : "rascunho");
      }
    }
    window.addEventListener("keydown", atalho);
    return () => window.removeEventListener("keydown", atalho);
  }, [noAr, status]);

  function excluir() {
    if (!post) return;
    if (!window.confirm(`Excluir "${post.titulo}" de vez? Isso não pode ser desfeito.`)) return;
    iniciar(async () => {
      const resultado = await excluirPostAcao(post.id);
      if (resultado.ok) {
        setAlterado(false);
        router.push("/admin/posts");
      } else {
        setAviso({ tipo: "erro", texto: resultado.erro });
      }
    });
  }

  const textoPublicar = noAr ? "Atualizar publicação" : dataFutura ? "Agendar publicação" : "Publicar";

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      {/* ── Texto ── */}
      <div className="min-w-0 space-y-5">
        {aviso && <Aviso tipo={aviso.tipo}>{aviso.texto}</Aviso>}

        <div>
          <label htmlFor="titulo" className="sr-only">
            Título
          </label>
          <textarea
            id="titulo"
            rows={2}
            value={titulo}
            onChange={(e) => mudar(setTitulo)(e.target.value.replace(/\n/g, ""))}
            placeholder="Título do artigo"
            maxLength={200}
            className="w-full resize-none bg-transparent text-3xl font-black leading-tight text-primary placeholder:text-slate-300 focus:outline-none"
          />
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            bmncontabilidade.com/blog/
            <span className="font-semibold text-slate-700">{slugFinal || "endereco-do-artigo"}</span>
          </p>
        </div>

        <div>
          <label htmlFor="resumo" className={LABEL}>
            Resumo
          </label>
          <textarea
            id="resumo"
            rows={3}
            value={resumo}
            onChange={(e) => mudar(setResumo)(e.target.value)}
            maxLength={320}
            placeholder="Uma ou duas frases que aparecem no card do blog e no Google."
            className={INPUT}
          />
          <p className={`mt-1 text-right text-xs ${resumo.length > 160 ? "text-amber-600" : "text-slate-400"}`}>
            {resumo.length}/320 {resumo.length > 160 && "· o Google costuma cortar depois de 160"}
          </p>
        </div>

        <div>
          <p className={LABEL}>Texto</p>
          <EditorTexto valorInicial={conteudo} onChange={mudar(setConteudo)} />
        </div>
      </div>

      {/* ── Lateral ── */}
      <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
        <div className={CARTAO}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-primary">Publicação</h2>
            <BadgeStatus status={status} />
          </div>

          {post && (
            <p className="mt-2 text-xs text-slate-500">Última edição: {formatarDataHora(post.editadoEm)}</p>
          )}

          <div className="mt-4">
            <label htmlFor="data" className={LABEL}>
              Data de publicação
            </label>
            <input
              id="data"
              type="datetime-local"
              value={dataPublicacao}
              onChange={(e) => mudar(setDataPublicacao)(e.target.value)}
              className={INPUT}
            />
            <p className="mt-1 text-xs text-slate-500">
              Vazio = agora. Uma data futura agenda a publicação.
            </p>
          </div>

          {noAr && (
            <label className="mt-4 flex items-start gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={marcarAtualizado}
                onChange={(e) => mudar(setMarcarAtualizado)(e.target.checked)}
                className="mt-1 accent-[#139A9E]"
              />
              Mostrar &ldquo;Atualizado em&rdquo; com a data de hoje (para revisões de conteúdo)
            </label>
          )}

          <div className="mt-5 grid gap-2">
            <button type="button" className={BOTAO.primario} disabled={pendente} onClick={() => salvar("publicar")}>
              {pendente ? "Salvando..." : textoPublicar}
            </button>
            <button type="button" className={BOTAO.secundario} disabled={pendente} onClick={() => salvar("rascunho")}>
              {noAr ? "Tirar do ar (voltar a rascunho)" : "Salvar rascunho"}
            </button>
            {post && status !== "arquivado" && (
              <button type="button" className={BOTAO.secundario} disabled={pendente} onClick={() => salvar("arquivar")}>
                Arquivar
              </button>
            )}
          </div>

          <p className="mt-3 text-center text-xs text-slate-400">Atalho: Ctrl+S salva sem mudar o status</p>

          {post && (
            <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4">
              <Link href={`/admin/previa/${post.id}`} target="_blank" className={`${BOTAO.link} inline-flex items-center gap-1.5`}>
                <FaEye /> Pré-visualizar
              </Link>
              {status === "publicado" && (
                <Link href={`/blog/${post.slug}`} target="_blank" className={`${BOTAO.link} inline-flex items-center gap-1.5`}>
                  <FaExternalLinkAlt className="text-xs" /> Ver no site
                </Link>
              )}
            </div>
          )}
          {post && alterado && (
            <p className="mt-2 text-center text-xs text-amber-600">
              Há alterações não salvas. A pré-visualização mostra a última versão salva.
            </p>
          )}
        </div>

        <div className={CARTAO}>
          <h2 className="font-bold text-primary">Organização</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="categoria" className={LABEL}>
                Categoria
              </label>
              <select
                id="categoria"
                value={categoriaId}
                onChange={(e) => mudar(setCategoriaId)(Number(e.target.value))}
                className={INPUT}
              >
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="autor" className={LABEL}>
                Autor
              </label>
              <select
                id="autor"
                value={autorId}
                onChange={(e) => mudar(setAutorId)(Number(e.target.value))}
                className={INPUT}
              >
                {autores
                  .filter((a) => a.ativo || a.id === autorId)
                  .map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nome}
                    </option>
                  ))}
              </select>
            </div>
            <label className="flex items-start gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={destaque}
                onChange={(e) => mudar(setDestaque)(e.target.checked)}
                className="mt-1 accent-[#139A9E]"
              />
              Destaque no topo do blog (substitui o destaque atual)
            </label>
          </div>
        </div>

        <div className={CARTAO}>
          <h2 className="font-bold text-primary">Imagem de capa</h2>
          <div className="mt-4 space-y-3">
            <UploadImagem valor={capaUrl} onChange={mudar(setCapaUrl)} textoVazio="Enviar capa" />
            {capaUrl && (
              <div>
                <label htmlFor="capaAlt" className={LABEL}>
                  Descrição da imagem
                </label>
                <input
                  id="capaAlt"
                  value={capaAlt}
                  onChange={(e) => mudar(setCapaAlt)(e.target.value)}
                  maxLength={200}
                  placeholder="Ex.: Sócia analisando relatório financeiro"
                  className={INPUT}
                />
              </div>
            )}
            <p className="text-xs text-slate-500">Sem capa, o blog usa o fundo padrão com o nome da categoria.</p>
          </div>
        </div>

        <div className={CARTAO}>
          <h2 className="font-bold text-primary">Endereço (slug)</h2>
          <div className="mt-4">
            <input
              aria-label="Endereço do artigo"
              value={slugFinal}
              onChange={(e) => {
                setSlugManual(true);
                mudar(setSlug)(e.target.value);
              }}
              onBlur={() => setSlug(slugify(slugFinal))}
              className={INPUT}
            />
            <p className="mt-1 text-xs text-slate-500">
              {status === "publicado"
                ? "Cuidado: mudar o endereço de um artigo publicado quebra links já compartilhados."
                : "Gerado a partir do título. Use palavras que as pessoas buscariam no Google."}
            </p>
          </div>
        </div>

        {post && (
          <button type="button" className={`${BOTAO.perigo} w-full`} disabled={pendente} onClick={excluir}>
            <FaTrash /> Excluir artigo
          </button>
        )}
      </aside>
    </div>
  );
}
