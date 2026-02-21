import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['600', '700'],
})

export const metadata: Metadata = {
  title: 'TrapRoyalties Pro – Get Your Bag Right',
  description: 'PRO scanner, split verification, and royalty recovery for hip hop & R&B creators.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}