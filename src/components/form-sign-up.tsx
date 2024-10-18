import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const signUpSchema = z.object({
  name: z.string({ message: 'Digite seu nome' }),
  email: z.string({ message: "Digite seu email" }).email({ message: "Digite um email válido." }),
  password: z
    .string({ message: "Digite sua senha" })
    .min(8, { message: 'A  senha deve ter no mínimo 08 caracteres' }),

  contact: z.number({ message: "Digite seu número" }).min(1, { message: "O ramal deve ter mais de 01 dígito" }).max(4, { message: "O ramal deve ter 4 digitos" }),
  contact_secondary: z.number({ message: "Digite seu número" }).min(3, { message: "O número deve ter mais  de 08 dígitos" }),
  enterprise: z.string({ message: "Selecione sua empresa" }),
  sector: z.string({ message: "Selecione o seu setor" }),

})
type SignUpData = z.infer<typeof signUpSchema>

export async function FormSignUp() {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  })

  function handleSignUp(data: SignUpData) {
    console.log(data)
  }
  return (
    <form className='mt-2 flex flex-col' onSubmit={handleSubmit(handleSignUp)}>
      <div className="space-y-1">
        <Label className='ml-1'>Nome</Label>
        <Input type="text" id='name' {...register('name')} placeholder='seu nome...' />
        {errors.name?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.name?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className='ml-1'>E-mail</Label>
        <Input type="email" id='email' {...register('email')} placeholder='email@email.com' />
        {errors.email?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.email?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className='ml-1'>Senha</Label>
        <Input type="password" id='password' {...register('password')} placeholder='********' />
        {errors.password?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.password?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className='ml-1'>Ramal</Label>
        <Input type="number" id='contact' {...register('contact')} placeholder="0000" className="[appearance:textfield]  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
        {errors.contact?.message && (
          <p className="text-red-500 text-sm font-light">
            {errors.contact?.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label className='ml-1'>Contato</Label>
        <Input type="tel" id='contact_secondary' {...register('contact_secondary')} placeholder="(00) 00000-0000" className="[appearance:textfield]  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
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
            <Select onValueChange={onChange} value={value} name="enterprise">
              <SelectTrigger ref={ref}>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {/* {Object.entries(enterprises).map(([value, name]) => (
                  <SelectItem key={value} value={value}>
                    {name}
                  </SelectItem>
                ))} */}
                <SelectItem value="frigoapms">Frigo apms</SelectItem>
                <SelectItem value="frigoapsp">Frigo apsp</SelectItem>
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
            <Select onValueChange={onChange} value={value} name="sector">
              <SelectTrigger ref={ref}>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {/* {Object.entries(sectors).map(([value, name]) => (
                  <SelectItem key={value} value={value}>
                    {name}
                  </SelectItem>
                ))} */}
                <SelectItem value="abate">Abate</SelectItem>
                <SelectItem value="desossa">Desossa</SelectItem>
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
        <Button type="submit" className='w-full'>
          Criar conta
          <span className="sr-only">Sign-up</span>
        </Button>
      </div>
    </form>
  )
}