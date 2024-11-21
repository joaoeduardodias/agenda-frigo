import { Header } from '@/components/header'
import { AppSidebar } from '@/components/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
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
          <SidebarProvider>
            <Toaster />
            <AppSidebar />
            <div className="h-screen w-full flex flex-col">
              <Header />
              {children}
            </div>

          </SidebarProvider>
        </ReactQueryProvider>

      </body>
    </html>
  )
}
