"use client";

import { useState, useTransition } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { Aviso, BOTAO, CARTAO, INPUT, LABEL } from "@/components/admin/ui";
import { excluirCategoriaAcao, salvarCategoriaAcao, type Resultado } from "@/app/admin/acoes";
import { slugify, type CategoriaRegistro } from "@/lib/blogTipos";

type Rascunho = { id: number | null; nome: string; slug: string; descricao: string; ordem: number };

const VAZIO: Rascunho = { id: null, nome: "", slug: "", descricao: "", ordem: 0 };

export default function GerenciarCategorias({
  categorias,
  contagem,
}: {
  categorias: CategoriaRegistro[];
  contagem: Record<number, number>;
}) {
  const [pendente, iniciar] = useTransition();
  const [aviso, setAviso] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);
  const [form, setForm] = useState<Rascunho>({ ...VAZIO, ordem: categorias.length + 1 });

  function mostrar(resultado: Resultado) {
    setAviso(resultado.ok ? { tipo: "sucesso", texto: resultado.mensagem } : { tipo: "erro", texto: resultado.erro });
    return resultado.ok;
  }

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    iniciar(async () => {
      const ok = mostrar(await salvarCategoriaAcao({ ...form, slug: form.slug || slugify(form.nome) }));
      if (ok) setForm({ ...VAZIO, ordem: categorias.length + 2 });
    });
  }

  function excluir(c: CategoriaRegistro) {
    if (!window.confirm(`Excluir a categoria "${c.nome}"?`)) return;
    iniciar(async () => {
      mostrar(await excluirCategoriaAcao(c.id));
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className={`${CARTAO} !p-0 overflow-hidden`}>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-bold">Ordem</th>
              <th className="px-5 py-3 font-bold">Categoria</th>
              <th className="hidden px-5 py-3 font-bold sm:table-cell">Artigos</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categorias.map((c) => (
              <tr key={c.id} className={form.id === c.id ? "bg-cyan-50/50" : ""}>
                <td className="px-5 py-3 text-slate-500">{c.ordem}</td>
                <td className="px-5 py-3">
                  <p className="font-semibold text-primary">{c.nome}</p>
                  <p className="text-xs text-slate-400">/blog?categoria={c.slug}</p>
                </td>
                <td className="hidden px-5 py-3 text-slate-600 sm:table-cell">{contagem[c.id] ?? 0}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      title="Editar"
                      aria-label={`Editar ${c.nome}`}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-secondary"
                      onClick={() => {
                        setAviso(null);
                        setForm({ id: c.id, nome: c.nome, slug: c.slug, descricao: c.descricao ?? "", ordem: c.ordem });
                      }}
                    >
                      <FaPen />
                    </button>
                    <button
                      type="button"
                      title="Excluir"
                      aria-label={`Excluir ${c.nome}`}
                      disabled={pendente}
                      className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => excluir(c)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categorias.length === 0 && <p className="p-6 text-center text-sm text-slate-500">Nenhuma categoria ainda.</p>}
      </div>

      <form onSubmit={salvar} className={`${CARTAO} space-y-4 lg:self-start`}>
        <h2 className="font-bold text-primary">{form.id ? "Editar categoria" : "Nova categoria"}</h2>
        {aviso && <Aviso tipo={aviso.tipo}>{aviso.texto}</Aviso>}

        <div>
          <label htmlFor="cat-nome" className={LABEL}>Nome</label>
          <input
            id="cat-nome"
            required
            maxLength={80}
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className={INPUT}
          />
        </div>
        <div>
          <label htmlFor="cat-slug" className={LABEL}>Endereço (slug)</label>
          <input
            id="cat-slug"
            maxLength={80}
            value={form.slug}
            placeholder={slugify(form.nome) || "gerado-pelo-nome"}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            onBlur={() => setForm((f) => ({ ...f, slug: slugify(f.slug) }))}
            className={INPUT}
          />
        </div>
        <div>
          <label htmlFor="cat-desc" className={LABEL}>Descrição (opcional)</label>
          <textarea
            id="cat-desc"
            rows={2}
            maxLength={500}
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            className={INPUT}
          />
        </div>
        <div>
          <label htmlFor="cat-ordem" className={LABEL}>Ordem nos filtros</label>
          <input
            id="cat-ordem"
            type="number"
            min={0}
            max={999}
            value={form.ordem}
            onChange={(e) => setForm({ ...form, ordem: Number(e.target.value) })}
            className={INPUT}
          />
        </div>

        <div className="flex gap-2">
          <button type="submit" disabled={pendente} className={`${BOTAO.primario} flex-1`}>
            {form.id ? "Salvar" : <><FaPlus /> Criar categoria</>}
          </button>
          {form.id && (
            <button
              type="button"
              className={BOTAO.secundario}
              onClick={() => {
                setAviso(null);
                setForm({ ...VAZIO, ordem: categorias.length + 1 });
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
