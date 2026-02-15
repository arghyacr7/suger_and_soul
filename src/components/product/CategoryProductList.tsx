"use client"

import { useState } from "react"
import { Product } from "@/types"
import { ProductCard } from "@/components/product/ProductCard"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface CategoryProductListProps {
    products: Product[]
    categorySlug: string
}

export function CategoryProductList({ products, categorySlug }: CategoryProductListProps) {
    const isCreamCakes = categorySlug === "cream-cakes"
    const [activeFilter, setActiveFilter] = useState("all")

    const filters = [
        { id: "all", label: "All" },
        { id: "birthday", label: "Birthday" },
        { id: "anniversary", label: "Anniversary" },
        { id: "kids", label: "Kids Special" },
        { id: "celebration", label: "Celebration" },
    ]

    const filteredProducts = isCreamCakes
        ? activeFilter === "all"
            ? products
            : products.filter(product => {
                const matches = product.occasions?.some(o => o.toLowerCase() === activeFilter.toLowerCase())
                return matches
            })
        // Sorting logic removed temporarily to isolate filtering
        : products

    return (
        <div className="w-full">
            {isCreamCakes && (
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => {
                                console.log("Setting filter to:", filter.id)
                                setActiveFilter(filter.id)
                            }}
                            className={cn(
                                "relative px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-colors duration-300",
                                activeFilter === filter.id ? "bg-yellow text-black font-bold" : "bg-transparent text-brown/60 hover:text-brown border border-brown/20"
                            )}
                        >
                            <span className="relative z-10">{filter.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-brown/50">
                    <p>No products found for filter: {activeFilter}</p>
                </div>
            )}
        </div>
    )
}
