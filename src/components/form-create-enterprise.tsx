import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useHookFormMask } from 'use-mask-input';
import { z } from "zod";

import { useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";


const createEnterpriseSchema = z.object({
  name: z.string({ message: "Digite o nome" }),
  zipCode: z.number({ message: "Digite o cep" }),
  city: z.string({ message: "Digite a cidade" }),
  uf: z.string({ message: "Digite a UF" }).max(2, { message: "A UF deve conter dois digitos." }),
  contact: z.number({ message: "Digite seu contato." }),
  sectors: z.string({ message: "Adicione os setores." })
})
type CreateEnterpriseData = z.infer<typeof createEnterpriseSchema>


export function FormCreateEnterprise() {
  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateEnterpriseData>({
    resolver: zodResolver(createEnterpriseSchema),
  })
  const registerWithMask = useHookFormMask(register);

  function handleCreateEnterprise(data: CreateEnterpriseData) {
    console.log(data)
  }

  const zipCodeInput = watch('zipCode')
  const extractNumbers = String(zipCodeInput).replace(/\D/g, "");

  useEffect(() => {

    if (zipCodeInput && extractNumbers.length === 8) {
      const fetchAddress = async () => {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${extractNumbers}/json/`);
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
      }
      fetchAddress()
    }

  }, [zipCodeInput, setValue])


  return (
    <form className='mt-2 flex flex-col' onSubmit={handleSubmit(handleCreateEnterprise)}>
      <div className="space-y-1">
        <Label className='ml-1'>Nome</Label>
        <Input id='name' {...register('name')} placeholder='Digite o nome da empresa.' />
        {errors.name?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.name?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className='ml-1'>Cep</Label>
        <Input type="text" id='zipCode' {...registerWithMask('zipCode', ['99999-999'], { placeholder: " " })} className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />

        {errors.zipCode?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.zipCode?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className='ml-1'>Cidade</Label>
        <Input disabled={extractNumbers.length !== 8} id='city' {...register('city')} placeholder="Digite a cidade" />
        {errors.city?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.city?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className='ml-1'>Uf</Label>
        <Input disabled={extractNumbers.length !== 8} id='uf' {...register('uf')} placeholder="Digite a uf" />
        {errors.uf?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.uf?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className='ml-1'>Contato</Label>
        <Input type="tel" id='contact' {...registerWithMask('contact', ['(99) 9999-9999'])} placeholder="(00) 0000-0000" className="[appearance:textfield]  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />

        {errors.contact?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.contact?.message}
          </p>
        )}
      </div>
      <div className="flex-1 mt-3">
        <Button type="submit" className='w-full'>
          Criar
          <span className="sr-only">Sign-in</span>
        </Button>
      </div>
    </form>
  )
}