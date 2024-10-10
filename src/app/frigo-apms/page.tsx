import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function FrigoAPMS() {
  return (
    <main className="flex flex-col flex-1 h-full items-start justify-center p-6 pt-20">
      <div className="max-w-screen-lg w-full mx-auto flex justify-between px-2 pb-1">
        <h2 className=" font-semibold tracking-tighter text-primary ">
          Frigosul - Aparecida do Taboado-MS
        </h2>
        <p className="text-primary">(67) 3565-9000</p>
      </div>
      <Table className="max-w-screen-lg mx-auto border border-collapse rounded-md">
        <TableHeader>
          <TableRow className="h-11">
            <TableHead className="border">Nome</TableHead>
            <TableHead className="border text-center">Setor</TableHead>
            <TableHead className="border w-32 text-center">Ramal</TableHead>
            <TableHead className="border w-56 text-center">Telefone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => {
            return (
              <TableRow key={index} className="h-10">
                <TableCell className="border ">João Dias</TableCell>
                <TableCell className="border text-center">T.I</TableCell>
                <TableCell className="border w-32 text-center">6058</TableCell>
                <TableCell className="border w-56 text-center">
                  (67) 99890-8771
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </main>
  )
}
