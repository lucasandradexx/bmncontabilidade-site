// Armazenamento das imagens do blog (capas, fotos de autores e imagens dentro do texto).
//
// PROVISÓRIO: salva em data/uploads e serve por /api/blog/imagens/[nome].
// Como os dados do blog, só persiste em servidor com disco permanente.
// TODO(storage): enviar para Cloudflare R2 / S3 / Supabase Storage e devolver a URL pública.
// Se a URL for de outro domínio, liberar em `images.remotePatterns` no next.config.ts.

import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const PASTA = path.join(process.cwd(), "data", "uploads");

export const TAMANHO_MAXIMO = 5 * 1024 * 1024; // 5 MB

// SVG fica de fora: pode conter scripts.
const TIPOS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const CONTENT_TYPE: Record<string, string> = Object.fromEntries(
  Object.entries(TIPOS).map(([tipo, ext]) => [ext, tipo]),
);

const NOME_VALIDO = /^[a-f0-9-]{36}\.(jpg|png|webp|gif)$/;

export async function salvarImagem(arquivo: File): Promise<string> {
  const extensao = TIPOS[arquivo.type];
  if (!extensao) throw new Error("Formato não aceito. Use JPG, PNG, WebP ou GIF.");
  if (arquivo.size > TAMANHO_MAXIMO) throw new Error("A imagem passa de 5 MB.");

  const nome = `${randomUUID()}.${extensao}`;
  await fs.mkdir(PASTA, { recursive: true });
  await fs.writeFile(path.join(PASTA, nome), Buffer.from(await arquivo.arrayBuffer()));
  return `/api/blog/imagens/${nome}`;
}

export async function lerImagem(nome: string): Promise<{ dados: Buffer; tipo: string } | null> {
  if (!NOME_VALIDO.test(nome)) return null;
  try {
    const dados = await fs.readFile(path.join(PASTA, nome));
    return { dados, tipo: CONTENT_TYPE[nome.split(".").pop()!] };
  } catch {
    return null;
  }
}
