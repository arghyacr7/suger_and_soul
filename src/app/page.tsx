import { Hero } from "@/components/home/Hero"
import { CategoryCards } from "@/components/home/CategoryCards"
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel"
import { ProductCatalogue } from "@/components/home/ProductCatalogue"
import { ShopByOccasion } from "@/components/home/ShopByOccasion"
import { MapEmbed } from "@/components/home/MapEmbed"
import { WhySugarAndSoul } from "@/components/home/WhySugarAndSoul"
import { CustomOrderBanner } from "@/components/home/CustomOrderBanner"

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-20">
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
