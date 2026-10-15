import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/landing/whatsappButton";
import CookieNotice from "@/components/landing/cookieNotice";
import LeadForm from "@/components/leadForm";
import {
  BotaoLink,
  BotaoWhatsApp,
  CtaFinal,
  FaqLista,
  HeroPagina,
  ListaCheck,
  Secao,
} from "@/components/paginas/blocos";
import { MENSAGENS_WHATSAPP } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Reforma Tributária para pequenas e médias empresas",
  description:
    "Raio-X da Reforma Tributária: o que muda com a CBS e o IBS na sua empresa, quando muda e quais decisões tomar agora. Atendimento em todo o Brasil.",
};

const MENSAGEM = MENSAGENS_WHATSAPP.reforma;

// Revisar datas e regras antes de cada publicação: ainda saem regulamentações.
const LINHA_DO_TEMPO = [
  { ano: "2026", texto: "Fase de teste" },
  { ano: "2027", texto: "CBS no lugar de PIS e Cofins" },
  { ano: "2029 a 2032", texto: "Transição do ICMS e do ISS para o IBS" },
  { ano: "2033", texto: "Novo sistema completo" },
];

const PARA_QUEM = [
  "Empresas do Simples Nacional que vendem para outras empresas",
  "Prestadores de serviço com contratos longos",
  "Comércio com margem apertada",
];

const RAIO_X = [
  "Regime atual e como a empresa será afetada pela CBS e pelo IBS",
  "Para empresas do Simples Nacional: análise de recolher a CBS e o IBS dentro ou fora do Simples, considerando se os clientes são empresas que aproveitam crédito",
  "Simulação do impacto no preço de venda e na margem, com base nas notas dos últimos 12 meses",
  "Revisão de contratos longos, cadastros de produtos e serviços e sistema emissor de notas",
  "Linha do tempo da transição (de 2026 até 2033) aplicada à empresa",
];

const FAQ = [
  {
    pergunta: "Vou pagar mais imposto?",
    resposta:
      "Depende da atividade e de quem são os seus clientes. O Raio-X da Reforma mostra o seu caso, com números.",
  },
  {
    pergunta: "O Simples Nacional acaba?",
    resposta: "Não. O Simples continua, com uma nova opção de recolhimento da CBS e do IBS.",
  },
  {
    pergunta: "Preciso fazer algo agora?",
    resposta: "Sim: revisar cadastros, o sistema de emissão de notas e os contratos.",
  },
];

export default function ReformaTributariaPage() {
  return (
    <>
      <Header />

      <main>
        <HeroPagina
          tag="Reforma Tributária"
          titulo="A Reforma Tributária já começou. Sua empresa sabe quanto ela muda o seu preço?"
          subtitulo="Fazemos o Raio-X da Reforma da sua empresa: o que muda com a CBS e o IBS, quando muda e quais decisões precisam ser tomadas agora."
          nota="Acompanhamos a Reforma desde a aprovação. Atendimento 100% digital para empresas de todo o Brasil."
        >
          <BotaoWhatsApp mensagem={MENSAGEM}>Quero o Raio-X da Reforma da minha empresa</BotaoWhatsApp>
          <BotaoLink href="#guia" variante="secundario">
            Baixar o Guia da Reforma
          </BotaoLink>
        </HeroPagina>

        <Secao tag="Linha do tempo" titulo="Quando cada mudança começa a valer">
          <ol className="grid gap-4 md:grid-cols-4">
            {LINHA_DO_TEMPO.map((etapa) => (
              <li
                key={etapa.ano}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
              >
                <p className="text-xl font-black text-secondary">{etapa.ano}</p>
                <p className="mt-2 text-sm text-slate-600">{etapa.texto}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-xs text-slate-500">
            Cronograma com base na legislação vigente. Datas e regras podem mudar com novas
            regulamentações.
          </p>
        </Secao>

        <Secao tag="Para quem é" titulo="Quem precisa decidir primeiro" fundo="cinza">
          <ListaCheck itens={PARA_QUEM} />
        </Secao>

        <Secao tag="O que você recebe" titulo="O que entra no Raio-X da Reforma">
          <ListaCheck itens={RAIO_X} />
          <div className="mt-10 flex justify-center">
            <BotaoWhatsApp mensagem={MENSAGEM}>Quero o Raio-X da Reforma da minha empresa</BotaoWhatsApp>
          </div>
        </Secao>

        <section id="guia" className="scroll-mt-24 bg-[#0b3f5e] py-16 text-white sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-cyan-300/30 bg-[#0d4d69] p-6 sm:p-10">
              <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Material gratuito
              </p>
              <h2 className="mt-4 text-center text-2xl font-black sm:text-3xl">
                Baixe o Guia da Reforma para pequenas e médias empresas
              </h2>
              <p className="mt-3 mb-8 text-center text-sm text-slate-200">
                Informe seus dados e enviamos o guia pelo WhatsApp.
              </p>
              <LeadForm
                origem="Guia da Reforma Tributária"
                variante="escuro"
                modo="guia"
                textoBotao="Quero o guia"
                mensagemSucesso="Em breve enviamos o Guia da Reforma no seu WhatsApp."
              />
            </div>
          </div>
        </section>

        <Secao tag="Dúvidas" titulo="Perguntas frequentes" fundo="cinza">
          <FaqLista itens={FAQ} />
        </Secao>

        <CtaFinal
          titulo="Descubra o que a Reforma muda na sua empresa"
          descricao="O Raio-X da Reforma é feito pelos sócios da BMN, com base nos números reais da sua empresa."
        >
          <BotaoWhatsApp mensagem={MENSAGEM}>Quero o Raio-X da Reforma da minha empresa</BotaoWhatsApp>
        </CtaFinal>
      </main>

      <Footer />
      <WhatsAppButton mensagem={MENSAGEM} />
      <CookieNotice />
    </>
  );
}
