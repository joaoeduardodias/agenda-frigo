"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, LogOut, Phone } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { FormCreateEnterprise } from "./form-create-enterprise";
import { FormSignIn } from "./form-sign-in";
import { FormSignUp } from "./form-sign-up";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between shadow-sm border-b p-6 gap-4">
      <div className="flex gap-x-3 text-gray-600">
        <Phone className="size-5 mt-0.5" />
        <h1 className="text-xl leading-6  font-semibold">Agenda</h1>
      </div>

      <div className="flex gap-4 items-center">
        <Sheet>
          <SheetTrigger asChild>
            {session ? (
              <Button
                variant="link"
                className="text-muted-foreground font-normal tracking-tight text-sm hover:text-primary m-0 p-0"
              >
                Criar contato
              </Button>
            ) : (
              <Button
                variant="link"
                className="font-normal tracking-tight text-sm hover:text-primary m-0 p-0"
              >
                Entrar
                <LogIn />
              </Button>
            )}
          </SheetTrigger>
          <SheetContent>
            {!session ? (
              <Tabs defaultValue="sign-in" className="w-full mt-4">
                <TabsList className="w-full">
                  <TabsTrigger className="w-full" value="sign-in">
                    Entrar
                  </TabsTrigger>
                  <TabsTrigger className="w-full" value="sign-up">
                    Criar conta
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="sign-in">
                  <SheetHeader className="mt-4 ">
                    <SheetTitle>Entrar</SheetTitle>
                    <SheetDescription>
                      Faça o login para criar e/ou editar contatos
                    </SheetDescription>
                  </SheetHeader>
                  <FormSignIn />
                </TabsContent>
                <TabsContent value="sign-up">
                  <SheetHeader className="mt-4 ">
                    <SheetTitle>Criar conta</SheetTitle>
                    <SheetDescription>
                      Crie sua conta para poder criar e/ou editar contatos
                    </SheetDescription>
                  </SheetHeader>
                  <FormSignUp />
                </TabsContent>
              </Tabs>
            ) : (
              <div>
                <SheetHeader className="mt-4">
                  <SheetTitle>Adicionar contatos</SheetTitle>
                  <SheetDescription>
                    Adicionar contatos à agenda
                  </SheetDescription>
                </SheetHeader>
                <FormSignUp />
              </div>
            )}
          </SheetContent>
        </Sheet>
        {session && (
          <div className="flex gap-4 items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="link"
                  className="text-muted-foreground font-normal tracking-tight text-sm hover:text-primary m-0 p-0"
                >
                  Criar Empresa
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="mt-4 ">
                  <SheetTitle>Criar empresa</SheetTitle>
                  <SheetDescription>
                    Adicione sua empresa, para que os contatos possam se
                    vincular a ela.
                  </SheetDescription>
                </SheetHeader>
                <FormCreateEnterprise />
              </SheetContent>
            </Sheet>
            <Button
              variant="link"
              onClick={() => signOut()}
              className="font-normal tracking-tight text-sm hover:text-primary m-0 p-0"
            >
              Sair
              <LogOut />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
