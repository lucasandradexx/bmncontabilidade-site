// Hash de senha com scrypt (embutido no Node). Formato guardado no banco: "sal:hash", em hexadecimal.
import "server-only";
import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt) as (senha: string, sal: Buffer, tamanho: number) => Promise<Buffer>;
const TAMANHO = 64;

export async function gerarHash(senha: string): Promise<string> {
  const sal = randomBytes(16);
  const hash = await scryptAsync(senha, sal, TAMANHO);
  return `${sal.toString("hex")}:${hash.toString("hex")}`;
}

export async function conferirSenha(senha: string, guardado: string): Promise<boolean> {
  const [salHex, hashHex] = guardado.split(":");
  if (!salHex || !hashHex) return false;
  const esperado = Buffer.from(hashHex, "hex");
  if (esperado.length !== TAMANHO) return false;
  const hash = await scryptAsync(senha, Buffer.from(salHex, "hex"), TAMANHO);
  return timingSafeEqual(hash, esperado);
}
