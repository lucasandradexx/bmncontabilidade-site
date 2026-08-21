import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/landing/whatsappButton";
import FormSection from "@/components/bpo-financeiro/formSection";

const PLANOS: Record<string, { nome: string; descricao: string }> = {
  essencial: {
    nome: "Plano Essencial",
    descricao: "Para empresas que precisam organizar a rotina financeira com praticidade e controle.",
  },
  performance: {
    nome: "Plano Performance",
    descricao: "Para empresas em crescimento que precisam mais agilidade, previsibilidade e apoio financeiro.",
  },
  estrategico: {
    nome: "Plano Estratégico",
    descricao: "Para negócios que exigem gestão financeira robusta, inteligência e suporte estratégico.",
  },
};

export const dynamic = "force-static";

export default async function PlanoBpoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const plano = PLANOS[slug] ?? {
    nome: "Plano",
    descricao: "Solicite uma conversa com nossa equipe para encontrar a melhor solução para o seu negócio.",
  };

  return (
    <>
      <Header />

      <main className="bg-slate-50 text-slate-900">
        <FormSection titulo={`Quero saber mais sobre o ${plano.nome}`} buttonLabel="Enviar" />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
