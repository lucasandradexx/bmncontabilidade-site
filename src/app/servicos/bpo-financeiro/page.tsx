import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/landing/whatsappButton";
import CookieNotice from "@/components/landing/cookieNotice";
import BpoFaq from "@/components/landing/bpoFaq";
import HeroSection from "@/components/bpo-financeiro/heroSection";
import DorSection from "@/components/bpo-financeiro/dorSection";
import ProcessSection from "@/components/bpo-financeiro/processSection";
import PlanosSection from "@/components/bpo-financeiro/planosSection";
import CtaSection from "@/components/bpo-financeiro/ctaSection";
import LeadForm from "@/components/leadForm";
import { getServicoBySlug } from "@/lib/servicos";
import { MENSAGENS_WHATSAPP } from "@/lib/empresa";

const servico = getServicoBySlug("bpo-financeiro")!;

export const metadata: Metadata = {
  title: servico.seo.title,
  description: servico.seo.description,
};

const dores = [
  "Você passa horas da sua semana digitando códigos de barras e emitindo notas.",
  "Já pagou multas e juros porque esqueceu a data de vencimento de um boleto.",
  "Tem dificuldade em cobrar clientes inadimplentes por falta de tempo ou organização.",
  "Chega no fim do mês e você não sabe exatamente se a empresa deu lucro ou prejuízo.",
  "Mistura o dinheiro da empresa com o dinheiro pessoal.",
];

const passos = [
  {
    numero: "1",
    titulo: "Raio-X Financeiro",
    descricao:
      "Em uma reunião gratuita de 30 minutos, mapeamos a sua rotina financeira atual, os gargalos e o plano indicado para o porte da empresa.",
  },
  {
    numero: "2",
    titulo: "Nós assumimos a operação",
    descricao:
      "Você envia os documentos ou integra os sistemas e nós preparamos os agendamentos de pagamentos, a emissão de notas e as cobranças.",
  },
  {
    numero: "3",
    titulo: "Você aprova e acompanha",
    descricao:
      "Nada é pago sem a sua autorização. Você aprova os lotes no banco e recebe relatórios de Fluxo de Caixa e DRE para decidir com clareza.",
  },
];

const planos = [
  {
    nome: "Plano Essencial",
    descricao: "Para organizar a casa.",
    recursos: [
      "Até 50 transações",
      "16 Notas Fiscais",
      "Conciliação mensal",
      "Relatório de Fluxo de Caixa",
    ],
  },
  {
    nome: "Plano Performance",
    descricao: "Para empresas em crescimento.",
    recursos: [
      "Até 200 transações",
      "Até 60 Notas Fiscais",
      "Conciliação diária",
      "Agendamento no banco",
      "DRE gerencial",
    ],
  },
  {
    nome: "Plano Estratégico",
    descricao: "Gestão robusta e inteligência.",
    recursos: [
      "Transações sob medida",
      "Gestão de inadimplência",
      "Dashboards em tempo real (BI)",
      "Reunião de consultoria mensal",
    ],
  },
];

const RAIO_X = {
  texto: "Agendar meu Raio-X Financeiro",
  mensagem: MENSAGENS_WHATSAPP.raioXFinanceiro,
};

export default function BpoFinanceiroPage() {
  return (
    <>
      <Header />

      <main className="bg-slate-50 text-slate-900">
        <HeroSection
          tag="BPO Financeiro"
          titulo="Pare de perder tempo pagando contas e foque no que realmente importa: crescer a sua empresa."
          descricao="A BMN cuida da rotina financeira da sua empresa: contas a pagar e receber, notas, conciliação bancária e relatórios. Você aprova, nós executamos."
          botaoPrincipal={RAIO_X}
          botaoSecundario={{ texto: "Ver planos", href: "#planos" }}
          itens={[
            "Contas a pagar e a receber organizadas",
            "Conciliação bancária e emissão de notas",
            "Relatórios de Fluxo de Caixa e DRE todo mês",
          ]}
          destaque={{
            rotulo: "Você no controle",
            titulo: "Nada é pago sem a sua autorização.",
            texto:
              "Nós preparamos os agendamentos; a aprovação final e a senha master do banco ficam sempre com você.",
          }}
        />
        <DorSection
          titulo="A rotina financeira está travando o seu crescimento?"
          dores={dores}
          destaque="Com o BPO Financeiro, a rotina passa para a BMN e você continua aprovando cada pagamento. Nada sai da conta sem a sua autorização."
        />
        <PlanosSection planos={planos} />
        <ProcessSection titulo="Como funciona o BPO Financeiro da BMN" passos={passos} />

        <section className="bg-[#0b3f5e] py-16 text-white sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-cyan-300/30 bg-[#0d4d69] p-6 sm:p-10">
              <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Solicite uma proposta
              </p>
              <h2 className="mt-4 mb-8 text-center text-2xl font-black sm:text-3xl">
                Conte um pouco sobre a sua empresa e indicamos o plano adequado
              </h2>
              <LeadForm origem="BPO Financeiro" variante="escuro" textoBotao="Quero uma proposta" />
            </div>
          </div>
        </section>

        <BpoFaq />
        <CtaSection
          rotulo="Raio-X Financeiro gratuito"
          titulo="Pronto para profissionalizar a gestão do seu negócio?"
          descricao="Em 30 minutos, presencial ou on-line, mostramos como está a rotina financeira da sua empresa e qual plano faz sentido para o seu porte."
          botao={RAIO_X}
        />
      </main>

      <Footer />
      <WhatsAppButton mensagem={MENSAGENS_WHATSAPP.raioXFinanceiro} />
      <CookieNotice />
    </>
  );
}
