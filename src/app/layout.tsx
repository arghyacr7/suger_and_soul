import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp"
import { BottomMobileNav } from "@/components/layout/BottomMobileNav"
import dynamic from "next/dynamic"

const BirthdayBanner = dynamic(
  () => import("@/components/birthday/BirthdayBanner").then(mod => mod.BirthdayBanner),
  { ssr: false }
)
import { AuthProvider } from "@/context/AuthContext"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sugar & Soul - Baked with Love",
  description: "Premium cloud kitchen cake shop serving cakes, cream cakes, and brownies.",
  icons: {
    icon: [
      {
        url: "/images/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/images/favicon_io/favicon.ico",
        sizes: "any",
      }
    ],
    apple: "/images/favicon_io/apple-touch-icon.png",
  },
  manifest: "/images/favicon_io/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Asimovian&family=Combo&display=swap" rel="stylesheet" />
        {/* Note: 'Asimovian' must exist on Google Fonts for this to work. If it's a custom font, it won't load. */}
      </head>
      <body
        className={`antialiased bg-cream text-brown`}
      >
        <AuthProvider>
          <Navbar />
          <BirthdayBanner />
          <main className="min-h-screen pt-16 pb-20 md:pb-0">
            {children}
          </main>
          <FloatingWhatsApp />
          <BottomMobileNav />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
