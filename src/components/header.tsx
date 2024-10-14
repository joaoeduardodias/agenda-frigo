"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

const signInSchema = z.object({
  email: z.string({message: "Digite seu email"}).email({message: "Digite um email válido."}),
  password: z
    .string({message: "Digite sua senha"})
    .min(8, { message: 'A  senha deve ter no mínimo 08 caracteres' }),
})
type SignInData = z.infer<typeof signInSchema>

export function Header() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  function handleSignIn(data: SignInData) {
    console.log(data)
  }

  return (
    <header className="flex items-center justify-end  h-full border-b p-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex items-center justify-center gap-2">
            Adicionar
            <Plus className="size-4" />
          </Button>
        </SheetTrigger>
   
        <SheetContent >
        <SheetHeader className='mt-4'>
          <SheetTitle>Sign-in</SheetTitle>
          <SheetDescription>
            Faça o login para criar e/ou editar contatos
          </SheetDescription>
        </SheetHeader>
          <form className='mt-2 flex flex-col' onSubmit={handleSubmit(handleSignIn)}>
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
            <div className="flex-1 mt-3">
              <Button type="submit" className='w-full'>
                Entrar
                <span className="sr-only">Sign-in</span>
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </header>
  )
}
