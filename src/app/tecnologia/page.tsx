import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/landing/whatsappButton";
import CookieNotice from "@/components/landing/cookieNotice";
import { FaChartLine, FaCogs, FaFolderOpen, FaSatelliteDish } from "react-icons/fa";
import { BotaoWhatsApp, CtaFinal, HeroPagina, ListaCheck, Secao } from "@/components/paginas/blocos";
import { AREA_DO_CLIENTE_LINK, MENSAGENS_WHATSAPP } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Tecnologia",
  description:
    "Monitoramento fiscal contínuo, Área do Cliente, indicadores mensais e rotinas automatizadas: a tecnologia que a BMN usa para acompanhar sua empresa.",
};

const MENSAGEM = MENSAGENS_WHATSAPP.tecnologia;

const RECURSOS: { icone: ReactNode; titulo: string; texto: string }[] = [
  {
    icone: <FaSatelliteDish />,
    titulo: "Monitoramento fiscal contínuo",
    texto:
      "Acompanhamos a situação da empresa nos órgãos federais, estaduais e municipais para tratar pendências antes que virem problema.",
  },
  {
    icone: <FaFolderOpen />,
    titulo: "Área do Cliente",
    texto:
      "Guias, relatórios e documentos em um só lugar, disponíveis a qualquer hora, sem precisar pedir por e-mail.",
  },
  {
    icone: <FaChartLine />,
    titulo: "Indicadores mensais",
    texto:
      "Relatórios com os números que importam para decidir: faturamento, tributos, folha e resultado.",
  },
  {
    icone: <FaCogs />,
    titulo: "Rotinas automatizadas",
    texto:
      "Processos padronizados e automatizados, com conferência antes de cada entrega, para reduzir retrabalho e falhas manuais.",
  },
];

const NA_PRATICA = [
  "Aviso antecipado de prazos e mudanças que afetam a empresa",
  "Documentos digitais: nada de papel circulando entre a empresa e o escritório",
  "Acesso aos órgãos por certificado digital ou procuração eletrônica",
  "Dados tratados com sigilo profissional e conforme a LGPD",
];

export default function TecnologiaPage() {
  return (
    <>
      <Header />

      <main>
        <HeroPagina
          tag="Tecnologia"
          titulo="Tecnologia para acompanhar sua empresa de perto, de qualquer lugar do Brasil"
          subtitulo="Monitoramento fiscal contínuo, Área do Cliente, indicadores mensais e rotinas automatizadas. A tecnologia cuida do repetitivo para os sócios cuidarem da estratégia."
        >
          <BotaoWhatsApp mensagem={MENSAGEM}>Quero conhecer na prática</BotaoWhatsApp>
          <a
            href={AREA_DO_CLIENTE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10 sm:w-auto"
          >
            Já sou cliente: Área do Cliente
          </a>
        </HeroPagina>

        <Secao tag="O que usamos" titulo="Quatro frentes de tecnologia">
          <div className="grid gap-5 md:grid-cols-2">
            {RECURSOS.map((r) => (
              <article key={r.titulo} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="icon-circle !h-14 !w-14 text-2xl">{r.icone}</div>
                <h3 className="mt-4 text-lg font-bold text-primary">{r.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{r.texto}</p>
              </article>
            ))}
          </div>
        </Secao>

        <Secao tag="Na prática" titulo="O que muda no seu dia a dia" fundo="cinza">
          <ListaCheck itens={NA_PRATICA} colunas={2} />
        </Secao>

        <CtaFinal
          titulo="Veja como acompanhamos uma empresa como a sua"
          descricao="Comece pelo Diagnóstico Fiscal gratuito e receba o relatório da situação da sua empresa em cada órgão."
        >
          <BotaoWhatsApp mensagem={MENSAGENS_WHATSAPP.diagnostico}>
            Quero meu Diagnóstico Fiscal gratuito
          </BotaoWhatsApp>
        </CtaFinal>
      </main>

      <Footer />
      <WhatsAppButton mensagem={MENSAGEM} />
      <CookieNotice />
    </>
  );
}
