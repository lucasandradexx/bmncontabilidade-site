import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/landing/whatsappButton";
import { HeroPagina } from "@/components/paginas/blocos";
import type { SecaoLegal } from "@/lib/legal";

export default function PaginaLegal({
  titulo,
  subtitulo,
  secoes,
}: {
  titulo: string;
  subtitulo: string;
  secoes: SecaoLegal[];
}) {
  return (
    <>
      <Header />
      <main>
        <HeroPagina tag="Transparência" titulo={titulo} subtitulo={subtitulo} />
        <section className="bg-white py-14">
          <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
            {secoes.map((secao) => (
              <div key={secao.titulo}>
                <h2 className="text-lg font-bold text-primary">{secao.titulo}</h2>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                  {secao.conteudo}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
