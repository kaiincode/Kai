import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import StructuredData from "@/components/structured-data"

import { Playfair_Display, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://iamkai.vercel.app'),
  title: {
    default: "Kai",
    template: "%s | Kai"
  },
  description: "AI Engineer and Web Developer creating intelligent digital solutions through cutting-edge AI, blockchain technology, and modern web development. Specializing in AI/ML, Web3, and full-stack applications.",
  applicationName: "Kai Portfolio",
  authors: [
    { name: "Kai", url: "https://iamkai.vercel.app" },
    { name: "Nguyễn Lê Trường Thiên" }
  ],
  creator: "Kai",
  publisher: "Kai",
  keywords: [
    "AI Engineer",
    "Web Developer",
    "Machine Learning",
    "Full Stack Developer",
    "Artificial Intelligence",
    "Web3",
    "Blockchain",
    "Solana",
    "Ethereum",
    "Next.js",
    "React",
    "Python",
    "Portfolio",
    "Kai",
    "RAG Pipeline",
    "LLM",
    "Smart Contracts",
    "DeFi",
    "NFT",
    "Data Visualization",
    "Ho Chi Minh City",
    "Vietnam"
  ],
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iamkai.vercel.app",
    siteName: "Kai Portfolio",
    title: "Kai",
    description: "AI Engineer and Web Developer creating intelligent digital solutions through cutting-edge AI, blockchain technology, and modern web development. Specializing in AI/ML, Web3, and full-stack applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kai - AI Engineer & Web Developer",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kai",
    description: "AI Engineer and Web Developer creating intelligent digital solutions through cutting-edge AI, blockchain technology, and modern web development.",
    creator: "@panacea___005",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06b6d4" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}>
        <StructuredData />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
