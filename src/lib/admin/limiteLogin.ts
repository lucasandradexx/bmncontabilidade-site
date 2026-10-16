import "server-only";
import { sql } from "@/lib/db";
import { headers } from "next/headers";

const MAX_FALHAS = 8;

// Quantos proxies nossos ficam na frente do site (Cloudflare, Nginx...). Cada um acrescenta
// no fim do X-Forwarded-For o IP que se conectou a ele, então o visitante é o N-ésimo a
// partir da direita. O começo da lista vem do cliente e pode ser inventado.
const PROXIES_CONFIAVEIS = Math.max(1, Number.parseInt(process.env.PROXIES_CONFIAVEIS ?? "", 10) || 1);

export async function ipDaRequisicao(): Promise<string> {
  const lista = ((await headers()).get("x-forwarded-for") ?? "")
    .split(",")
    .map((ip) => ip.trim())
    .filter(Boolean);
  return lista[lista.length - PROXIES_CONFIAVEIS] ?? "desconhecido";
}

export async function loginBloqueado(ip: string): Promise<boolean> {
  const [{ total }] = await sql`
    select count(*)::int as total from tentativas_login where ip = ${ip} and criado_em > now() - interval '15 minutes'
  `;
  return total >= MAX_FALHAS;
}

export async function registrarFalha(ip: string): Promise<void> {
  await sql`insert into tentativas_login ${sql({ ip })}`;
  await sql`delete from tentativas_login where criado_em < now() - interval '1 day'`;
}

export async function limparFalha(ip: string): Promise<void> {
  await sql`delete from tentativas_login where ip = ${ip}`;
}
