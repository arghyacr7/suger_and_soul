"use client"

import { useAuth } from "@/context/AuthContext"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product/ProductCard"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Heart, Loader2 } from "lucide-react"

export default function LikedProductsPage() {
    const { user, likedProducts, loading } = useAuth()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!loading && !user && mounted) {
            router.push("/auth")
        }
    }, [user, loading, router, mounted])

    if (!mounted || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <Loader2 className="animate-spin text-purple" size={40} />
            </div>
        )
    }

    if (!user) return null // Will redirect

    const likedItems = products.filter(p => likedProducts.includes(p.id))

    return (
        <div className="container mx-auto px-4 py-8 pt-24 min-h-screen">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-red-100 p-3 rounded-full">
                    <Heart className="fill-red-500 text-red-500" size={32} />
                </div>
                <div>
                    <h1 className="font-heading text-3xl md:text-4xl text-brown">Your Favorites</h1>
                    <p className="text-brown/60 text-sm">
                        {likedItems.length} {likedItems.length === 1 ? 'item' : 'items'} saved
                    </p>
                </div>
            </div>

            {likedItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {likedItems.map((product) => (
                        <div key={product.id} className="h-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                    <Heart size={64} className="text-gray-300 mb-4" />
                    <h2 className="font-heading text-2xl text-brown mb-2 opacity-60 flex items-center gap-2">
                        No favorites yet?
                        <span className="text-3xl">🥺</span>
                    </h2>
                    <p className="text-brown/50">Start exploring our delicious cakes and tap the heart!</p>
                </div>
            )}
        </div>
    )
}
