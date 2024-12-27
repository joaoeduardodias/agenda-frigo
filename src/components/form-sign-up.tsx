"use client";
import { createUser } from "@/app/http/create-user";
import { getEnterprises } from "@/app/http/get-enterprises";
import { getSectorsByEnterprise } from "@/app/http/get-sectors-by-enterprise";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleCheck, CircleX } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const signUpSchema = z.object({
  name: z.string({ message: "Digite seu nome" }),
  email: z
    .string({ message: "Digite seu email" })
    .email({ message: "Digite um email válido." }),
  password: z
    .string({ message: "Digite sua senha" })
    .min(8, { message: "A  senha deve ter no mínimo 08 caracteres" }),
  contact: z.string({ message: "Digite seu ramal" }),
  contact_secondary: z.string().optional(),
  enterprise: z.string({ message: "Selecione sua empresa" }),
  sector: z.string({ message: "Selecione o seu setor" }),
});
type SignUpData = z.infer<typeof signUpSchema>;

export function FormSignUp() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });
  const registerWithMask = useHookFormMask(register);

  const queryClient = useQueryClient();
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: async ({ message }) => {
      switch (message) {
        case "User already exists":
          toast.error("Usuário já existente!", {
            richColors: true,
            position: "top-right",
            icon: <CircleX />,
          });
          break;

        case "Missing data":
          toast.error("Dados faltando, por favor verifique", {
            richColors: true,
            position: "top-right",
            icon: <CircleX />,
          });
          break;

        default:
          await queryClient.invalidateQueries({ queryKey: ["get-users"] });
          toast.success("Usuário cadastrado com sucesso", {
            richColors: true,
            position: "top-right",
            icon: <CircleCheck />,
          });
      }
    },
    onError: (error) => {
      toast.error(
        "Erro encontrado, por favor tente novamente: " + error.message,
        {
          richColors: true,
          position: "top-right",
          icon: <CircleX />,
        }
      );
      console.log("error" + error.message);
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["get-enterprises"],
    queryFn: getEnterprises,
    staleTime: 1000 * 60 * 60, // 1hour
  });

  const enterpriseId = watch("enterprise");
  const { data: dataSector, isLoading: loadingSectors } = useQuery({
    queryKey: ["get-sectors", enterpriseId],
    queryFn: () => getSectorsByEnterprise({ enterpriseId }),
    staleTime: 1000 * 60 * 60, // 1hour
    enabled: !!enterpriseId,
  });
  function handleSignUp(data: SignUpData) {
    createUserMutation.mutateAsync({
      contact: data.contact,
      contact_secondary: data.contact_secondary,
      name: data.name,
      email: data.email,
      enterprise: data.enterprise,
      password: data.password,
      sector: data.sector,
    });
    reset();
  }
  return (
    <form className="mt-2 flex flex-col" onSubmit={handleSubmit(handleSignUp)}>
      <div className="space-y-1">
        <Label className="ml-1">Nome</Label>
        <Input
          type="text"
          id="name"
          {...register("name")}
          placeholder="seu nome..."
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.name?.message}
          </p>
        )}
      </div>
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
      <div className="space-y-1">
        <Label className="ml-1">Ramal</Label>
        <Input
          type="tel"
          id="contact"
          {...registerWithMask("contact", ["9999"])}
          placeholder="0000"
          className="[appearance:textfield]  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {errors.contact?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.contact?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className="ml-1">Contato</Label>

        <Input
          type="text"
          id="contact_secondary"
          {...registerWithMask("contact_secondary", [
            "(99) 99999-9999",
            "99999-9999",
          ])}
          placeholder="(00) 00000-0000"
        />
        {errors.contact_secondary?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.contact_secondary?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="enterprise">Selecione sua empresa</Label>
        <Controller
          name="enterprise"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              onValueChange={onChange}
              value={value}
              name="enterprise"
              disabled={isLoading}
            >
              <SelectTrigger ref={ref}>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {data?.enterprises.map((enterprise) => {
                  return (
                    <SelectItem key={enterprise.id} value={enterprise.id}>
                      {enterprise.name} - {enterprise.city} {enterprise.uf}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
        {errors.enterprise && (
          <p className="text-red-500 text-sm font-light">
            {errors.enterprise.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="sector">Selecione seu setor</Label>
        <Controller
          name="sector"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              onValueChange={onChange}
              value={value}
              name="sector"
              disabled={loadingSectors}
            >
              <SelectTrigger ref={ref}>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {dataSector?.sectors.map((sector) => {
                  return (
                    <SelectItem key={sector.id} value={sector.name}>
                      {sector.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
        {errors.sector && (
          <p className="text-red-500 text-sm font-light">
            {errors.sector.message}
          </p>
        )}
      </div>
      <div className="flex-1 mt-3">
        <Button type="submit" className="w-full">
          Criar conta
          <span className="sr-only">Sign-up</span>
        </Button>
      </div>
    </form>
  );
}
