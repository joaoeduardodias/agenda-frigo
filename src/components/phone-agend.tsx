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

export function PhoneAgend() {
  const [filterEnterprise, setFilterEnterprise] = useState("Todas");
  const [filterSector, setFilterSector] = useState("Todos");
  const [search, setSearch] = useState("");

  const {
    data: contacts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get-users"],
    queryFn: getUsers,
  });

  if (!contacts) return <p>Erro encontrado</p>;

  const enterprises = [
    "Todas",
    ...Array.from(new Set(contacts.map((c) => c.enterprise))),
  ];
  const sectors = [
    "Todos",
    ...Array.from(new Set(contacts.map((c) => c.sector))),
  ];

  const dataFiltered = filterContacts(
    contacts,
    filterEnterprise,
    filterSector,
    search
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <Input
          type="text"
          placeholder="Busca por nome ou telefone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-1/3"
        />
        <Select onValueChange={setFilterEnterprise}>
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
        <Select onValueChange={setFilterSector}>
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
              <TableHead>E-mail</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Empresa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataFiltered.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>
                  {formatPhoneNumber(String(user.contact_secondary))}
                </TableCell>
                <TableCell>{user.email}</TableCell>
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
