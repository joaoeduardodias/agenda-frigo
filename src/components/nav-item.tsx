'use client'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'
export interface NavItemProps {
  name: string
  href: string
  options?: {
    name: string
    href: string
  }[]
}

export function NavItem({ href, name }: NavItemProps) {
  const location = usePathname()
  const pathname = location.split('/').join('')

  const [isOpen, setIsOpen] = useState(false)
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <li
          className={`flex items-center justify-between text-base font-semibold ${pathname !== href ? 'text-foreground/80 hover:text-foreground' : 'text-primary'}`}
        >
          <Link href={href}>{name}</Link>
          <Button variant="ghost" className="hover:bg-transparent">
            {!isOpen ? (
              <ChevronDownIcon className="size-4" />
            ) : (
              <ChevronUpIcon className="size-4" />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </li>
      </CollapsibleTrigger>
      <CollapsibleContent asChild>
        <ul className="ml-2 space-y-2 font-light text-foreground/80 hover:text-foreground">
          <li>
            <Link href={href}>desossa</Link>
          </li>
          <li>
            <Link href={href}>expedição</Link>
          </li>
          <li>
            <Link href={href}>abate</Link>
          </li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}
