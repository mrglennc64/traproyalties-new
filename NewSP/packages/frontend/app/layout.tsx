import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SoundProtocol - The Protocol That Makes Music Transparent',
  description: 'Stop losing money to registration errors and split mismatches. SoundProtocol automatically finds missing royalties and settles them on-chain in seconds.',
  keywords: 'royalties, music, blockchain, monad, payments, splits, mogul, collab chain',
  openGraph: {
    title: 'SoundProtocol',
    description: 'Find missing royalties and settle instantly on Monad',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
