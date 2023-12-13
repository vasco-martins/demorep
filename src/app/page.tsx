"use client";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-slate-100">
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-[50vh] gap-8">
        <Image src={"/assets/logo.svg"} width={150} height={50} alt="Logo" />
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">
            Coletar testemunhos nunca foi tão fácil
          </h1>
          <p>
            Com a Big Idea, consegue coletar testemunhos dos seus cursos,
            aplicações e muito mais!
          </p>
        </div>
        <Button>Experimentar Gratuitamente!</Button>
      </div>
    </main>
  );
}
