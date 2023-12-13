"use client";
import CollectorWrapper from "@/components/dashboard/collector/collectorWrapper";
import { useSession } from "next-auth/react";
import { z } from "zod";

interface CollectorPageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: CollectorPageProps) {
  const { id } = params;
  const { data: session } = useSession();

  const FormSchema = z.object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter no mínimo 3 caracteres" })
      .max(30, { message: "O nome deve ter no máximo 30 caracteres" })
      .refine(
        async (name) => {
          // Fetch collector from API to see if exists
          const response = await fetch("/api/collectors/exists", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              name: name,
              email: session?.user?.email,
            }),
          });
          const json = await response.json();
          return json;
        },
        { message: "Já existe um coletor com esse nome" }
      ),
    textCollect: z.boolean().default(false).optional(),
    videoCollect: z.boolean().default(false).optional(),
  });

  return (
    <CollectorWrapper params={{ id: id, active: "form" }}>awd</CollectorWrapper>
  );
}
