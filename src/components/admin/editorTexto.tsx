"use client";

// Editor visual dos artigos (Tiptap). Gera HTML com as mesmas tags que o blog exibe;
// o servidor sanitiza de novo ao salvar.
import { useRef, useState, type ReactNode } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import type { EditorView } from "@tiptap/pm/view";
import {
  FaBold,
  FaImage,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaMinus,
  FaQuoteRight,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
  FaUnlink,
} from "react-icons/fa";
import { TIPOS_ACEITOS, enviarImagem } from "@/components/admin/uploadImagem";

export default function EditorTexto({
  valorInicial,
  onChange,
}: {
  valorInicial: string;
  onChange: (html: string) => void;
}) {
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const inputImagem = useRef<HTMLInputElement>(null);

  // Envia a imagem e insere no ponto do cursor (botão, colar ou arrastar).
  async function inserirImagem(view: EditorView, arquivo: File) {
    setErro(null);
    setEnviando(true);
    try {
      const src = await enviarImagem(arquivo);
      const alt = window.prompt("Descreva a imagem em poucas palavras (ajuda no Google e na acessibilidade):") ?? "";
      const no = view.state.schema.nodes.image.create({ src, alt });
      view.dispatch(view.state.tr.replaceSelectionWith(no));
      view.focus();
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setEnviando(false);
    }
  }

  function primeiraImagem(arquivos: FileList | undefined | null) {
    return Array.from(arquivos ?? []).find((f) => f.type.startsWith("image/"));
  }

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        code: false,
        codeBlock: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Image.configure({ allowBase64: false }),
    ],
    content: valorInicial,
    editorProps: {
      attributes: {
        class: "blog-conteudo !max-w-none min-h-[420px] px-5 py-4 focus:outline-none sm:px-8 sm:py-6",
      },
      handlePaste: (view, event) => {
        const arquivo = primeiraImagem(event.clipboardData?.files);
        if (!arquivo) return false;
        inserirImagem(view, arquivo);
        return true;
      },
      handleDrop: (view, event) => {
        const arquivo = primeiraImagem((event as DragEvent).dataTransfer?.files);
        if (!arquivo) return false;
        event.preventDefault();
        inserirImagem(view, arquivo);
        return true;
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-secondary">
      {editor && (
        <BarraFerramentas
          editor={editor}
          enviando={enviando}
          aoClicarImagem={() => inputImagem.current?.click()}
        />
      )}
      <input
        ref={inputImagem}
        type="file"
        accept={TIPOS_ACEITOS}
        className="hidden"
        onChange={(e) => {
          const arquivo = e.target.files?.[0];
          if (arquivo && editor) inserirImagem(editor.view, arquivo);
          e.target.value = "";
        }}
      />
      {erro && <p className="border-b border-red-100 bg-red-50 px-5 py-2 text-sm text-red-700">{erro}</p>}
      <EditorContent editor={editor} />
    </div>
  );
}

function BarraFerramentas({
  editor,
  enviando,
  aoClicarImagem,
}: {
  editor: Editor;
  enviando: boolean;
  aoClicarImagem: () => void;
}) {
  const estado = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      h2: e.isActive("heading", { level: 2 }),
      h3: e.isActive("heading", { level: 3 }),
      negrito: e.isActive("bold"),
      italico: e.isActive("italic"),
      sublinhado: e.isActive("underline"),
      riscado: e.isActive("strike"),
      lista: e.isActive("bulletList"),
      listaNumerada: e.isActive("orderedList"),
      citacao: e.isActive("blockquote"),
      link: e.isActive("link"),
      podeDesfazer: e.can().undo(),
      podeRefazer: e.can().redo(),
    }),
  });

  function editarLink() {
    const atual = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Endereço do link (ex.: /diagnostico-fiscal ou https://...):", atual ?? "");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }

  const c = () => editor.chain().focus();

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 rounded-t-2xl border-b border-slate-200 bg-slate-50 px-2 py-2">
      <select
        aria-label="Tipo de texto"
        className="mr-1 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 focus:outline-none"
        value={estado.h2 ? "h2" : estado.h3 ? "h3" : "p"}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "p") c().setParagraph().run();
          else c().setHeading({ level: v === "h2" ? 2 : 3 }).run();
        }}
      >
        <option value="p">Parágrafo</option>
        <option value="h2">Título de seção</option>
        <option value="h3">Subtítulo</option>
      </select>

      <Separador />
      <Botao titulo="Negrito (Ctrl+B)" ativo={estado.negrito} onClick={() => c().toggleBold().run()}>
        <FaBold />
      </Botao>
      <Botao titulo="Itálico (Ctrl+I)" ativo={estado.italico} onClick={() => c().toggleItalic().run()}>
        <FaItalic />
      </Botao>
      <Botao titulo="Sublinhado (Ctrl+U)" ativo={estado.sublinhado} onClick={() => c().toggleUnderline().run()}>
        <FaUnderline />
      </Botao>
      <Botao titulo="Riscado" ativo={estado.riscado} onClick={() => c().toggleStrike().run()}>
        <FaStrikethrough />
      </Botao>

      <Separador />
      <Botao titulo="Lista" ativo={estado.lista} onClick={() => c().toggleBulletList().run()}>
        <FaListUl />
      </Botao>
      <Botao titulo="Lista numerada" ativo={estado.listaNumerada} onClick={() => c().toggleOrderedList().run()}>
        <FaListOl />
      </Botao>
      <Botao titulo="Citação" ativo={estado.citacao} onClick={() => c().toggleBlockquote().run()}>
        <FaQuoteRight />
      </Botao>
      <Botao titulo="Linha divisória" onClick={() => c().setHorizontalRule().run()}>
        <FaMinus />
      </Botao>

      <Separador />
      <Botao titulo="Inserir ou editar link" ativo={estado.link} onClick={editarLink}>
        <FaLink />
      </Botao>
      {estado.link && (
        <Botao titulo="Remover link" onClick={() => c().extendMarkRange("link").unsetLink().run()}>
          <FaUnlink />
        </Botao>
      )}
      <Botao titulo="Inserir imagem (também dá para colar ou arrastar)" onClick={aoClicarImagem} desativado={enviando}>
        <FaImage />
      </Botao>
      {enviando && <span className="px-2 text-xs text-slate-500">Enviando imagem...</span>}

      <div className="ml-auto flex gap-1">
        <Botao titulo="Desfazer (Ctrl+Z)" onClick={() => c().undo().run()} desativado={!estado.podeDesfazer}>
          <FaUndo />
        </Botao>
        <Botao titulo="Refazer (Ctrl+Shift+Z)" onClick={() => c().redo().run()} desativado={!estado.podeRefazer}>
          <FaRedo />
        </Botao>
      </div>
    </div>
  );
}

function Botao({
  titulo,
  ativo = false,
  desativado = false,
  onClick,
  children,
}: {
  titulo: string;
  ativo?: boolean;
  desativado?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={titulo}
      aria-label={titulo}
      aria-pressed={ativo}
      disabled={desativado}
      onClick={onClick}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm transition disabled:opacity-30 ${
        ativo ? "bg-primary text-white" : "text-slate-600 hover:bg-white hover:text-secondary"
      }`}
    >
      {children}
    </button>
  );
}

function Separador() {
  return <span aria-hidden className="mx-1 h-5 w-px bg-slate-200" />;
}
