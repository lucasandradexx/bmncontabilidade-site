import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import FormLogin from "@/components/admin/formLogin";
import { lerSessao } from "@/lib/admin/sessao";

export const metadata: Metadata = { title: "Entrar" };

export default async function LoginPage() {
  if (await lerSessao()) redirect("/admin/posts");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#041d2c] px-4 py-12">
      <div className="w-full max-w-sm">
        <Image
          src="/logo-bmn-white.svg"
          alt="BMN Contabilidade Estratégica"
          width={395.041}
          height={202.668}
          priority
          className="mx-auto h-20 w-auto"
        />
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-xl sm:p-8">
          <h1 className="text-xl font-black text-primary">Painel do blog</h1>
          <p className="mt-1 mb-6 text-sm text-slate-500">Entre para escrever e publicar artigos.</p>
          <FormLogin />
        </div>
        {process.env.NODE_ENV === "development" && (!process.env.ADMIN_USUARIO || !process.env.ADMIN_SENHA) && (
          <p className="mt-4 text-center text-xs text-amber-200/80">
            Login provisório ativo (admin / admin). Defina ADMIN_USUARIO e ADMIN_SENHA antes de publicar o site.
          </p>
        )}
      </div>
    </main>
  );
}
