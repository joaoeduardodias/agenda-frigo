'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavItem } from './nav-item'

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex h-full items-start justify-center pt-3 mt-16">
      <ul className="space-y-2">
        <li className="mb-10">
          <Link
            href="/"
            className={`text-xl font-semibold tracking-tight ${pathname !== '/' ? 'text-foreground/80 hover:text-foreground' : 'text-primary'}`}
          >
            Selecione o local
          </Link>
        </li>
        <NavItem
          href="frigo-apms"
          options={[
            { name: 'Desossa', query: 'desossa' },
            { name: 'Abate', query: 'abate' },
            { name: 'T.I', query: 'ti' },
          ]}
          name="Frigo APMS"
        />
        <NavItem href="frigo-apsp" name="Frigo APSP" />
        <NavItem href="frigo-vgmt" name="Frigo VGMT" />
        <NavItem href="frigo-vmrs" name="Frigo VMRS" />
      </ul>
    </nav>
  )
}
