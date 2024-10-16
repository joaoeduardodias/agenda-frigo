"use client"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
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
  email: z.string({ message: "Digite seu email" }).email({ message: "Digite um email válido." }),
  password: z
    .string({ message: "Digite sua senha" })
    .min(8, { message: 'A  senha deve ter no mínimo 08 caracteres' }),
})
type SignInData = z.infer<typeof signInSchema>
const signUpSchema = z.object({
  name: z.string({ message: 'Digite seu nome' }),
  email: z.string({ message: "Digite seu email" }).email({ message: "Digite um email válido." }),
  localUnity: z.string({ message: "Digite sua unidade" }).email({ message: "Digite um email válido." }),
  password: z
    .string({ message: "Digite sua senha" })
    .min(8, { message: 'A  senha deve ter no mínimo 08 caracteres' }),
})
type SignUpData = z.infer<typeof signUpSchema>

export function Header() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors }
  } = useForm<SignInData & SignUpData>({
    resolver: zodResolver(signInSchema),
  })

  function handleSignIn(data: SignInData) {
    console.log(data)
  }
  function handleSignUp(data: SignUpData) {
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

        <SheetContent>
          <Tabs defaultValue="sign-in" className="w-full mt-4">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="sign-in">Sign-in</TabsTrigger>
              <TabsTrigger className="w-full" value="sign-up">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="sign-in">
              <SheetHeader className='mt-4 '>
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
                  <span>Esqueci</span>
                  <Button type="submit" className='w-full'>
                    Entrar
                    <span className="sr-only">Sign-in</span>
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="sign-up">
              <SheetHeader className='mt-4 '>
                <SheetTitle>Criar conta</SheetTitle>
                <SheetDescription>
                  Crie sua conta para poder criar e/ou editar contatos
                </SheetDescription>
              </SheetHeader>
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
                <div className="flex-1 mt-3">

                  <Button type="submit" className='w-full'>
                    Criar conta
                    <span className="sr-only">Sign-up</span>
                  </Button>
                </div>

              </form>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </header>
  )
}
