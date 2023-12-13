import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { Switch } from "@/components/ui/switch";
import { set } from "date-fns";

interface CollectorDialogProps {
  onSubmit: () => void;
}

/**
 * This is a dialog that is triggered by a button.
 */
export default function CollectorDialog({ onSubmit }: CollectorDialogProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

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
            body: JSON.stringify({ name: name, email: session?.user?.email }),
          });
          const json = await response.json();
          return json;
        },
        { message: "Já existe um coletor com esse nome" }
      ),
    textCollect: z.boolean().default(false).optional(),
    videoCollect: z.boolean().default(false).optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      textCollect: false,
      videoCollect: false,
    },
  });

  const submit = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/collectors/add", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        textCollect: data.textCollect,
        videoCollect: data.videoCollect,
        email: session?.user?.email,
      }),
    });
    onSubmit();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Adicionar +</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Novo Coletor</AlertDialogTitle>
          <AlertDialogDescription>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(submit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Coletor de ..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="textCollect"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <span className="space-y-0.5">
                          <FormLabel
                            className={`${
                              field.value
                                ? "text-green-600 text-base"
                                : "text-base"
                            }`}
                          >
                            Coletar Testemunhos em Texto
                          </FormLabel>
                        </span>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="videoCollect"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <span className="space-y-0.5">
                          <FormLabel
                            className={`${
                              field.value
                                ? "text-green-600 text-base"
                                : "text-base"
                            }`}
                          >
                            Coletar Testemunhos em Vídeo
                          </FormLabel>
                        </span>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            className="bg-green-500 hover:bg-green-600"
            onClick={async (e) => {
              e.preventDefault();
              try {
                if (await FormSchema.parseAsync(form.getValues())) {
                  submit(form.getValues());
                  setOpen(false);
                }
              } catch (err) {}
            }}
          >
            Adicionar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
