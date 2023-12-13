"use client";

import RegisterForm from "@/components/dashboard/register";

export default function Register() {
  return (
    <main className="grid md:grid-cols-2 min-h-screen ">
      <div className="hidden  bg-slate-800 p-12 md:flex flex-col justify-between bg-gradient-to-tl from-slate-400 to-blue-500">
        <img src="/assets/logo-white.svg" alt="Logo" width={200} />
        <h1 className="text-lg text-slate-200">Recolhe os teus testemunhos!</h1>
      </div>
      <div className="flex flex-col items-center justify-center space-y-6 ">
        <div className="text-xl font-bold">Crie uma conta</div>
        <RegisterForm />
      </div>
    </main>
  );
}
