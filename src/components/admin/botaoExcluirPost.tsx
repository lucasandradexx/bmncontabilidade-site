"use client";

import { useTransition } from "react";
import { FaTrash } from "react-icons/fa";
import { excluirPostAcao } from "@/app/admin/acoes";

export default function BotaoExcluirPost({ id, titulo }: { id: number; titulo: string }) {
  const [pendente, iniciar] = useTransition();

  return (
    <button
      type="button"
      title="Excluir"
      aria-label={`Excluir ${titulo}`}
      disabled={pendente}
      className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
      onClick={() => {
        if (!window.confirm(`Excluir "${titulo}" de vez? Isso não pode ser desfeito.`)) return;
        iniciar(async () => {
          const resultado = await excluirPostAcao(id);
          if (!resultado.ok) window.alert(resultado.erro);
        });
      }}
    >
      <FaTrash />
    </button>
  );
}
