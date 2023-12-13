import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Metadata } from "next/types";
import Link from "next/link";
import { useState } from "react";
import { set } from "date-fns";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
    email: z.string().email({
      message: "Email inválido",
    }),
    password: z
      .string()
      .min(8, { message: "A password deve ter no mínimo 8 caracteres" }),
    passwordConfirmation: z.string(),
  })
  .refine(
    async (data) => {
      /**
       * Check if email exists
       */
      const response = await fetch("/api/auth/emailCheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });
      return response.json();
    },
    {
      message: "Email já registado",
      path: ["email"],
    }
  )
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As passwords não coincidem",
    path: ["passwordConfirmation"],
  });

export default function RegisterForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data, null, 2),
    });
    setLoading(false);

    if (response.status === 200) {
      toast({
        title: "Registado com sucesso",
        description: "A redirecionar para o login",
      });
      setTimeout(() => {
        router.push("/dashboard/login");
      }, 2000);
    } else {
      const { error } = await response.json();
      toast({
        title: "Erro ao registar",
      });
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Alberto Caeiro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="alberto@caeiro.pt"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Confirmar Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <Button type="submit" className="w-full">
            Registar
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-400">Ou</span>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href="/auth/login"
              className="text-slate-400 text-sm hover:underline"
            >
              Já tenho uma conta
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
