import type { Metadata } from "next";
import PaginaLegal from "@/components/paginas/paginaLegal";
import { POLITICA_PRIVACIDADE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a BMN Contabilidade Estratégica coleta, usa e protege seus dados pessoais, conforme a LGPD, e como exercer seus direitos.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <PaginaLegal
      titulo="Política de Privacidade"
      subtitulo="Como tratamos os seus dados pessoais, com sigilo profissional e conforme a Lei Geral de Proteção de Dados."
      secoes={POLITICA_PRIVACIDADE}
    />
  );
}
