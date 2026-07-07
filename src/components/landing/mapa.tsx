export default function Mapa() {
  return (
    <section className="w-full h-[420px] relative overflow-hidden">
      <iframe
        src="https://maps.google.com/maps?q=R.%20Francisco%20Alves%2C%2075%20-%20Ilha%20do%20Leite%2C%20Recife%20-%20PE%2C%2050070-565&t=m&z=14&output=embed&iwloc=near"
        title="BMN Contabilidade - Localização"
        aria-label="Mapa com a localização da BMN Contabilidade"
        loading="lazy"
        className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
      />
    </section>
  );
}