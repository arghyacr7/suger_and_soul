"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product/ProductCard"
import { cn } from "@/lib/utils"

import { getProductsByCategory } from "@/lib/products"

// Data is now fetched from @/lib/products

import { Product } from "@/types"
import { ProductModal } from "@/components/product/ProductModal"

import { useRef } from "react"
import { ChevronRight } from "lucide-react"

export function ProductCatalogue() {
    const [activeTab, setActiveTab] = useState<"plain-cakes" | "cream-cakes" | "brownies">("plain-cakes")
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
        <section id="menu" className="py-6 md:py-16 container mx-auto px-4 md:px-6 scroll-mt-20 mt-0 md:mt-12">
            <div className="text-center mb-6 md:mb-12">
                <h2 className="font-heading text-3xl md:text-5xl text-brown mb-4 uppercase drop-shadow-sm">Our Cake Catalogue</h2>
                <p className="text-brown/70 text-lg">Freshly baked delights for every craving.</p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
                {[
                    { id: "plain-cakes", label: "Plain Cakes" },
                    { id: "cream-cakes", label: "Cream Cakes" },
                    { id: "brownies", label: "Brownies" }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "px-8 py-3 rounded-full font-bold text-lg transition-all border-2",
                            activeTab === tab.id
                                ? "bg-brown text-white border-brown shadow-[4px_4px_0px_0px_rgba(255,210,63,1)] transform -translate-y-1"
                                : "bg-white text-brown border-brown/20 hover:border-brown hover:bg-cream"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Horizontal Scroll Container */}
            <div className="relative group/scroll">
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {getProductsByCategory(activeTab).map((product) => (
                        <div key={product.id} className="min-w-[280px] md:min-w-[320px] snap-center">
                            <ProductCard
                                product={product as Product}
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
