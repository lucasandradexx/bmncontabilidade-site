// Login do painel /admin: sessão em cookie assinado (JWT HS256, httpOnly).

import "server-only";
import { randomBytes } from "crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

import { sql } from "@/lib/db";
import type { UsuarioRegistro } from "@/lib/blogTipos";
import { conferirSenha } from "@/lib/admin/senha";


const COOKIE = "bmn_admin";
const DURACAO_MS = 8 * 60 * 60 * 1000; // 8 horas

// Sem ADMIN_SESSION_SECRET, gera uma chave aleatória por processo: o login funciona,
// mas todos são deslogados quando o servidor reinicia. Em produção, defina a variável.
const globalSessao = globalThis as unknown as { __bmnChaveAdmin?: Uint8Array };
function chave() {
  if (process.env.ADMIN_SESSION_SECRET) {
    return new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET);
  }
  globalSessao.__bmnChaveAdmin ??= new Uint8Array(randomBytes(32));
  return globalSessao.__bmnChaveAdmin;
}

export async function autenticar(email: string, senha: string): Promise<Pick<UsuarioRegistro, "id" | "nome"> | null> {
  const [usuario] = await sql<Pick<UsuarioRegistro, "id" | "nome" | "senhaHash" | "ativo">[]>`
    select id, nome, senha_hash, ativo from usuarios where email = ${email.trim().toLowerCase()}
  `;

  if (!usuario || !usuario.ativo) return null;

  const conferencia = await conferirSenha(senha, usuario.senhaHash);
  if (!conferencia) return null;

  await sql`
    update usuarios set ultimo_acesso_em = now() where id = ${usuario.id}
  `;

  return { id: usuario.id, nome: usuario.nome };
}

export async function criarSessao(usuario: Pick<UsuarioRegistro, "id" | "nome">) {
  const expira = new Date(Date.now() + DURACAO_MS);
  const token = await new SignJWT({ nome: usuario.nome })
  .setSubject(String(usuario.id))
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime(expira)
  .sign(chave());

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expira,
  });
}

export async function encerrarSessao() {
  (await cookies()).delete(COOKIE);
}

export const lerSessao = cache(async (): Promise<{ usuarioId: number; nome: string } | null> => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, chave(), { algorithms: ["HS256"] });
    const usuarioId = Number(payload.sub);
    if (!Number.isInteger(usuarioId) || typeof payload.nome !== "string") return null;
    return { usuarioId, nome: payload.nome };
  } catch {
    return null;
  }
});


// Usar no topo de toda página, Server Action e Route Handler do admin.
export async function exigirSessao() {
  const sessao = await lerSessao();
  if (!sessao) redirect("/admin/login");
  return sessao;
}
