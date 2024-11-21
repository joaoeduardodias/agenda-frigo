"use client"
import { ChevronRight, Home, PanelLeft } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

// Menu items.
const enterprises = [
  {
    name: "Fuga Jales",
    url: "/fuga-jales",
    sectors: [
      {
        name: "Controladoria",
      },
      {
        name: "TI",
      }
    ],
  },
  {
    name: "Fuga Marau",
    url: "/fuga-marau",
    sectors: [
      {
        name: "Controladoria",
      },
      {
        name: "TI",
      }
    ]
  },
  {
    name: "Frigosul ApMs",
    url: "/frigo-apms",
    sectors: [
      {
        name: "Desossa",
      },
      {
        name: "Abate",
      },
    ]
  },
  {
    name: "Frigosul ApSp",
    url: "/frigo-apsp",
    sectors: [
      {
        name: "Desossa",
      },
      {
        name: "Abate",
      },
    ]
  }


]

export function AppSidebar() {
  const { toggleSidebar } = useSidebar()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const sectorName = searchParams.get('sector')
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuButton onClick={toggleSidebar}>
              <PanelLeft className="size-4" />
              Menu
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Empresas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {enterprises.map(enterprise => (
                <Collapsible key={enterprise.name} className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={pathName === enterprise.url} asChild>
                      <Link href={enterprise.url}>
                        <Home />
                        {enterprise.name}
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {enterprise.sectors.map(sector => (
                        <SidebarMenuSubItem key={sector.name}>
                          <SidebarMenuSubButton isActive={sectorName === sector.name.toLowerCase()} asChild>
                            <Link
                              href={{
                                href: enterprise.url,
                                query: { sector: sector.name.toLowerCase() }
                              }}
                            >
                              {sector.name}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>

              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent >
    </Sidebar >
  )
}
