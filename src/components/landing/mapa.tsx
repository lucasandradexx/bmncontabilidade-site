export default function Mapa() {
  return (
    <section className="w-full h-[420px] relative overflow-hidden">
      <iframe
        src="https://www.google.com/maps?q=Rua+Capitão+José+da+Luz,+25,+Coelhos,+Recife,+PE,+50070-540&output=embed"
        title="BMN Contabilidade - Localização"
        aria-label="Mapa com a localização da BMN Contabilidade"
        loading="lazy"
        className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
      />
    </section>
  );
}