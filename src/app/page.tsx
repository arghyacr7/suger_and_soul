import { Hero } from "@/components/home/Hero"
import { CategoryCards } from "@/components/home/CategoryCards"
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel"
import { ProductCatalogue } from "@/components/home/ProductCatalogue"
import { ShopByOccasion } from "@/components/home/ShopByOccasion"
import { MapEmbed } from "@/components/home/MapEmbed"
import { WhySugarAndSoul } from "@/components/home/WhySugarAndSoul"
import { CustomOrderBanner } from "@/components/home/CustomOrderBanner"

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "Sugar & Soul",
    "image": "https://sugarandsoul.com/images/logo.png",
    "@id": "https://sugarandsoul.com",
    "url": "https://sugarandsoul.com",
    "telephone": "9836733874",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rabindranagar",
      "addressLocality": "Dankuni",
      "addressRegion": "West Bengal",
      "postalCode": "712311",
      "addressCountry": "IN"
    },
    // "geo": {
    //   "@type": "GeoCoordinates",
    //   "latitude": 22.68, // Approximate for Dankuni
    //   "longitude": 88.30
    // },
    "priceRange": "₹₹",
    "servesCuisine": "Bakery, Desserts, Cakes",
    "sameAs": [
      "https://www.facebook.com/arghyadeep.das.948",
      "https://www.instagram.com/iammoumita1"
    ]
  }

  return (
    <div className="flex flex-col gap-0 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ProductCatalogue />
      <FeaturedCarousel />
      <ShopByOccasion />
      <CustomOrderBanner />
      <WhySugarAndSoul />
      <MapEmbed />
    </div>
  )
}
