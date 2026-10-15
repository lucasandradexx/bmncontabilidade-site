import Image from "next/image";
import Link from "next/link";
import NavAdmin from "@/components/admin/navAdmin";
import { exigirSessao } from "@/lib/admin/sessao";

export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  const { usuario } = await exigirSessao();

  return (
    <div className="lg:flex">
      <aside className="bg-[#041d2c] px-4 py-5 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0">
        <Link href="/admin/posts" className="mb-6 flex items-center gap-3 px-2">
          <Image
            src="/logo-bmn-white.svg"
            alt="BMN Contabilidade Estratégica"
            width={395.041}
            height={202.668}
            className="h-12 w-auto"
          />
        </Link>
        <div className="lg:h-[calc(100%-4.5rem)]">
          <NavAdmin usuario={usuario} />
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
