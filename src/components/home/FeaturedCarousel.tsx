"use client"

import { ProductCard } from "@/components/product/ProductCard"
import { Product } from "@/types"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

import { products } from "@/lib/products"

// Get popular products for the carousel
const featuredProducts = products
    .filter(product => product.popular)
    .sort((a, b) => Number(b.bestseller || false) - Number(a.bestseller || false))

import { useState } from "react"
import { ProductModal } from "@/components/product/ProductModal"

import { useRef } from "react"
import { ChevronRight } from "lucide-react"

export function FeaturedCarousel() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
    }

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
        }
    }

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
        }
    }

    return (
        <section className="relative py-8 md:py-12 container mx-auto px-4 md:px-6 bg-transparent border-y border-white/5">
            {/* Top Gradient Fade */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#050505] to-transparent z-0 pointer-events-none" />

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#050505] to-transparent z-0 pointer-events-none" />

            <div className="relative z-20 flex flex-row justify-between items-end mb-6 md:mb-8 gap-4">
                <div>
                    <h2 className="font-heading text-2xl md:text-4xl text-brown mb-2 uppercase tracking-wider">Customer Favorites</h2>
                    <p className="text-brown/60 tracking-wide uppercase text-xs md:text-sm">Our most loved treats.</p>
                </div>
                <Link href="/cakes">
                    <Button variant="outline" className="text-yellow border-yellow hover:bg-yellow hover:text-black rounded-none uppercase tracking-widest bg-transparent text-xs md:text-sm px-3 md:px-4">
                        View All
                    </Button>
                </Link>
            </div>

            <div className="relative group/scroll">
                {/* Left Arrow Button */}
                <button
                    onClick={scrollLeft}
                    className="absolute -left-3 md:left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-[#0A0A0A] p-2 md:p-3 shadow-[0_0_15px_rgba(212,175,55,0.5)] border border-yellow text-yellow hover:bg-yellow hover:text-black transition-all flex opacity-100 md:opacity-0 md:group-hover/scroll:opacity-100 rounded-full"
                >
                    <ChevronRight size={20} className="md:w-6 md:h-6 rotate-180" />
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-center">
                            <ProductCard
                                product={product}
                                onSelect={handleProductSelect}
                            />
                        </div>
                    ))}
                </div>

                {/* Right Arrow Button */}
                <button
                    onClick={scrollRight}
                    className="absolute -right-3 md:right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-[#0A0A0A] p-2 md:p-3 shadow-[0_0_15px_rgba(212,175,55,0.5)] border border-yellow text-yellow hover:bg-yellow hover:text-black transition-all flex opacity-100 md:opacity-0 md:group-hover/scroll:opacity-100 rounded-full"
                >
                    <ChevronRight size={20} className="md:w-6 md:h-6" />
                </button>
            </div>

            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    )
}
