import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { cn } from '@/lib/utils'
import { ReactQueryProvider } from '@/providers/react-query-provider'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'call.frig',
  description: 'list telephones',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased overflow-hidden dark',
          fontSans.variable,
        )}
      >
        <ReactQueryProvider>
          <div className="flex w-screen min-h-screen">
            <aside className="min-h-full w-60 flex  justify-center border-r">
              <Navbar />
            </aside>
            <div className="flex-1 h-full flex flex-col">
              <Header />
              {children}
            </div>
          </div>
        </ReactQueryProvider>

      </body>
    </html>
  )
}
