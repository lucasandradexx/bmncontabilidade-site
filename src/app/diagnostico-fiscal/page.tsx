import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "@/components/landing/whatsappButton";
import CookieNotice from "@/components/landing/cookieNotice";
import {
  BotaoWhatsApp,
  CardsSocios,
  CtaFinal,
  FaqLista,
  HeroPagina,
  ListaCheck,
  Passos,
  Secao,
  Tabela,
} from "@/components/paginas/blocos";
import {
  CRC_EMPRESA,
  ENDERECO_CURTO,
  MENSAGENS_WHATSAPP,
  NOME_MARCA,
  RESPONSAVEL_TECNICO,
} from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Diagnóstico Fiscal gratuito",
  description:
    "Verificamos sua empresa na Receita, PGFN, SEFAZ e Prefeitura e entregamos um relatório claro com pendências e caminhos. Gratuito, para todo o Brasil.",
};

const MENSAGEM = MENSAGENS_WHATSAPP.diagnostico;

const PARA_QUEM = [
  "Sua empresa não consegue tirar certidão negativa",
  "Você recebeu uma notificação da Receita, da SEFAZ ou da Prefeitura",
  "O DAS do Simples Nacional ficou em atraso",
  "O CNPJ aparece como inapto ou com restrição",
  "Você não sabe se o seu contador atual está entregando todas as obrigações",
  "Você vai vender, comprar ou encerrar uma empresa",
];

const ORGAOS: [string, string][] = [
  ["Receita Federal", "Situação do CNPJ, débitos, declarações em atraso e parcelamentos"],
  ["PGFN", "Débitos inscritos em dívida ativa da União"],
  [
    "Secretaria da Fazenda do estado",
    "ICMS, ICMS Fronteira, inscrição estadual e parcelamentos",
  ],
  ["Prefeitura", "ISS, taxas, inscrição municipal e parcelamentos"],
  ["FGTS e eSocial", "Pendências trabalhistas, quando a empresa tem funcionários"],
];

const PASSOS = [
  {
    titulo: "Você chama no WhatsApp",
    descricao: "E responde 4 perguntas rápidas sobre a empresa.",
  },
  {
    titulo: "Nós consultamos os órgãos",
    descricao: "Com a sua autorização, por procuração eletrônica ou certificado digital.",
  },
  {
    titulo: "Você recebe o relatório",
    descricao:
      "Em uma reunião, presencial ou on-line, com as pendências e as opções de solução.",
  },
];

const ENTREGAS = [
  "Relatório em PDF com a situação em cada órgão",
  "Lista das pendências em ordem de prioridade",
  "Opções de regularização, como parcelamento ou transação, quando houver",
  "Orientação sobre os próximos passos, sem obrigação de contratar",
];

const FAQ = [
  {
    pergunta: "O diagnóstico é mesmo gratuito?",
    resposta: "Sim. Você só contrata algum serviço se quiser, depois de ver o relatório.",
  },
  {
    pergunta: "Preciso trocar de contador para fazer?",
    resposta: "Não. O diagnóstico pode ser feito mesmo que você já tenha contador.",
  },
  {
    pergunta: "Quanto tempo leva?",
    resposta:
      "Em geral, alguns dias úteis após recebermos a autorização de acesso. O prazo exato é combinado no primeiro contato.",
  },
  {
    pergunta: "Meus dados ficam seguros?",
    resposta:
      "Sim. Seguimos o sigilo profissional do contador e a Lei Geral de Proteção de Dados.",
  },
  {
    pergunta: "Minha empresa está inapta. Dá para resolver?",
    resposta:
      "Na maioria dos casos existe um caminho. O diagnóstico mostra exatamente o que precisa ser feito.",
  },
];

// Página de tráfego pago: sem menu e sem links de saída, todos os botões levam ao WhatsApp.
export default function DiagnosticoFiscalPage() {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-center px-4 sm:justify-start sm:px-6 lg:px-8">
          <Image
            src="/logo-bmn-black.svg"
            alt={NOME_MARCA}
            width={395.041}
            height={202.668}
            priority
            className="h-14 w-auto"
          />
        </div>
      </header>

      <main>
        {/* Bloco 1 — Abertura */}
        <HeroPagina
          tag="Diagnóstico Fiscal gratuito"
          titulo="Descubra a situação fiscal da sua empresa antes que ela vire problema"
          subtitulo="Verificamos sua empresa na Receita Federal, na PGFN, na Secretaria da Fazenda do seu estado e na Prefeitura do seu município e apresentamos um relatório claro, com as pendências encontradas e os caminhos possíveis. Sem custo e sem compromisso."
          nota="Atendimento 100% digital para empresas de todo o Brasil."
        >
          <BotaoWhatsApp mensagem={MENSAGEM}>Quero meu diagnóstico gratuito</BotaoWhatsApp>
        </HeroPagina>

        {/* Bloco 2 — Para quem é */}
        <Secao titulo="Este diagnóstico é para você se..." fundo="cinza">
          <ListaCheck itens={PARA_QUEM} colunas={2} />
        </Secao>

        {/* Bloco 3 — O que verificamos */}
        <Secao tag="O que verificamos" titulo="Cinco frentes, um relatório">
          <Tabela cabecalho={["Órgão", "O que é consultado"]} linhas={ORGAOS} />
        </Secao>

        {/* Bloco 4 — Como funciona */}
        <Secao tag="Como funciona" titulo="Três passos até o relatório" fundo="cinza">
          <Passos passos={PASSOS} />
          <div className="mt-10 flex justify-center">
            <BotaoWhatsApp mensagem={MENSAGEM}>Quero meu diagnóstico gratuito</BotaoWhatsApp>
          </div>
        </Secao>

        {/* Bloco 5 — O que você recebe */}
        <Secao tag="Entrega" titulo="O que você recebe">
          <ListaCheck itens={ENTREGAS} colunas={2} />
        </Secao>

        {/* Bloco 6 — Quem faz */}
        <Secao
          tag="Quem faz"
          titulo="Feito por contadores, com sigilo profissional"
          descricao="A BMN Contabilidade Estratégica é um escritório com sede em Recife-PE que atende empresas de todo o Brasil com contabilidade estratégica para pequenas e médias empresas. Diagnosticamos, regularizamos e planejamos impostos, preparamos sua empresa para a Reforma Tributária e usamos tecnologia para acompanhar sua situação fiscal de perto, com os sócios à frente do atendimento."
          fundo="cinza"
        >
          <CardsSocios />
        </Secao>

        {/* Bloco 7 — Perguntas frequentes */}
        <Secao tag="Dúvidas" titulo="Perguntas frequentes">
          <FaqLista itens={FAQ} />
        </Secao>

        {/* Bloco 8 — Chamada final */}
        <CtaFinal titulo="Saiba hoje como está a sua empresa">
          <BotaoWhatsApp mensagem={MENSAGEM}>Agendar meu diagnóstico pelo WhatsApp</BotaoWhatsApp>
        </CtaFinal>
      </main>

      {/* Rodapé da página */}
      <footer className="bg-[#031e30] px-4 py-6 text-center text-xs leading-relaxed text-white/55">
        {NOME_MARCA} · {CRC_EMPRESA}
        {RESPONSAVEL_TECNICO &&
          ` · Responsável técnico: ${RESPONSAVEL_TECNICO.nome}, ${RESPONSAVEL_TECNICO.categoria}, ${RESPONSAVEL_TECNICO.crc}`}
        {" · "}
        {ENDERECO_CURTO} ·{" "}
        <Link href="/politica-de-privacidade" target="_blank" className="underline hover:text-white">
          Política de Privacidade
        </Link>
      </footer>

      <WhatsAppButton mensagem={MENSAGEM} />
      <CookieNotice />
    </>
  );
}
