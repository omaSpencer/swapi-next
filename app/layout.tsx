import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '~/lib/utils'

import { ThemeProvider } from '~/components/theme-provider'
import MasterHeader from '~/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Explore the Galaxy with SWAPI | Your Ultimate Star Wars Data Hub',
  description:
    'Dive into the vast Star Wars universe with our Next.js-powered SWAPI project. Discover detailed information about characters, planets, starships, and more. Unleash the force of knowledge as you explore the galaxy like never before.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <MasterHeader />

          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
