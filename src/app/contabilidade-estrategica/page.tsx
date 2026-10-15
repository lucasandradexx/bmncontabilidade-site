import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/landing/whatsappButton";
import CookieNotice from "@/components/landing/cookieNotice";
import {
  BotaoLink,
  BotaoWhatsApp,
  CtaFinal,
  HeroPagina,
  Secao,
  Tabela,
} from "@/components/paginas/blocos";
import { MENSAGENS_WHATSAPP } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Contabilidade Estratégica para pequenas e médias empresas",
  description:
    "Diagnóstico fiscal, regularização, planejamento tributário e escolha do regime para pequenas e médias empresas de todo o Brasil, direto com os sócios.",
};

const MENSAGEM = MENSAGENS_WHATSAPP.contabilidadeEstrategica;

const ENTREGAS: [string, string][] = [
  [
    "Diagnóstico e regularização",
    "Levantamento de pendências na Receita, PGFN, estado e município, com plano para colocar a empresa em dia",
  ],
  [
    "Planejamento tributário e Reforma",
    "Escolha do regime, simulações e preparação para a CBS e o IBS",
  ],
  [
    "Contabilidade e BPO",
    "Contabilidade mensal, BPO Fiscal e BPO Financeiro, com relatórios que ajudam a decidir",
  ],
  ["Departamento Pessoal", "Folha, admissões, rescisões, eSocial e FGTS Digital"],
  ["Estruturação da empresa", "Abertura, alterações contratuais e organização societária"],
];

const ESCADA = [
  {
    degrau: "1. Aprender",
    oferta: "Conteúdos “Reforma em 1 minuto” e Guia da Reforma para PMEs",
    custo: "Gratuito",
    href: "/reforma-tributaria#guia",
  },
  {
    degrau: "2. Descobrir",
    oferta: "Diagnóstico Estratégico: situação fiscal atual + Raio-X da Reforma",
    custo: "Gratuito",
    href: "/diagnostico-fiscal",
  },
  {
    degrau: "3. Decidir",
    oferta: "Planejamento Tributário e simulação de impacto da Reforma",
    custo: "Proposta sob medida",
    href: "/servicos/planejamento-tributario",
  },
  {
    degrau: "4. Acompanhar",
    oferta: "Contabilidade estratégica mensal, BPO Fiscal ou BPO Financeiro",
    custo: "Mensalidade",
    href: "/#servicos",
  },
];

export default function ContabilidadeEstrategicaPage() {
  return (
    <>
      <Header />

      <main>
        <HeroPagina
          tag="Contabilidade Estratégica"
          titulo="Clareza fiscal para decidir. Estratégia para crescer."
          subtitulo="O dono da empresa não precisa entender de imposto. Precisa de alguém que entenda por ele e mostre, com números, o melhor caminho. Esse é o papel da BMN, para pequenas e médias empresas de todo o Brasil."
          nota="O Diagnóstico mostra onde a empresa está hoje; o Raio-X da Reforma mostra o que muda daqui para frente."
        >
          <BotaoWhatsApp mensagem={MENSAGEM}>Quero meu Diagnóstico Fiscal gratuito</BotaoWhatsApp>
          <BotaoLink href="/reforma-tributaria" variante="secundario">
            Raio-X da Reforma
          </BotaoLink>
        </HeroPagina>

        <Secao tag="O que fazemos por você" titulo="Contabilidade que ajuda a decidir">
          <Tabela cabecalho={["Frente", "O que entregamos"]} linhas={ENTREGAS} />
        </Secao>

        <Secao
          tag="Como começamos"
          titulo="Do primeiro contato ao acompanhamento"
          descricao="A BMN não vende “contabilidade”: vende clareza para o dono decidir. Cada etapa tem um objetivo claro."
          fundo="cinza"
        >
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {ESCADA.map((e) => (
              <li key={e.degrau}>
                <Link
                  href={e.href}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-secondary hover:shadow-md"
                >
                  <span className="text-sm font-black uppercase tracking-wide text-secondary">
                    {e.degrau}
                  </span>
                  <span className="mt-3 flex-1 text-base font-semibold text-primary">{e.oferta}</span>
                  <span className="mt-4 inline-flex w-fit rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800">
                    {e.custo}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Secao>

        <Secao
          tag="Nosso compromisso"
          titulo="Falamos do que fazemos e de como fazemos"
          descricao="Não prometemos economia de impostos nem resultado garantido. Mostramos a situação real da empresa, as opções dentro da lei e os números de cada caminho, para você decidir com segurança."
        >
          <div className="flex justify-center">
            <BotaoWhatsApp mensagem={MENSAGEM}>Quero meu Diagnóstico Fiscal gratuito</BotaoWhatsApp>
          </div>
        </Secao>

        <CtaFinal
          titulo="Nós cuidamos dos números. Você cuida do crescimento."
          descricao="Converse diretamente com os sócios da BMN."
        >
          <BotaoWhatsApp mensagem={MENSAGENS_WHATSAPP.socios}>Falar com os sócios</BotaoWhatsApp>
        </CtaFinal>
      </main>

      <Footer />
      <WhatsAppButton mensagem={MENSAGEM} />
      <CookieNotice />
    </>
  );
}
