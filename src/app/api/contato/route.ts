import { NextResponse } from "next/server";
import { enviarEmailLead, type CampoEmail } from "@/lib/mailer";

type Payload = {
  assunto: string;
  campos: CampoEmail[];
  honeypot?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Payload;

  // Honeypot anti-spam: bots preenchem campos ocultos, humanos não.
  if (body.honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!body.assunto || !Array.isArray(body.campos) || body.campos.length === 0) {
    return NextResponse.json(
      { ok: false, erro: "Dados do formulário inválidos." },
      { status: 400 }
    );
  }

  try {
    await enviarEmailLead(body.assunto, body.campos);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Falha ao enviar e-mail de contato:", error);
    return NextResponse.json(
      { ok: false, erro: "Não foi possível enviar sua mensagem. Tente novamente." },
      { status: 500 }
    );
  }
}
