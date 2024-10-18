"use client"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import Link from "next/link"
import { FormSignIn } from "./form-sign-in"
import { FormSignUp } from "./form-sign-up"
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

export function Header() {

  return (
    <header className="flex items-center justify-end  h-full border-b p-6 gap-4">
      <Link href="/create-enterprise" className="text-muted-foreground tracking-tight text-sm hover:text-primary ">Criar Empresa</Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" className="text-muted-foreground hover:text-primary hover:no-underline">
            Adicionar
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
              <FormSignIn />
            </TabsContent>
            <TabsContent value="sign-up">
              <SheetHeader className='mt-4 '>
                <SheetTitle>Criar conta</SheetTitle>
                <SheetDescription>
                  Crie sua conta para poder criar e/ou editar contatos
                </SheetDescription>
              </SheetHeader>

              <FormSignUp />
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </header>
  )
}
