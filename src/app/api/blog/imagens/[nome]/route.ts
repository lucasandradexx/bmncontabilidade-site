import { lerImagem } from "@/lib/admin/imagens";

// Serve as imagens enviadas pelo painel (provisório, até ir para um storage externo).
export async function GET(_request: Request, { params }: { params: Promise<{ nome: string }> }) {
  const { nome } = await params;
  const imagem = await lerImagem(nome);

  if (!imagem) {
    return new Response("Imagem não encontrada", { status: 404 });
  }

  return new Response(new Uint8Array(imagem.dados), {
    headers: {
      "Content-Type": imagem.tipo,
      // O nome é único por upload, então pode ficar em cache para sempre.
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
