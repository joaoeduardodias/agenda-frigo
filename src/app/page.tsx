import illustration from '@/assets/illustration-home.svg'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-1 flex-col  mt-10  items-center justify-between">
      <h1 className="text-2xl tracking-tighter text-primary mb-20">
        Encontrar o Contato Certo Nunca Foi Tão Fácil!
      </h1>
      <Image
        src={illustration}
        alt="Illustration page home"
        className="size-2/5"
      />
      <p className="text-primary mt-5">
        Escolha a Localidade e Encontre o Contato que Precisa!
      </p>
    </div>
  )
}
