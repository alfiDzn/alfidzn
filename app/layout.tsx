import type { Metadata } from 'next'
import { Google_Sans_Flex } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './globals.css'

const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-google-sans-flex',
})

export const metadata: Metadata = {
  title: 'alfiDzn - Free After Effects Project Files & Presets',
  description: 'Free After Effects project files, presets, and tutorials for motion designers.',

}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={googleSansFlex.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}