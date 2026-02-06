"use client"

import { ProductCard } from "@/components/product/ProductCard"
import { products } from "@/lib/products"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function SearchContent() {
    const searchParams = useSearchParams()
    const occasion = searchParams.get("occasion")

    // Filter products
    const filteredProducts = products.filter(product => {
        if (occasion) {
            return product.occasions?.includes(occasion.toLowerCase())
        }
        return true
    })

    const title = occasion
        ? `${occasion.charAt(0).toUpperCase() + occasion.slice(1)} Cakes`
        : "All Cakes"

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="text-center mb-12 animate-[fade-in_0.5s_ease-out]">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-brown mb-4">{title}</h1>
                <p className="text-brown/60 max-w-2xl mx-auto">
                    {occasion ? `Perfect selections for your ${occasion} celebration.` : "Browse our complete collection."}
                </p>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-[slide-up_0.5s_ease-out]">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-brown/50">
                    <p>No products found for this occasion.</p>
                </div>
            )}
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-20 text-center">Loading...</div>}>
            <SearchContent />
        </Suspense>
    )
}
