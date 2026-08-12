import Header from "@/components/header";
import Footer from "@/components/footer";
import Hero from "@/components/landing/hero";
import Especialidades from "@/components/landing/especialidades";
import Sobre from "@/components/landing/sobre";
import Vantagens from "@/components/landing/vantagens";
import Proposito from "@/components/landing/proposito";
import BannerCTA from "@/components/landing/bannerCTA";
import Processos from "@/components/landing/processos";
import FAQ from "@/components/landing/faq";
import ContatoInfo from "@/components/landing/contatoInfo";
import ContatoForm from "@/components/landing/contatoForm";
import Mapa from "@/components/landing/mapa";
import CookieNotice from "@/components/landing/cookieNotice";
import Hub from "@/components/landing/hub";
import ChatWidget from "@/components/chatWidget";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Início */}
        <section id="inicio" className="scroll-mt-24">
          <Hero />
        </section>

        {/* Segmentos */}
        <section id="especialidades" className="scroll-mt-24">
          <Especialidades />
        </section>

        {/* Sobre */}
        <section id="sobre" className="scroll-mt-24">
          <Sobre />
        </section>

        {/* Vantagens */}
        <section className="scroll-mt-24">
          <Vantagens />
        </section>

        {/* Serviços */}
        <section id="servicos" className="scroll-mt-24">
          <Hub />
        </section>

        {/* Propósito e Atendimento */}
        <section id="proposito" className="scroll-mt-24">
          <Proposito />
          <Processos />
        </section>

        {/* CTA intermediário */}
        <BannerCTA
          subtitulo="Transforme intenção em ação."
          titulo="O sucesso exige movimento!"
          descricao="Construa uma trajetória sólida ao lado de profissionais que transformam
                     planejamento em ação, decisões em resultados e gestão em vantagem competitiva."
          textoBotao="Comece agora!"
          href="https://wa.me/558194725310"
          externo
        />

        {/* FAQ */}
        <FAQ />

        {/* Contato */}
        <section id="contato" className="scroll-mt-24">
          <ContatoInfo />
          <ContatoForm />
          <Mapa />
        </section>

        {/* CTA final */}
        <BannerCTA
          titulo="Pronto para transformar números em decisões inteligentes?"
          descricao="Com a BMN Contabilidade, você ganha clareza, segurança e vantagem
                     competitiva. Chegou a hora de estruturar seu negócio com precisão
                     técnica e estratégia de alto nível."
          textoBotao="Fale com nossa equipe!"
          href="https://wa.me/558194725310"
          externo
        />
      </main>

      <Footer />
      <CookieNotice />
      <ChatWidget />
    </>
  );
}