"use client";

import { useActionState } from "react";
import { entrar } from "@/app/admin/acoes";
import { Aviso, BOTAO, INPUT, LABEL } from "@/components/admin/ui";

export default function FormLogin() {
  const [erro, acao, pendente] = useActionState(entrar, null);

  return (
    <form action={acao} className="space-y-4">
      {erro && <Aviso tipo="erro">{erro}</Aviso>}
      <div>
        <label htmlFor="usuario" className={LABEL}>Usuário</label>
        <input id="usuario" name="usuario" required autoComplete="username" autoFocus className={INPUT} />
      </div>
      <div>
        <label htmlFor="senha" className={LABEL}>Senha</label>
        <input id="senha" name="senha" type="password" required autoComplete="current-password" className={INPUT} />
      </div>
      <button type="submit" disabled={pendente} className={`${BOTAO.primario} w-full !py-3`}>
        {pendente ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
