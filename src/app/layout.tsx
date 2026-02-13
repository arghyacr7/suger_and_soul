import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp"
import { BottomMobileNav } from "@/components/layout/BottomMobileNav"
import { BirthdayBannerWrapper } from "@/components/birthday/BirthdayBannerWrapper"
import { AuthProvider } from "@/context/AuthContext"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://sugarandsoul.com"),
  title: {
    default: "Sugar & Soul | Premium Cakes & Cloud Kitchen in Dankuni",
    template: "%s | Sugar & Soul"
  },
  description: "Order fresh, handcrafted cakes, brownies, and desserts from Sugar & Soul. Premium cloud kitchen in Rabindranagar, Dankuni. Fast delivery for birthdays & celebrations.",
  keywords: ["cake delivery", "birthday cakes", "brownies", "cloud kitchen", "bakery", "custom cakes", "sugar and soul", "desserts", "Dankuni", "Rabindranagar", "online cake order"],
  authors: [{ name: "Sugar & Soul" }],
  creator: "Sugar & Soul",
  publisher: "Sugar & Soul",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Sugar & Soul | Premium Cakes & Cloud Kitchen",
    description: "Handcrafted cakes and brownies delivered to your doorstep in Dankuni. Order now for fresh, premium quality desserts.",
    url: "https://sugarandsoul.com",
    siteName: "Sugar & Soul",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg", // Ensure this exists or use a fallback
        width: 1200,
        height: 630,
        alt: "Sugar & Soul Premium Cakes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sugar & Soul | Premium Cakes & Cloud Kitchen",
    description: "Order fresh, handcrafted cakes and brownies in Dankuni.",
    images: ["/images/og-image.jpg"],
  },
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`antialiased bg-cream text-brown`}
      >
        <AuthProvider>
          <Navbar />
          <BirthdayBannerWrapper />
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
