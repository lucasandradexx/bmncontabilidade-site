import type { Metadata } from "next";
import PaginaLegal from "@/components/paginas/paginaLegal";
import { TERMOS_DE_USO } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições de uso do site da BMN Contabilidade Estratégica.",
};

export default function TermosDeUsoPage() {
  return (
    <PaginaLegal
      titulo="Termos de Uso"
      subtitulo="Condições para acessar e utilizar o site da BMN Contabilidade Estratégica."
      secoes={TERMOS_DE_USO}
    />
  );
}
