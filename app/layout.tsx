import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './globals.css'

const GeistFont = Geist({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: 'alfiDzn - Free After Effects Project Files & Presets',
  description: 'Free After Effects project files, presets, and tutorials for motion designers.',

}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={GeistFont.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}