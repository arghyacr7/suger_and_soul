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
            : products
                .filter(product => product.occasions?.includes(activeFilter))
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
        <div className="w-full">
            {isCreamCakes && (
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={cn(
                                "relative px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-colors duration-300",
                                activeFilter === filter.id ? "text-black font-bold" : "text-brown/60 hover:text-brown"
                            )}
                        >
                            {activeFilter === filter.id && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-yellow rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{filter.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {filteredProducts.length > 0 ? (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="text-center py-20 text-brown/50">
                    <p>No products found for this filter.</p>
                </div>
            )}
        </div>
    )
}
