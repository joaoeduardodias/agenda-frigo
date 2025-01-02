"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone } from "lucide-react";
import Link from "next/link";
import { FormCreateEnterprise } from "./form-create-enterprise";
import { FormSignIn } from "./form-sign-in";
import { FormSignUp } from "./form-sign-up";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function Header() {
  return (
    <header className="flex items-center justify-between shadow-sm border-b p-6 gap-4">
      <div className="flex gap-x-3 text-gray-600">
        <Phone className="size-5 mt-0.5 " />
        <h1 className="text-xl leading-6  font-semibold">Agenda</h1>
      </div>

      <div className="flex gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Link
              href="#"
              className="text-muted-foreground tracking-tight text-sm hover:text-primary"
            >
              Criar Empresa
            </Link>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="mt-4 ">
              <SheetTitle>Criar empresa</SheetTitle>
              <SheetDescription>
                Adicione sua empresa, para que seus contatos possam se vincular
                a ela.
              </SheetDescription>
            </SheetHeader>
            <FormCreateEnterprise />
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Link
              href="#"
              className="text-muted-foreground tracking-tight text-sm hover:text-primary"
            >
              Adicionar
            </Link>
          </SheetTrigger>
          <SheetContent>
            <Tabs defaultValue="sign-in" className="w-full mt-4">
              <TabsList className="w-full">
                <TabsTrigger className="w-full" value="sign-in">
                  Sign-in
                </TabsTrigger>
                <TabsTrigger className="w-full" value="sign-up">
                  Criar conta
                </TabsTrigger>
              </TabsList>
              <TabsContent value="sign-in">
                <SheetHeader className="mt-4 ">
                  <SheetTitle>Sign-in</SheetTitle>
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
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
