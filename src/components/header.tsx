import { Plus } from 'lucide-react'
import { Button } from './ui/button'
export function Header() {
  return (
    <header className="flex items-center justify-end  h-full border-b p-6">
      <Button className="flex items-center justify-center gap-2">
        Adicionar
        <Plus className="size-4" />
      </Button>
    </header>
  )
}
