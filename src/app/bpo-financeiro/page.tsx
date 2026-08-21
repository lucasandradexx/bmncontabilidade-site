import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/landing/whatsappButton";
import BpoFaq from "@/components/landing/bpoFaq";
import HeroSection from "@/components/bpo-financeiro/heroSection";
import DorSection from "@/components/bpo-financeiro/dorSection";
import ProcessSection from "@/components/bpo-financeiro/processSection";
import PlanosSection from "@/components/bpo-financeiro/planosSection";
import FormSection from "@/components/bpo-financeiro/formSection";
import CtaSection from "@/components/bpo-financeiro/ctaSection";

export const metadata = {
  title: "BPO Financeiro | BMN Contabilidade",
  description:
    "Terceirização financeira com organização, previsibilidade e controle para sua empresa crescer com segurança.",
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
    titulo: "Nós assumimos a operação",
    descricao:
      "Você nos envia os documentos ou integra os sistemas e nós fazemos todos os agendamentos de pagamentos, emissão de notas e cobranças.",
  },
  {
    numero: "2",
    titulo: "Você aprova com um clique",
    descricao:
      "Nada é pago sem a sua autorização. Você entra no banco apenas para aprovar os lotes de pagamento que já preparamos.",
  },
  {
    numero: "3",
    titulo: "Você recebe relatórios claros",
    descricao:
      "Entregamos relatórios de Fluxo de Caixa, DRE e performance para você entender exatamente para onde está indo o dinheiro da empresa.",
  },
];

const planos = [
  {
    nome: "Plano Essencial",
    descricao: "Para organizar a casa.",
    preco: "A partir de R$ 300,00/mês",
    recursos: [
      "Até 50 transações",
      "16 Notas Fiscais",
      "Conciliação mensal",
      "Relatório de Fluxo de Caixa",
    ],
    destaque: false,
    cta: "Escolher Essencial",
    href: "/bpo-financeiro/plano/essencial",
  },
  {
    nome: "Plano Performance",
    descricao: "Para empresas em crescimento.",
    preco: "A partir de R$ 497,00/mês",
    recursos: [
      "Até 200 transações",
      "Até 60 Notas Fiscais",
      "Conciliação diária",
      "Agendamento no banco",
      "DRE gerencial",
    ],
    destaque: false,
    cta: "Escolher Performance",
    href: "/bpo-financeiro/plano/performance",
  },
  {
    nome: "Plano Estratégico",
    descricao: "Gestão robusta e inteligência.",
    preco: "A partir de R$ 850,00/mês",
    recursos: [
      "Transações sob medida",
      "Gestão de inadimplência",
      "Dashboards em tempo real (BI)",
      "Reunião de consultoria mensal",
    ],
    destaque: true,
    cta: "Escolher Estratégico",
    href: "/bpo-financeiro/plano/estrategico",
  },
];

export default function BpoFinanceiroLandingPage() {
  return (
    <>
      <Header />

      <main className="bg-slate-50 text-slate-900">
        <HeroSection />
        <DorSection dores={dores} />
        <PlanosSection planos={planos} />
        <ProcessSection passos={passos} />
        <FormSection />
        <BpoFaq />
        <CtaSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
