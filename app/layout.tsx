import './globals.css'
import { Inter } from 'next/font/google'
import { Sidebar } from '../components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TeleChat',
  description: 'A Telegram-like chat application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
} 