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

import { Metadata } from "next/types";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    email: z.string().email({
      message: "Email inválido",
    }),
    password: z
      .string()
      .min(8, { message: "A password deve ter no mínimo 8 caracteres" }),
  })
  .refine(
    async (data) => {
      /**
       * Check if email and password match
       */
      const response = await fetch("/api/auth/loginCheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      return response.json();
    },
    { message: "Email ou password incorretos", path: ["email"] }
  );

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (response?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Ocorreu um erro.",
        description: "Não foi possível efetuar login.",
      });
      return;
    }

    router.refresh();
    router.push("/");
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
            name="email"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@exemplo.com" {...field} />
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

          <Button type="submit" className="w-full">
            Fazer Login
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
              href="/auth/register"
              className="text-slate-400 text-sm hover:underline "
            >
              Ainda não tenho uma conta
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
