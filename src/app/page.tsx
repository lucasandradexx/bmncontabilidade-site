import Header         from "@/components/header";
import Footer         from "@/components/footer";
import Hero           from "@/components/landing/hero";
import Especialidades from "@/components/landing/especialidades";
import Sobre          from "@/components/landing/sobre";
import Vantagens      from "@/components/landing/vantagens";
import Servicos       from "@/components/landing/servicos";
import Proposito      from "@/components/landing/proposito";
import BannerCTA      from "@/components/landing/bannerCTA";
import Processos      from "@/components/landing/processos";
import FAQ            from "@/components/landing/faq";
import ContatoInfo    from "@/components/landing/contatoInfo";
import ContatoForm    from "@/components/landing/contatoForm";
import Mapa           from "@/components/landing/mapa";
import WhatsAppButton from "@/components/landing/whatsappButton";
import CookieNotice   from "@/components/landing/cookieNotice";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Banner principal com slideshow */}
        <Hero />

        {/* Segmentos atendidos */}
        <Especialidades />

        {/* Quem somos */}
        <Sobre />

        {/* Fotos da equipe + gráficos */}
        <Vantagens />

        {/* Serviços oferecidos */}
        <Servicos />

        {/* Missão, Visão e Valores */}
        <Proposito />

        {/* Banner CTA intermediário */}
        <BannerCTA
          subtitulo="Transforme intenção em ação."
          titulo="O sucesso exige movimento!"
          descricao="Construa uma trajetória sólida ao lado de profissionais que transformam
                     planejamento em ação, decisões em resultados e gestão em vantagem competitiva."
          textoBotao="Comece agora!"
          href="https://wa.me/558197058083"
          externo
        />

        {/* Como funciona o atendimento */}
        <Processos />

        {/* Perguntas frequentes */}
        <FAQ />

        {/* Informações de contato (cards) */}
        <ContatoInfo />

        {/* Formulário de contato */}
        <ContatoForm />

        {/* Google Maps */}
        <Mapa />

        {/* Banner CTA final */}
        <BannerCTA
          titulo="Pronto para transformar números em decisões inteligentes?"
          descricao="Com a BMN Contabilidade, você ganha clareza, segurança e vantagem
                     competitiva. Chegou a hora de estruturar seu negócio com precisão
                     técnica e estratégia de alto nível."
          textoBotao="Fale com um consultor"
          href="#contato"
        />
      </main>

      <Footer />

      {/* Botão flutuante WhatsApp */}
      <WhatsAppButton />

      {/* Aviso de cookies */}
      <CookieNotice />
    </>
  );
}