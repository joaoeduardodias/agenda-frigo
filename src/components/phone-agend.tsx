"use client";

import { getUsers } from "@/app/http/get-users";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { filterContacts } from "@/utils/filter-contacts";
import { formatPhoneNumber } from "@/utils/format-phone-numbers";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const contatos = [
  {
    id: 1,
    nome: "João Silva",
    telefone: "(11) 98765-4321",
    empresa: "TechCorp",
    setor: "TI",
  },
  {
    id: 2,
    nome: "Maria Santos",
    telefone: "(11) 91234-5678",
    empresa: "VendaMais",
    setor: "Vendas",
  },
  {
    id: 3,
    nome: "Pedro Oliveira",
    telefone: "(11) 99876-5432",
    empresa: "TechCorp",
    setor: "RH",
  },
  {
    id: 4,
    nome: "Ana Rodrigues",
    telefone: "(11) 92345-6789",
    empresa: "DevPro",
    setor: "TI",
  },
  {
    id: 5,
    nome: "Carlos Ferreira",
    telefone: "(11) 93456-7890",
    empresa: "TechCorp",
    setor: "RH",
  },
];

export function PhoneAgend() {
  const [empresaFiltro, setEmpresaFiltro] = useState("Todas");
  const [setorFiltro, setSetorFiltro] = useState("Todos");
  const [busca, setBusca] = useState("");

  const {
    data: contacts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get-users"],
    queryFn: getUsers,
  });

  const enterprises = [
    "Todas",
    ...Array.from(new Set(contacts?.map((c) => c.enterprise))),
  ];
  const sectors = [
    "Todos",
    ...Array.from(new Set(contacts?.map((c) => c.sector))),
  ];

  // const filterContacts = contacts?.filter(
  //   (c) =>
  //     (empresaFiltro === "Todas" || c.enterprise === empresaFiltro) &&
  //     (setorFiltro === "Todos" || c.sector === setorFiltro) &&
  //     (c.name.toLowerCase().includes(busca.toLowerCase()) ||
  //       String(c.contact).includes(busca) ||
  //       String(c.contact_secondary).includes(busca))
  // );
  const dataFiltered = filterContacts(
    contacts!,
    empresaFiltro,
    setorFiltro,
    busca
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <Input
          type="text"
          placeholder="Buscar por nome ou telefone"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="md:w-1/3"
        />
        <Select onValueChange={setEmpresaFiltro}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrar por Empresa" />
          </SelectTrigger>
          <SelectContent>
            {enterprises.map((enterprise) => (
              <SelectItem key={enterprise} value={enterprise}>
                {enterprise}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSetorFiltro}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrar por Setor" />
          </SelectTrigger>
          <SelectContent>
            {sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Ramal</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Empresa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataFiltered?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>
                  {formatPhoneNumber(String(user.contact_secondary))}
                </TableCell>
                <TableCell>{user.sector}</TableCell>
                <TableCell>{user.enterprise}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
