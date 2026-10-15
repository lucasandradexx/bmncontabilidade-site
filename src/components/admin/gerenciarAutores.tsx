"use client";

import { useState, useTransition } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import UploadImagem from "@/components/admin/uploadImagem";
import { Aviso, BOTAO, CARTAO, INPUT, LABEL } from "@/components/admin/ui";
import { excluirAutorAcao, salvarAutorAcao, type Resultado } from "@/app/admin/acoes";
import type { AutorRegistro } from "@/lib/blogTipos";

type Rascunho = {
  id: number | null;
  nome: string;
  cargo: string;
  fotoUrl: string | null;
  bio: string;
  registro: string;
  ativo: boolean;
};

const VAZIO: Rascunho = { id: null, nome: "", cargo: "", fotoUrl: null, bio: "", registro: "", ativo: true };

export default function GerenciarAutores({
  autores,
  contagem,
}: {
  autores: AutorRegistro[];
  contagem: Record<number, number>;
}) {
  const [pendente, iniciar] = useTransition();
  const [aviso, setAviso] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);
  const [form, setForm] = useState<Rascunho>(VAZIO);

  function mostrar(resultado: Resultado) {
    setAviso(resultado.ok ? { tipo: "sucesso", texto: resultado.mensagem } : { tipo: "erro", texto: resultado.erro });
    return resultado.ok;
  }

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    iniciar(async () => {
      if (mostrar(await salvarAutorAcao({ ...form, fotoUrl: form.fotoUrl ?? "" }))) setForm(VAZIO);
    });
  }

  function excluir(a: AutorRegistro) {
    if (!window.confirm(`Excluir o autor "${a.nome}"?`)) return;
    iniciar(async () => {
      mostrar(await excluirAutorAcao(a.id));
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <ul className="grid gap-4 sm:grid-cols-2 lg:self-start">
        {autores.map((a) => (
          <li key={a.id} className={`${CARTAO} flex gap-4 ${form.id === a.id ? "ring-2 ring-secondary/40" : ""}`}>
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100">
              {a.fotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- miniatura no painel
                <img src={a.fotoUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-lg font-bold text-primary">
                  {a.nome.charAt(0)}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-primary">{a.nome}</p>
              <p className="text-sm text-slate-500">{a.cargo}</p>
              <p className="mt-1 text-xs text-slate-400">
                {contagem[a.id] ?? 0} artigo(s){!a.ativo && " · inativo"}
              </p>
              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  className={`${BOTAO.link} inline-flex items-center gap-1`}
                  onClick={() => {
                    setAviso(null);
                    setForm({
                      id: a.id,
                      nome: a.nome,
                      cargo: a.cargo,
                      fotoUrl: a.fotoUrl,
                      bio: a.bio ?? "",
                      registro: a.registro ?? "",
                      ativo: a.ativo,
                    });
                  }}
                >
                  <FaPen className="text-xs" /> Editar
                </button>
                <button
                  type="button"
                  disabled={pendente}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:underline"
                  onClick={() => excluir(a)}
                >
                  <FaTrash className="text-xs" /> Excluir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={salvar} className={`${CARTAO} space-y-4 lg:self-start`}>
        <h2 className="font-bold text-primary">{form.id ? "Editar autor" : "Novo autor"}</h2>
        {aviso && <Aviso tipo={aviso.tipo}>{aviso.texto}</Aviso>}

        <div className="mx-auto w-28">
          <UploadImagem
            valor={form.fotoUrl}
            onChange={(url) => setForm((f) => ({ ...f, fotoUrl: url }))}
            proporcao="aspect-square"
            textoVazio="Foto"
            redondo
          />
        </div>
        <div>
          <label htmlFor="aut-nome" className={LABEL}>Nome</label>
          <input id="aut-nome" required maxLength={120} value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className={INPUT} />
        </div>
        <div>
          <label htmlFor="aut-cargo" className={LABEL}>Cargo</label>
          <input id="aut-cargo" required maxLength={80} placeholder="Ex.: Sócio" value={form.cargo} onChange={(e) => setForm({ ...form, cargo: e.target.value })} className={INPUT} />
        </div>
        <div>
          <label htmlFor="aut-registro" className={LABEL}>Registro (opcional)</label>
          <input id="aut-registro" maxLength={60} placeholder="Ex.: CRC-PE 000000/O-0" value={form.registro} onChange={(e) => setForm({ ...form, registro: e.target.value })} className={INPUT} />
        </div>
        <div>
          <label htmlFor="aut-bio" className={LABEL}>Bio (opcional)</label>
          <textarea id="aut-bio" rows={3} maxLength={1000} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className={INPUT} />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" checked={form.ativo} onChange={(e) => setForm({ ...form, ativo: e.target.checked })} className="accent-[#139A9E]" />
          Ativo (aparece na lista de autores ao escrever)
        </label>

        <div className="flex gap-2">
          <button type="submit" disabled={pendente} className={`${BOTAO.primario} flex-1`}>
            {form.id ? "Salvar" : <><FaPlus /> Adicionar autor</>}
          </button>
          {form.id && (
            <button type="button" className={BOTAO.secundario} onClick={() => { setAviso(null); setForm(VAZIO); }}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
