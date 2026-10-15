import { NextResponse } from "next/server";
import { lerSessao } from "@/lib/admin/sessao";
import { salvarImagem } from "@/lib/admin/imagens";

// Upload de imagem pelo painel. Responde { url } para usar na capa ou no texto.
export async function POST(request: Request) {
  if (!(await lerSessao())) {
    return NextResponse.json({ erro: "Sessão expirada. Entre novamente." }, { status: 401 });
  }

  const arquivo = (await request.formData()).get("arquivo");
  if (!(arquivo instanceof File)) {
    return NextResponse.json({ erro: "Nenhum arquivo enviado." }, { status: 400 });
  }

  try {
    return NextResponse.json({ url: await salvarImagem(arquivo) });
  } catch (erro) {
    return NextResponse.json({ erro: (erro as Error).message }, { status: 400 });
  }
}
