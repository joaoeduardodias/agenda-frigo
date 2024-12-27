"use client";

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

  const empresas = [
    "Todas",
    ...Array.from(new Set(contatos.map((c) => c.empresa))),
  ];
  const setores = [
    "Todos",
    ...Array.from(new Set(contatos.map((c) => c.setor))),
  ];

  const contatosFiltrados = contatos.filter(
    (c) =>
      (empresaFiltro === "Todas" || c.empresa === empresaFiltro) &&
      (setorFiltro === "Todos" || c.setor === setorFiltro) &&
      (c.nome.toLowerCase().includes(busca.toLowerCase()) ||
        c.telefone.includes(busca))
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
            {empresas.map((empresa) => (
              <SelectItem key={empresa} value={empresa}>
                {empresa}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSetorFiltro}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrar por Setor" />
          </SelectTrigger>
          <SelectContent>
            {setores.map((setor) => (
              <SelectItem key={setor} value={setor}>
                {setor}
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
              <TableHead>Telefone</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Setor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contatosFiltrados.map((contato) => (
              <TableRow key={contato.id}>
                <TableCell>{contato.nome}</TableCell>
                <TableCell>{contato.telefone}</TableCell>
                <TableCell>{contato.empresa}</TableCell>
                <TableCell>{contato.setor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
