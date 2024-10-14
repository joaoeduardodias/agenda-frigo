'use client'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'

interface NavItemProps {
  name: string
  href: string
  options?: {
    name: string
    query: string
  }[]
}

export function NavItem({ href, name, options }: NavItemProps) {
  const location = usePathname()
  const searchParams = useSearchParams()
  const pathname = location.split('/').join('')
  const sector = searchParams.get('sector')

  const [isOpen, setIsOpen] = useState(false)
  if (options) {
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
          <ul className="ml-3 mb-2 space-y-1 font-light text-foreground/80 hover:text-foreground capitalize italic">
            {options.map((option) => {
              return (
                <li
                  key={option.query}
                  className={`${sector !== option.query ? 'text-foreground/80 hover:text-foreground' : 'text-primary'}`}
                >
                  <Link
                    href={{
                      href,
                      query: { sector: option.query },
                    }}
                  >
                    {option.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    )
  } else {
    return (
      <li
        className={`flex items-center justify-between text-base font-semibold ${pathname !== href ? 'text-foreground/80 hover:text-foreground' : 'text-primary'}`}
      >
        <Link href={href}>{name}</Link>
      </li>
    )
  }
}
