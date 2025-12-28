import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })

const REPO_NAME = process.env.GITHUB_PAGES ? (process.env.GITHUB_REPOSITORY?.split('/')?.[1] ?? 'v0-fitness-exercise-website-3') : ''
const BASE = REPO_NAME ? `/${REPO_NAME}` : ''

export const metadata: Metadata = {
  title: "FiziyoRehber - Fizyoterapi Egzersiz Rehberi",
  description: "Profesyonel fizyoterapi egzersizleri ve doğru hareket teknikleri",
  generator: "v0.app",

  icons: {
    icon: [
      {
        url: `${BASE}/icon-light-32x32.png`,
        media: "(prefers-color-scheme: light)",
      },
      {
        url: `${BASE}/icon-dark-32x32.png`,
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: `${BASE}/icon.svg`,
        type: "image/svg+xml",
      },
    ],
    apple: `${BASE}/apple-icon.png`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
