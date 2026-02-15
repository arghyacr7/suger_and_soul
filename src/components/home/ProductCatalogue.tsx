"use client"

import { useState, useRef, useEffect } from "react"
import { ProductCard } from "@/components/product/ProductCard"
import { cn } from "@/lib/utils"
import { getProductsByCategory } from "@/lib/products"
import { Product } from "@/types"
import { ProductModal } from "@/components/product/ProductModal"
import { ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ProductCatalogue() {
    const [activeTab, setActiveTab] = useState<"plain-cakes" | "cream-cakes" | "brownies">("plain-cakes")
    const [activeFilter, setActiveFilter] = useState("all")
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Reset filter when tab changes
    useEffect(() => {
        setActiveFilter("all")
    }, [activeTab])

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

    const filters = [
        { id: "all", label: "All" },
        { id: "birthday", label: "Birthday" },
        { id: "anniversary", label: "Anniversary" },
        { id: "kids", label: "Kids Special" },
        { id: "celebration", label: "Celebration" },
    ]

    const products = getProductsByCategory(activeTab)

    const filteredProducts = activeTab === "cream-cakes"
        ? activeFilter === "all"
            ? products
            : products
                .filter(product => {
                    const hasTag = product.occasions?.includes(activeFilter)

                    // Specific exclusion: Don't show Anniversary cakes in Birthday filter
                    if (activeFilter === "birthday" && product.occasions?.includes("anniversary")) {
                        return false
                    }

                    return hasTag
                })
                .sort((a, b) => {
                    // 1. Priority to products with filter keyword in name
                    const aNameMatch = a.name.toLowerCase().includes(activeFilter.toLowerCase())
                    const bNameMatch = b.name.toLowerCase().includes(activeFilter.toLowerCase())
                    if (aNameMatch && !bNameMatch) return -1
                    if (!aNameMatch && bNameMatch) return 1

                    // 2. Priority to products where occasion is the FIRST tag
                    const aFirstTag = a.occasions?.[0] === activeFilter
                    const bFirstTag = b.occasions?.[0] === activeFilter
                    if (aFirstTag && !bFirstTag) return -1
                    if (!aFirstTag && bFirstTag) return 1

                    return 0
                })
        : products

    return (
        <section id="menu" className="py-0 container mx-auto px-6 md:px-8 scroll-mt-32">
            <div className="text-center mb-6 md:mb-12">
                <h2 className="font-heading text-3xl md:text-5xl text-brown mb-4 uppercase drop-shadow-sm">Our Cake Catalogue</h2>
                <p className="text-brown/70 text-lg">Freshly baked delights for every craving.</p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-8 flex-wrap">
                {[
                    { id: "plain-cakes", label: "Plain Cakes" },
                    { id: "cream-cakes", label: "Cream Cakes" },
                    { id: "brownies", label: "Brownies" }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "px-8 py-3 rounded-none font-bold text-sm md:text-lg transition-all border uppercase tracking-widest",
                            activeTab === tab.id
                                ? "bg-yellow text-black border-yellow shadow-[0_0_15px_rgba(212,175,55,0.4)] transform -translate-y-1"
                                : "bg-transparent text-brown/60 border-white/10 hover:border-yellow hover:text-yellow hover:bg-white/5"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Filters (Only for Cream Cakes) */}
            <AnimatePresence>
                {activeTab === "cream-cakes" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
                    >
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={cn(
                                    "relative px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-colors duration-300",
                                    activeFilter === filter.id ? "text-black font-bold" : "text-brown/60 hover:text-brown border border-brown/20"
                                )}
                            >
                                {activeFilter === filter.id && (
                                    <motion.div
                                        layoutId="catalogueActiveFilter"
                                        className="absolute inset-0 bg-yellow rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{filter.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Horizontal Scroll Container */}
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
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="min-w-[280px] md:min-w-[320px] snap-center"
                                >
                                    <ProductCard
                                        product={product as Product}
                                        onSelect={handleProductSelect}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <div className="w-full text-center py-10 text-brown/50 min-w-[300px]">
                                <p>No products found for this filter.</p>
                            </div>
                        )}
                    </AnimatePresence>
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
