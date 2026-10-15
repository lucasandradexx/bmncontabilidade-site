// Login do painel /admin: sessão em cookie assinado (JWT HS256, httpOnly).
//
// PROVISÓRIO: usuário e senha vêm de ADMIN_USUARIO / ADMIN_SENHA, com "admin" / "admin" de reserva.
// TODO(banco): trocar por uma tabela de usuários com senha em hash (bcrypt/argon2).

import "server-only";
import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

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

function iguais(a: string, b: string) {
  const hashA = createHash("sha256").update(a).digest();
  const hashB = createHash("sha256").update(b).digest();
  return timingSafeEqual(hashA, hashB);
}

export function credenciaisValidas(usuario: string, senha: string) {
  const usuarioOk = iguais(usuario, process.env.ADMIN_USUARIO || "admin");
  const senhaOk = iguais(senha, process.env.ADMIN_SENHA || "admin");
  return usuarioOk && senhaOk;
}

export async function criarSessao(usuario: string) {
  const expira = new Date(Date.now() + DURACAO_MS);
  const token = await new SignJWT({ usuario })
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

export const lerSessao = cache(async (): Promise<{ usuario: string } | null> => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, chave(), { algorithms: ["HS256"] });
    return typeof payload.usuario === "string" ? { usuario: payload.usuario } : null;
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
