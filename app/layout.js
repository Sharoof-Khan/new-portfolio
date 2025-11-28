import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// THIS IS WHERE YOUR SEO LIVES
export const metadata = {
  title: 'Sharoof Khan | Full Stack Web Developer',
  description: 'Portfolio of Sharoof Khan, a Full Stack Web Developer specializing in the MERN stack (MongoDB, Express, React, Node.js). View my projects and skills.',
  keywords: ['Sharoof Khan', 'Web Developer', 'React Developer','React Native Developer', 'Next Js Developer', 'MERN Stack', 'Portfolio', 'Frontend Developer', 'India'],
  authors: [{ name: 'Sharoof Khan' }],
  creator: 'Sharoof Khan',
  openGraph: {
    title: 'Sharoof Khan | Full Stack Web Developer',
    description: 'Passionate Full Stack Developer building scalable web applications with the MERN stack.',
    url: 'https://portfolio-sharoof-khan.vercel.app/', // Replace with your actual deployed URL
    siteName: 'Sharoof Khan Portfolio',
    images: [
      {
        url: '/og-image.png', // You need to add this image file later
        width: 1200,
        height: 630,
        alt: 'Sharoof Khan Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased`}>
        {children}
      </body>
    </html>
  )
}
