import { NextResponse } from "next/server";
import { enviarEmailLead, type CampoEmail } from "@/lib/mailer";

const ROTULOS: Record<string, string> = {
  nome: "Nome",
  razaoSocial: "Razão Social",
  cnpj: "CNPJ",
  email: "E-mail",
  telefone: "Telefone / WhatsApp",
  regimeTributacao: "Regime de tributação",
  quantidadeColaboradores: "Quantidade de colaboradores",
  faturamento: "Faturamento",
  jaPossuiContador: "Já possui contador",
  desejaMigrar: "Deseja migrar de contabilidade",
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const origem = request.headers.get("referer") ?? "/";
  const servicoSlug = String(formData.get("servicoSlug") ?? "");

  // Honeypot anti-spam: campo oculto que só bots preenchem.
  if (formData.get("website")) {
    return NextResponse.redirect(new URL(origem));
  }

  const servicoTitulo = String(formData.get("servicoTitulo") ?? "Serviço");

  const campos: CampoEmail[] = Object.entries(ROTULOS)
    .map(([campo, label]) => {
      const valor = formData.get(campo);
      return valor ? { label, valor: String(valor) } : null;
    })
    .filter((c): c is CampoEmail => c !== null);

  try {
    await enviarEmailLead(`Novo lead: ${servicoTitulo}`, campos);
  } catch (error) {
    console.error("Falha ao enviar e-mail de lead de serviço:", error);
    const destino = new URL(
      servicoSlug ? `/servicos/${servicoSlug}` : origem,
      request.url
    );
    destino.searchParams.set("erro", "1");
    return NextResponse.redirect(destino);
  }

  const destino = new URL(
    servicoSlug ? `/servicos/${servicoSlug}` : origem,
    request.url
  );
  destino.searchParams.set("enviado", "1");
  return NextResponse.redirect(destino);
}
