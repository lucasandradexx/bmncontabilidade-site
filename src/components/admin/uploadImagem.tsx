"use client";

import { useRef, useState } from "react";
import { FaImage, FaTrash } from "react-icons/fa";
import { BOTAO } from "@/components/admin/ui";

export const TIPOS_ACEITOS = "image/jpeg,image/png,image/webp,image/gif";

// Envia o arquivo para o servidor e devolve a URL da imagem.
export async function enviarImagem(arquivo: File): Promise<string> {
  const dados = new FormData();
  dados.append("arquivo", arquivo);
  const resposta = await fetch("/api/admin/imagens", { method: "POST", body: dados });
  const json = (await resposta.json().catch(() => ({}))) as { url?: string; erro?: string };
  if (!resposta.ok || !json.url) throw new Error(json.erro ?? "Não foi possível enviar a imagem.");
  return json.url;
}

export default function UploadImagem({
  valor,
  onChange,
  proporcao = "aspect-[16/9]",
  textoVazio = "Enviar imagem",
  redondo = false,
}: {
  valor: string | null;
  onChange: (url: string | null) => void;
  proporcao?: string;
  textoVazio?: string;
  redondo?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function aoEscolher(arquivo: File | undefined) {
    if (!arquivo) return;
    setErro(null);
    setEnviando(true);
    try {
      onChange(await enviarImagem(arquivo));
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setEnviando(false);
      if (input.current) input.current.value = "";
    }
  }

  const moldura = `${proporcao} ${redondo ? "rounded-full" : "rounded-xl"} overflow-hidden`;

  return (
    <div>
      <input
        ref={input}
        type="file"
        accept={TIPOS_ACEITOS}
        className="hidden"
        onChange={(e) => aoEscolher(e.target.files?.[0])}
      />

      {valor ? (
        <div className="space-y-3">
          <div className={`${moldura} relative bg-slate-100`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- prévia simples no painel */}
            <img src={valor} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex gap-2">
            <button type="button" className={BOTAO.secundario} disabled={enviando} onClick={() => input.current?.click()}>
              <FaImage /> {enviando ? "Enviando..." : "Trocar"}
            </button>
            <button type="button" className={BOTAO.perigo} disabled={enviando} onClick={() => onChange(null)}>
              <FaTrash /> Remover
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={enviando}
          onClick={() => input.current?.click()}
          className={`${moldura} flex w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 bg-slate-50 text-sm font-semibold text-slate-500 transition hover:border-secondary hover:text-secondary`}
        >
          <FaImage className="text-2xl" />
          {enviando ? "Enviando..." : textoVazio}
          {!redondo && <span className="text-xs font-normal">JPG, PNG, WebP ou GIF até 5 MB</span>}
        </button>
      )}

      {erro && <p className="mt-2 text-sm text-red-600">{erro}</p>}
    </div>
  );
}
