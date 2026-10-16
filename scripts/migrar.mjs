// Roda as migrações de db/migrations que ainda não foram executadas neste banco.
//
//   npm run migration                  executa as pendentes, em ordem (001, 002, ...)
//   npm run migration -- --so-marcar   só registra todas como executadas, sem rodar
//                                      (para um banco que já tinha as tabelas criadas à mão)
//
// Cada arquivo roda numa transação: se der erro, nada daquele arquivo fica pela metade.
// A tabela "migracoes" guarda o nome de cada arquivo já executado.

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import postgres from "postgres";

// Em produção as variáveis vêm do ambiente; no PC, do .env (sem sobrescrever as do ambiente).
if (existsSync(".env")) process.loadEnvFile(".env");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL não definida.");
  process.exit(1);
}

const PASTA = path.join(process.cwd(), "db", "migrations");
const SO_MARCAR = process.argv.includes("--so-marcar");

// Uma conexão só, para a trava abaixo valer durante toda a execução.
const sql = postgres(process.env.DATABASE_URL, { max: 1, onnotice: () => {} });

try {
  // Impede que dois deploys simultâneos rodem as mesmas migrações ao mesmo tempo.
  await sql`select pg_advisory_lock(hashtext('bmn_migracoes'))`;

  await sql`
    create table if not exists migracoes (
      nome varchar(255) primary key,
      executada_em timestamptz not null default now()
    )
  `;

  const arquivos = (await readdir(PASTA)).filter((nome) => /^\d+_.+\.sql$/.test(nome)).sort();
  const executadas = new Set((await sql`select nome from migracoes`).map((linha) => linha.nome));
  const pendentes = arquivos.filter((nome) => !executadas.has(nome));

  if (pendentes.length === 0) {
    console.log("Nenhuma migração pendente.");
  }

  for (const nome of pendentes) {
    if (SO_MARCAR) {
      await sql`insert into migracoes (nome) values (${nome})`;
      console.log(`marcada (não executada): ${nome}`);
      continue;
    }
    const conteudo = await readFile(path.join(PASTA, nome), "utf-8");
    await sql.begin(async (tx) => {
      await tx.unsafe(conteudo);
      await tx`insert into migracoes (nome) values (${nome})`;
    });
    console.log(`executada: ${nome}`);
  }
} catch (erro) {
  console.error("Falha na migração:", erro.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
