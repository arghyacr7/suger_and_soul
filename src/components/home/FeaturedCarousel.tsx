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
        <section className="py-16 container mx-auto px-4 md:px-6 bg-white/50 border-y-2 border-brown/5">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h2 className="font-heading text-3xl md:text-4xl text-brown mb-2 uppercase">Customer Favorites</h2>
                    <p className="text-brown/60">Our most loved treats, picked again and again.</p>
                </div>
                <Link href="/cakes">
                    <Button variant="outline" className="text-brown border-brown hover:bg-brown hover:text-white">
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
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white/90 p-3 rounded-full shadow-lg border border-brown/10 text-brown hover:bg-brown hover:text-white transition-all hidden md:flex opacity-0 group-hover/scroll:opacity-100"
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
