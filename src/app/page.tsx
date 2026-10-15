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
import { MENSAGENS_WHATSAPP, waLink } from "@/lib/empresa";

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
          subtitulo="Reforma Tributária"
          titulo="Antes de pagar mais imposto, entenda o que muda com a Reforma."
          descricao="O Raio-X da Reforma mostra o que a CBS e o IBS mudam no preço e na margem
                     da sua empresa, quando muda e quais decisões precisam ser tomadas agora."
          textoBotao="Conhecer o Raio-X da Reforma"
          href="/reforma-tributaria"
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
          titulo="Pensando em trocar de contador?"
          descricao="Converse com os sócios da BMN e veja como funciona a troca, sem burocracia
                     e com atendimento 100% digital para empresas de todo o Brasil."
          textoBotao="Quero trocar de contador"
          href={waLink(MENSAGENS_WHATSAPP.trocaContador)}
          externo
        />
      </main>

      <Footer />
      <CookieNotice />
      <ChatWidget />
    </>
  );
}