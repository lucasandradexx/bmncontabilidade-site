import "server-only";
import postgres from "postgres";

// Em dev o Next recarrega os módulos a cada alteração; guardar no globalThis
// evita abrir uma conexão nova a cada save e estourar o limite do Postgres.
const global = globalThis as unknown as { __sql?: postgres.Sql };

export const sql =
  global.__sql ??
  postgres(process.env.DATABASE_URL!, {
    transform: postgres.camel, // criado_em <-> criadoEm, automático
  });

if (process.env.NODE_ENV !== "production") global.__sql = sql;
