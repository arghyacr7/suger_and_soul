"use client"

import { useAuth } from "@/context/AuthContext"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product/ProductCard"
import { ProductModal } from "@/components/product/ProductModal" // Import Modal
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Heart, Loader2 } from "lucide-react"
import { Product } from "@/types"

export default function LikedProductsPage() {
    const { user, likedProducts, loading } = useAuth()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null) // State for selected product
    const [isModalOpen, setIsModalOpen] = useState(false) // State for modal visibility

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!loading && !user && mounted) {
            router.push("/auth")
        }
    }, [user, loading, router, mounted])

    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
    }

    if (!mounted || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24 bg-[#050505]">
                <Loader2 className="animate-spin text-purple-500" size={40} />
            </div>
        )
    }

    if (!user) return null // Will redirect

    const likedItems = products.filter(p => likedProducts.includes(p.id))

    return (
        <div className="container mx-auto px-4 py-8 pt-32 min-h-screen">
            <div className="flex items-center gap-4 mb-12 animate-[fade-in_0.6s_ease-out]">
                <div className="bg-red-500/10 p-4 rounded-full border border-red-500/20 backdrop-blur-sm">
                    <Heart className="fill-red-500 text-red-500" size={32} />
                </div>
                <div>
                    <h1 className="font-heading text-3xl md:text-5xl text-white mb-2 uppercase tracking-wide">Your Favorites</h1>
                    <p className="text-white/40 text-sm tracking-widest uppercase">
                        {likedItems.length} {likedItems.length === 1 ? 'item' : 'items'} saved
                    </p>
                </div>
            </div>

            {likedItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 pb-20">
                    {likedItems.map((product, index) => (
                        <div key={product.id} className="h-full animate-[fade-in_0.5s_ease-out]" style={{ animationDelay: `${index * 0.1}s` }}>
                            <ProductCard
                                product={product}
                                onSelect={handleProductSelect} // Pass the handler!
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center opacity-60">
                    <Heart size={80} className="text-white/10 mb-6" />
                    <h2 className="font-heading text-3xl text-white/40 mb-3 opacity-80 flex items-center gap-3">
                        No favorites yet
                        <span className="text-4xl grayscale opacity-50">💔</span>
                    </h2>
                    <p className="text-white/30 tracking-wide font-light max-w-sm">Start exploring our delicious cakes and tap the heart to save them here!</p>
                </div>
            )}

            {/* Render the Modal */}
            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}
