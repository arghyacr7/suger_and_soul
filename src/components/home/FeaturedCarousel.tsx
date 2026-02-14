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

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
        }
    }

    return (
        <section className="py-8 md:py-12 container mx-auto px-4 md:px-6 bg-transparent border-y border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-8 gap-4">
                <div>
                    <h2 className="font-heading text-3xl md:text-4xl text-brown mb-2 uppercase tracking-wider">Customer Favorites</h2>
                    <p className="text-brown/60 tracking-wide uppercase text-sm">Our most loved treats.</p>
                </div>
                <Link href="/cakes">
                    <Button variant="outline" className="text-yellow border-yellow hover:bg-yellow hover:text-black rounded-none uppercase tracking-widest bg-transparent">
                        View All
                    </Button>
                </Link>
            </div>

            <div className="relative group/scroll">
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
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-[#0A0A0A] p-3 shadow-lg border border-yellow text-yellow hover:bg-yellow hover:text-black transition-all hidden md:flex opacity-0 group-hover/scroll:opacity-100 rounded-none"
                >
                    <ChevronRight size={24} />
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
