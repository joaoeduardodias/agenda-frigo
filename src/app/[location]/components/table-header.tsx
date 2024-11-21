"use client"
import { getEnterpriseById } from "@/app/http/get-enterprise-by-id"
import { useQuery } from "@tanstack/react-query"
import { usePathname } from "next/navigation"


export function TableHeaderPage() {
  const enterpriseId = usePathname()
  const { data, isError, isLoading } = useQuery({
    queryKey: ['enterprise:' + enterpriseId],
    queryFn: () => getEnterpriseById({ enterpriseId })
  })

  if (isError) <p>erro encontrado</p>
  if (isLoading) <p>Carregando</p>
  if (!data) return


  const { city, contact, name, uf } = data.enterprise

  return (
    <div className="max-w-screen-lg w-full mx-auto flex justify-between px-2 pb-1">
      <h2 className=" font-semibold tracking-tighter text-primary capitalize">
        {name} - {city} {uf}
      </h2>
      <p className="text-primary">{contact}</p>
    </div>
  )
}