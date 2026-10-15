import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/site";
import Analytics from "@/components/analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BMN Contabilidade Estratégica | Contabilidade para PMEs de todo o Brasil",
    template: "%s | BMN Contabilidade",
  },
  description:
    "Contabilidade estratégica para pequenas e médias empresas de todo o Brasil: diagnóstico fiscal, planejamento tributário e preparação para a Reforma.",
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
