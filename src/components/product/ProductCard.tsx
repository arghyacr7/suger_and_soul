"use client"

import Image from "next/image"
import { useState, useEffect, useMemo } from "react"
import { ShoppingBag, Heart, Check, Tag } from "lucide-react"
import { Product } from "@/types"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { buildWhatsAppLink } from "@/lib/whatsapp"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

interface ProductCardProps {
    product: Product
    onSelect?: (product: Product) => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
    const [selectedWeight, setSelectedWeight] = useState<"1lb" | "2lb" | "3lb" | "piece" | "10pc" | null>(null)
    const { user, likedProducts, toggleLike } = useAuth()
    const router = useRouter()

    const isLiked = likedProducts.includes(product.id)

    // Initialize default state
    useEffect(() => {
        if (product.type === "cupcake") {
            setSelectedWeight("piece") // Default to 1 piece
        } else if (product.category === "brownies") {
            setSelectedWeight("piece")
        } else {
            setSelectedWeight("1lb")
        }
    }, [product])

    // Calculate Dynamic Price
    const currentPrice = useMemo(() => {
        if (!selectedWeight) return product.price
        if (product.variantPrices?.[selectedWeight]) {
            return product.variantPrices[selectedWeight]
        }
        return product.price
    }, [selectedWeight, product])

    const handleWeightSelect = (e: React.MouseEvent, weight: "1lb" | "2lb" | "3lb" | "piece" | "10pc") => {
        e.stopPropagation() // Prevent opening modal
        setSelectedWeight(weight)
    }

    const handleOrder = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent opening modal

        if (!selectedWeight) {
            alert("Please select an option first!")
            return
        }

        let message = ""

        const domain = "https://suger-and-soul-n7dbujw8l-arghyacr7s-projects.vercel.app"
        const productUrl = `${domain}/product/${product.id}`
        const imageUrl = `${domain}${product.image.split(" ").join("%20")}`

        if (product.type === "cupcake") {
            message = `Hi Sugar & Soul,\n\nI would like to order cupcakes.\n\nItem: ${product.name}\nQuantity: ${selectedWeight === "piece" ? "1 Piece" : "10 Pieces"}\nPrice: Rs. ${currentPrice}`
        } else if (product.category === "brownies") {
            message = `Hi Sugar & Soul,\n\nI would like to order the following:\n\nItem: *${product.name}*\nOption: ${selectedWeight === "piece" ? "Per Piece" : "1lb Box (6 pcs)"}\nPrice: ₹${currentPrice}`
        } else {
            const weightLabel = selectedWeight === "1lb" ? "1lb (Approx 450g)" :
                selectedWeight === "2lb" ? "2lb (Approx 900g)" :
                    "3lb (Approx 1350g)"
            message = `Hi Sugar & Soul,\n\nI would like to order the following:\n\nItem: *${product.name}*\nWeight: ${weightLabel}\nPrice: ₹${currentPrice}`
        }

        message += `\n\nProduct Page:\n${productUrl}`
        message += `\n\nProduct Image:\n${imageUrl}`
        message += `\n\nDelivery Location: __________\n(Note: Delivery available within 1 km radius only)\n\nPlease confirm availability.\nThank you.`

        const link = buildWhatsAppLink(message)
        window.open(link, "_blank")
    }

    const handleImageClick = () => {
        if (onSelect) {
            onSelect(product)
        }
    }

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!user) {
            router.push("/auth")
            return
        }
        toggleLike(product.id)
    }

    return (
        <div
            className="group relative bg-[#0A0A0A] rounded-[2rem] overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(168,85,247,0.15)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.3)] border border-white/10 flex flex-col h-full"
            onClick={handleImageClick}
        >
            {/* 1. Image Section */}
            <div className="relative h-52 md:h-auto md:aspect-square w-full bg-[#111] overflow-hidden cursor-pointer group-hover:opacity-90 transition-opacity">
                <Image
                    src={product.image}
                    alt={`${product.name} by Sugar & Soul`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Badges */}
                {product.type === "cupcake" && (
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm border border-pink-500/50 text-pink-400 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest z-10 flex items-center gap-1">
                        <Tag size={10} /> Cupcakes
                    </div>
                )}

                {/* Custom Occasion Tags - Replaces Bestseller if present */}
                {product.tag ? (
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm border border-purple/50 text-purple text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest z-10">
                        {product.tag}
                    </div>
                ) : (
                    !product.type && product.bestseller && (
                        <div className="absolute top-3 right-3 bg-yellow text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest z-10">
                            Best Seller
                        </div>
                    )
                )}

                {product.discountText && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest z-10">
                        {product.discountText}
                    </div>
                )}
                {/* Like Button Overlay */}
                <button
                    onClick={handleLikeClick}
                    className="absolute bottom-3 left-3 bg-black/40 p-2 rounded-full border border-white/10 hover:bg-yellow hover:text-black hover:border-yellow transition-all duration-300 backdrop-blur-md z-10 group/heart"
                >
                    <Heart
                        size={18}
                        className={cn("transition-colors", isLiked ? "fill-red-500 text-red-500 group-hover/heart:text-red-500" : "text-white group-hover/heart:text-black")}
                    />
                </button>
            </div>

            {/* 2. Content Section */}
            <div className="p-4 md:p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="font-heading text-lg md:text-xl font-bold text-brown leading-tight mb-2 line-clamp-2 uppercase tracking-wide group-hover:text-yellow transition-colors">
                        {product.name}
                    </h3>
                    <p className={cn(
                        "text-brown/50 text-xs font-light tracking-wide",
                        (product.category === "brownies" || product.type === "cupcake") ? "line-clamp-3 md:min-h-[3rem]" : "line-clamp-1"
                    )}>
                        {product.description}
                    </p>
                </div>

                {/* 3. Options Selector */}
                <div className="mb-5" onClick={(e) => e.stopPropagation()}>
                    {/* Size Guide - Only for Cakes */}
                    {product.type !== "cupcake" && product.category !== "brownies" && (
                        <div className="text-[9px] text-brown/30 mb-2 italic text-center uppercase tracking-wider">
                            1lb≈450g | 2lb≈900g | 3lb≈1350g
                        </div>
                    )}

                    {/* Cupcake Badges Info */}
                    {product.type === "cupcake" && (
                        <div className="text-[9px] text-brown/30 mb-2 italic text-center uppercase tracking-wider">
                            Sold per piece | Combo offer available
                        </div>
                    )}

                    <div className="flex bg-[#111] rounded-xl p-1 gap-1 mb-2 border border-white/5">
                        {product.type === "cupcake" ? (
                            <>
                                <button
                                    onClick={(e) => handleWeightSelect(e, "piece")}
                                    className={cn(
                                        "flex-1 py-2 rounded-lg text-[10px] font-bold transition-all duration-300 flex items-center justify-center gap-1 uppercase tracking-wider",
                                        selectedWeight === "piece"
                                            ? "bg-yellow text-black shadow-sm"
                                            : "text-brown/40 hover:bg-white/5 hover:text-brown"
                                    )}
                                >
                                    1 Piece
                                </button>
                                <button
                                    onClick={(e) => handleWeightSelect(e, "10pc")}
                                    className={cn(
                                        "flex-1 py-2 rounded-lg text-[10px] font-bold transition-all duration-300 flex items-center justify-center gap-1 uppercase tracking-wider",
                                        selectedWeight === "10pc"
                                            ? "bg-yellow text-black shadow-sm"
                                            : "text-brown/40 hover:bg-white/5 hover:text-brown"
                                    )}
                                >
                                    10 Pieces
                                </button>
                            </>
                        ) : product.category === "brownies" ? (
                            <>
                                <button
                                    onClick={(e) => handleWeightSelect(e, "piece")}
                                    className={cn(
                                        "flex-1 py-2 rounded-lg text-[10px] font-bold transition-all duration-300 flex items-center justify-center gap-1 uppercase tracking-wider",
                                        selectedWeight === "piece"
                                            ? "bg-yellow text-black shadow-sm"
                                            : "text-brown/40 hover:bg-white/5 hover:text-brown"
                                    )}
                                >
                                    Piece
                                </button>
                                <button
                                    onClick={(e) => handleWeightSelect(e, "1lb")}
                                    className={cn(
                                        "flex-1 py-2 rounded-lg text-[10px] font-bold transition-all duration-300 flex items-center justify-center gap-1 uppercase tracking-wider",
                                        selectedWeight === "1lb"
                                            ? "bg-yellow text-black shadow-sm"
                                            : "text-brown/40 hover:bg-white/5 hover:text-brown"
                                    )}
                                >
                                    Box (6)
                                </button>
                            </>
                        ) : (
                            (["1lb", "2lb", "3lb"] as const).map((weight) => (
                                <button
                                    key={weight}
                                    onClick={(e) => handleWeightSelect(e, weight)}
                                    className={cn(
                                        "flex-1 py-2 rounded-lg text-[10px] font-bold transition-all duration-300 min-h-[32px] md:min-h-0 flex items-center justify-center relative uppercase tracking-wider",
                                        selectedWeight === weight
                                            ? "bg-yellow text-black shadow-sm"
                                            : "text-brown/40 hover:bg-white/5 hover:text-brown"
                                    )}
                                >
                                    {weight}
                                    {selectedWeight === weight && (
                                        <div className="absolute top-0.5 right-0.5">
                                            <Check size={8} className="text-black" strokeWidth={4} />
                                        </div>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* 4. Price & Action (Bottom Section) */}
                <div className="mt-auto border-t border-dashed border-white/10 pt-4 flex items-end justify-between gap-4">
                    {/* Price Block */}
                    <div className="flex flex-col">
                        <span className="text-[10px] text-brown/40 font-bold uppercase tracking-wider mb-1">Price</span>
                        <div className="flex items-baseline gap-2">
                            {/* Original Price Logic */}
                            {product.originalPrice && (
                                (product.type === "cupcake" && selectedWeight === "10pc") ||
                                (!product.type && (!selectedWeight || selectedWeight === "1lb"))
                            ) && (
                                    <span className="text-xs text-brown/30 line-through font-bold">₹{product.originalPrice}</span>
                                )}

                            <span className={cn("font-heading text-2xl leading-none tracking-wide",
                                product.originalPrice && (
                                    (product.type === "cupcake" && selectedWeight === "10pc") ||
                                    (!product.type && (!selectedWeight || selectedWeight === "1lb"))
                                ) ? "text-yellow" : "text-yellow"
                            )}>
                                ₹{currentPrice}
                            </span>
                        </div>
                    </div>

                    {/* Action Block */}
                    <div className="flex-1 max-w-[140px] relative">
                        {product.type !== "cupcake" && product.category !== "brownies" && !selectedWeight && (
                            <div className="absolute -top-6 left-0 w-full text-center">
                                <span className="text-[10px] text-yellow/80 font-bold animate-pulse uppercase tracking-wider">Select Size</span>
                            </div>
                        )}
                        <Button
                            onClick={handleOrder}
                            disabled={!selectedWeight}
                            className="w-full bg-yellow hover:bg-yellow/90 text-black h-10 rounded-xl text-xs font-bold uppercase tracking-[0.15em] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.2)] disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                        >
                            Order
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
