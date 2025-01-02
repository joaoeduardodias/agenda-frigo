import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const signInSchema = z.object({
  email: z
    .string({ message: "Digite seu email" })
    .email({ message: "Digite um email válido." }),
  password: z
    .string({ message: "Digite sua senha" })
    .min(8, { message: "A  senha deve ter no mínimo 08 caracteres" }),
});
type SignInData = z.infer<typeof signInSchema>;

export function FormSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSignIn(data: SignInData) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!result || result.error) {
        toast.error("Usuário ou senha inválidos. Tente novamente.", {
          position: "top-right",
          icon: <CircleX />,
        });
      }
    } catch (error) {
      toast.error("Erro encontrado, por favor tente novamente: " + error, {
        position: "top-right",
        icon: <CircleX />,
      });
    }
  }

  return (
    <form className="mt-2 flex flex-col" onSubmit={handleSubmit(handleSignIn)}>
      <div className="space-y-1">
        <Label className="ml-1">E-mail</Label>
        <Input
          type="email"
          id="email"
          {...register("email")}
          placeholder="email@email.com"
        />
        {errors.email?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.email?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className="ml-1">Senha</Label>
        <Input
          type="password"
          id="password"
          {...register("password")}
          placeholder="********"
        />
        {errors.password?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.password?.message}
          </p>
        )}
      </div>
      <div className="flex-1 mt-3">
        <span>Esqueci</span>
        <Button type="submit" className="w-full">
          Entrar
          <span className="sr-only">Sign-in</span>
        </Button>
      </div>
    </form>
  );
}
