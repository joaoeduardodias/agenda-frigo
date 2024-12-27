import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";

import { createEnterprise } from "@/app/http/create-enterprise";
import { getSectors } from "@/app/http/get-sectors";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { CircleCheck, CircleX } from "lucide-react";
import { toast } from "sonner";
import { MultiSelect } from "./multi-select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const sectorSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const createEnterpriseSchema = z.object({
  name: z.string({ message: "Digite o nome" }),
  zipCode: z
    .string({ message: "Digite o cep" })
    .transform((value) => value.replace(/\D/g, "")),
  city: z.string({ message: "Digite a cidade" }),
  uf: z
    .string({ message: "Digite a UF" })
    .max(2, { message: "A UF deve conter dois digitos." }),
  contact: z
    .string({ message: "Digite seu contato." })
    .transform((value) => value.replace(/\D/g, "")),
  sectors: z.array(sectorSchema, { message: "Adicione os setores." }),
});
type CreateEnterpriseData = z.infer<typeof createEnterpriseSchema>;

export function FormCreateEnterprise() {
  const {
    control,
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEnterpriseData>({
    resolver: zodResolver(createEnterpriseSchema),
  });
  const registerWithMask = useHookFormMask(register);
  const queryClient = new QueryClient();
  const createEnterpriseMutation = useMutation({
    mutationFn: createEnterprise,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-users"] });
      toast.success("Empresa criada com sucesso", {
        richColors: true,
        position: "top-right",
        icon: <CircleCheck />,
      });
    },
    onError: (error) => {
      if (error.message === "Enterprise already existing with contact") {
        toast.error(
          "Já existe uma empresa com este contato, por favor verifique e tente novamente.",
          {
            richColors: true,
            position: "top-right",
            icon: <CircleX />,
          }
        );
      } else {
        toast.error("Erro encontrado, por favor tente novamente", {
          richColors: true,
          position: "top-right",
          icon: <CircleX />,
        });
      }
      console.log("error " + error.message);
    },
  });

  function handleCreateEnterprise(data: CreateEnterpriseData) {
    createEnterpriseMutation.mutateAsync({
      city: data.city,
      contact: data.contact,
      name: data.name,
      sectors: data.sectors,
      uf: data.uf,
      zipCode: data.zipCode,
    });
  }

  const { data: dataSectors } = useQuery({
    queryKey: ["list-sectors"],
    queryFn: getSectors,
  });

  const zipCodeInput = watch("zipCode");
  const extractNumbers = String(zipCodeInput).replace(/\D/g, "");

  if (zipCodeInput && extractNumbers.length === 8) {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${extractNumbers}/json/`
        );
        const data = await response.json();

        if (!data.erro) {
          setValue("city", data.localidade || "");
          setValue("uf", data.uf || "");
        } else {
          console.error("CEP não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
      }
    };
    fetchAddress();
  }

  if (!dataSectors && dataSectors === undefined) return;

  return (
    <form
      className="mt-2 flex flex-col"
      onSubmit={handleSubmit(handleCreateEnterprise)}
    >
      <div className="space-y-1">
        <Label className="ml-1">Nome</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Digite o nome da empresa."
        />
        {errors.name?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.name?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className="ml-1">Cep</Label>
        <Controller
          name="zipCode"
          defaultValue={" "}
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              {...field}
              value={field.value || ""}
              {...registerWithMask("zipCode", ["99999-999"], {
                placeholder: " ",
              })}
            />
          )}
        />

        {errors.zipCode?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.zipCode?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className="ml-1">Cidade</Label>
        <Input
          disabled={extractNumbers.length !== 8}
          id="city"
          {...register("city")}
          placeholder="Digite a cidade"
        />
        {errors.city?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.city?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className="ml-1">Uf</Label>
        <Input
          disabled={extractNumbers.length !== 8}
          id="uf"
          {...register("uf")}
          placeholder="Digite a uf"
        />
        {errors.uf?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.uf?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className="ml-1">Contato</Label>
        <Controller
          name="contact"
          control={control}
          defaultValue={" "}
          render={({ field }) => (
            <Input
              type="tel"
              {...field}
              value={field.value || ""}
              {...registerWithMask("contact", ["(99) 9999-9999"])}
              placeholder="(00) 0000-0000"
            />
          )}
        />
        {errors.contact?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.contact?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className="ml-1">Setores</Label>
        <Controller
          control={control}
          defaultValue={[]}
          name="sectors"
          render={({ field }) => (
            <MultiSelect
              {...field}
              value={field.value}
              ref={field.ref}
              onChange={field.onChange}
              sectors={dataSectors.sectors}
            />
          )}
        />
        {errors.sectors?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.sectors?.message}
          </p>
        )}
      </div>
      <div className="flex-1 mt-3">
        <Button type="submit" className="w-full">
          Criar Empresa
          <span className="sr-only">create enterprise</span>
        </Button>
      </div>
    </form>
  );
}
