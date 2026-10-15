import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/landing/whatsappButton";
import CookieNotice from "@/components/landing/cookieNotice";
import {
  BotaoWhatsApp,
  CtaFinal,
  FaqLista,
  HeroPagina,
  Passos,
  Secao,
  Tabela,
} from "@/components/paginas/blocos";
import { MENSAGENS_WHATSAPP } from "@/lib/empresa";

export const metadata: Metadata = {
  title: "Atendimento digital para empresas de todo o Brasil",
  description:
    "Como a BMN atende empresas de qualquer estado: WhatsApp com quem cuida da conta, reuniões on-line com os sócios, Área do Cliente e certificado digital.",
};

const MENSAGEM = MENSAGENS_WHATSAPP.atendimentoDigital;

const PASSOS = [
  {
    titulo: "Primeiro contato pelo WhatsApp",
    descricao: "Você conversa direto com quem vai cuidar da sua conta, sem central de atendimento.",
  },
  {
    titulo: "Autorização de acesso",
    descricao:
      "Por certificado digital ou procuração eletrônica, acessamos os órgãos federais, estaduais e municipais sem você sair de casa.",
  },
  {
    titulo: "Área do Cliente",
    descricao: "Guias, relatórios e documentos ficam disponíveis em um só lugar, a qualquer hora.",
  },
  {
    titulo: "Reuniões on-line com os sócios",
    descricao: "Decisões importantes são tomadas com quem entende do assunto, por videochamada.",
  },
];

const COMO_FUNCIONA: [string, string][] = [
  ["WhatsApp com quem cuida da conta", "Resposta rápida, sem central de atendimento"],
  ["Reuniões on-line com os sócios", "Decisões tomadas com quem entende do assunto"],
  ["Área do Cliente e documentos digitais", "Tudo em um lugar, a qualquer hora"],
  [
    "Certificado digital ou procuração eletrônica",
    "Acesso aos órgãos federais, estaduais e municipais sem sair de casa",
  ],
  ["Monitoramento fiscal contínuo", "Pendências tratadas antes de virarem problema"],
];

const FAQ = [
  {
    pergunta: "Vocês atendem empresas de qualquer estado?",
    resposta:
      "Sim. O atendimento é 100% digital e a BMN atende empresas de todo o Brasil, com sede em Recife-PE.",
  },
  {
    pergunta: "Preciso ir ao escritório em algum momento?",
    resposta:
      "Não. Todo o processo pode ser feito a distância. Se preferir, as reuniões também podem ser presenciais na sede, em Recife.",
  },
  {
    pergunta: "Como vocês acessam os órgãos do meu estado e do meu município?",
    resposta:
      "Com certificado digital ou procuração eletrônica, conforme o portal de cada órgão. Orientamos você em cada etapa.",
  },
];

export default function AtendimentoDigitalPage() {
  return (
    <>
      <Header />

      <main>
        <HeroPagina
          tag="Atendimento digital"
          titulo="Uma contabilidade sem fronteiras"
          subtitulo="A BMN atende empresas de qualquer estado, com a mesma proximidade de um escritório ao lado: WhatsApp com quem cuida da conta, reuniões on-line com os sócios e documentos digitais."
          nota="Sede em Recife-PE. Empresas de todos os estados."
        >
          <BotaoWhatsApp mensagem={MENSAGEM}>Quero saber como funciona</BotaoWhatsApp>
        </HeroPagina>

        <Secao tag="Passo a passo" titulo="Como funciona o atendimento a distância">
          <Passos passos={PASSOS} />
        </Secao>

        <Secao tag="Na prática" titulo="O que você sente no dia a dia" fundo="cinza">
          <Tabela cabecalho={["Como funciona", "O que o cliente sente"]} linhas={COMO_FUNCIONA} />
        </Secao>

        <Secao tag="Dúvidas" titulo="Perguntas frequentes">
          <FaqLista itens={FAQ} />
        </Secao>

        <CtaFinal
          titulo="Aqui você não fala com uma central de atendimento"
          descricao="Você fala com quem cuida da sua empresa e responde por ela."
        >
          <BotaoWhatsApp mensagem={MENSAGENS_WHATSAPP.socios}>
            Converse diretamente com os sócios
          </BotaoWhatsApp>
        </CtaFinal>
      </main>

      <Footer />
      <WhatsAppButton mensagem={MENSAGEM} />
      <CookieNotice />
    </>
  );
}
