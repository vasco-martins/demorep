"use client";

import LoginForm from "@/components/dashboard/login";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

export default function Login() {
  return (
    <main className="grid md:grid-cols-2 min-h-screen">
      <div className="hidden  bg-slate-800 p-12 md:flex flex-col justify-between">
        <Link href={"/"}>
          <img src="/assets/logo-white.svg" alt="Logo" width={200} />
        </Link>
        <h1 className="text-lg text-slate-200">Recolhe os teus testemunhos!</h1>
      </div>
      <div className="flex flex-col items-center justify-center space-y-6 ">
        <div className="text-xl font-bold">Entre com a sua conta </div>
        <LoginForm />
      </div>
    </main>
  );
}
