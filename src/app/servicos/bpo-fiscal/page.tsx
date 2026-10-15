import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/landing/whatsappButton";
import CookieNotice from "@/components/landing/cookieNotice";
import BpoFaq from "@/components/landing/bpoFaq";
import HeroSection from "@/components/bpo-financeiro/heroSection";
import DorSection from "@/components/bpo-financeiro/dorSection";
import ProcessSection from "@/components/bpo-financeiro/processSection";
import CtaSection from "@/components/bpo-financeiro/ctaSection";
import LeadForm from "@/components/leadForm";
import { getServicoBySlug } from "@/lib/servicos";
import { MENSAGENS_WHATSAPP } from "@/lib/empresa";

const servico = getServicoBySlug("bpo-fiscal")!;

export const metadata: Metadata = {
  title: servico.seo.title,
  description: servico.seo.description,
};

const dores = [
  "Você não tem certeza se todas as obrigações da empresa estão sendo entregues.",
  "Notas fiscais rejeitadas e retrabalho atrasam o faturamento.",
  "Recebeu uma notificação da Receita, da SEFAZ ou da Prefeitura.",
  "A empresa não consegue tirar certidão negativa.",
  "Guias pagas fora do prazo geram multa e juros todo mês.",
];

const passos = [
  {
    numero: "1",
    titulo: "Diagnóstico Fiscal gratuito",
    descricao:
      "Verificamos a empresa na Receita Federal, na PGFN, na Secretaria da Fazenda e na Prefeitura e apresentamos as pendências encontradas.",
  },
  {
    numero: "2",
    titulo: "Rotina fiscal estruturada",
    descricao:
      "Organizamos apuração, emissão de notas e calendário de obrigações conforme o regime e a atividade da empresa.",
  },
  {
    numero: "3",
    titulo: "Execução e conferência mensal",
    descricao:
      "Apuramos, emitimos guias e enviamos as obrigações mês a mês, com conferência antes de cada entrega e aviso antecipado de prazos.",
  },
];

const DIAGNOSTICO = {
  texto: "Quero meu Diagnóstico Fiscal gratuito",
  mensagem: MENSAGENS_WHATSAPP.bpoFiscal,
};

export default function BpoFiscalPage() {
  return (
    <>
      <Header />

      <main className="bg-slate-50 text-slate-900">
        <HeroSection
          tag="BPO Fiscal"
          titulo="Sua rotina fiscal em dia, sem depender da memória de ninguém."
          descricao="A BMN assume a apuração, a emissão de notas e guias e o envio das obrigações da sua empresa, nas esferas federal, estadual e municipal, com conferência antes de cada entrega."
          botaoPrincipal={DIAGNOSTICO}
          botaoSecundario={{ texto: "Como funciona", href: "#como-funciona" }}
          itens={servico.beneficios.slice(0, 3)}
          destaque={{
            rotulo: "Porta de entrada",
            titulo: "Diagnóstico Fiscal gratuito",
            texto:
              "Relatório de pendências em cada órgão e proposta de rotina fiscal terceirizada, sem obrigação de contratar.",
          }}
        />
        <DorSection
          titulo="O setor fiscal da sua empresa tira o seu sono?"
          dores={dores}
          destaque="Com o BPO Fiscal, as pendências são tratadas antes de virarem problema, com monitoramento contínuo e linguagem clara."
        />

        <div id="como-funciona" className="scroll-mt-24">
          <ProcessSection titulo="Como funciona o BPO Fiscal da BMN" passos={passos} />
        </div>

        <section className="bg-[#0b3f5e] py-16 text-white sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-cyan-300/30 bg-[#0d4d69] p-6 sm:p-10">
              <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Solicite uma proposta
              </p>
              <h2 className="mt-4 mb-8 text-center text-2xl font-black sm:text-3xl">
                Conte um pouco sobre a sua empresa
              </h2>
              <LeadForm origem="BPO Fiscal" variante="escuro" textoBotao="Quero uma proposta" />
            </div>
          </div>
        </section>

        <BpoFaq perguntas={servico.faq} />
        <CtaSection
          rotulo="Diagnóstico Fiscal gratuito"
          titulo="Saiba hoje como está a sua empresa"
          descricao="Atendimento 100% digital para empresas de todo o Brasil, direto com os sócios."
          botao={DIAGNOSTICO}
        />
      </main>

      <Footer />
      <WhatsAppButton mensagem={MENSAGENS_WHATSAPP.bpoFiscal} />
      <CookieNotice />
    </>
  );
}
