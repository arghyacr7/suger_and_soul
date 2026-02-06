"use client"

import Image from "next/image"
import { useState, useEffect, useMemo } from "react"
import { ShoppingBag, Heart, Check, Tag } from "lucide-react"
import { Product } from "@/types"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { buildWhatsAppLink } from "@/lib/whatsapp"

interface ProductCardProps {
    product: Product
    onSelect?: (product: Product) => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
    const [selectedWeight, setSelectedWeight] = useState<"1lb" | "2lb" | "3lb" | "piece" | "10pc" | null>(null)
    const [isLiked, setIsLiked] = useState(false)

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

        if (product.type === "cupcake") {
            message = `Hi Sugar & Soul,\n\nI would like to order cupcakes.\n\nItem: ${product.name}\nQuantity: ${selectedWeight === "piece" ? "1 Piece" : "10 Pieces"}\nPrice: Rs. ${currentPrice}\n\nPlease confirm availability.\nThank you.`
        } else if (product.category === "brownies") {
            message = `Hi Sugar & Soul,\n\nI would like to order the following:\n\nItem: *${product.name}*\nOption: ${selectedWeight === "piece" ? "Per Piece" : "1lb Box (6 pcs)"}\nPrice: ₹${currentPrice}\n\nDelivery Location: __________\n(Note: Delivery available within 1 km radius only)\n\nPlease confirm availability.`
        } else {
            const weightLabel = selectedWeight === "1lb" ? "1lb (Approx 450g)" :
                selectedWeight === "2lb" ? "2lb (Approx 900g)" :
                    "3lb (Approx 1350g)"
            message = `Hi Sugar & Soul,\n\nI would like to order the following:\n\nItem: *${product.name}*\nWeight: ${weightLabel}\nPrice: ₹${currentPrice}\n\nDelivery Location: __________\n(Note: Delivery available within 1 km radius only)\n\nPlease confirm availability.`
        }

        const link = buildWhatsAppLink(message)
        window.open(link, "_blank")
    }

    const handleImageClick = () => {
        if (onSelect) {
            onSelect(product)
        }
    }

    return (
        <div
            className="group relative bg-white rounded-[1.25rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brown/5 flex flex-col h-full"
            onClick={handleImageClick}
        >
            {/* 1. Image Section */}
            <div className="relative aspect-square w-full bg-cream overflow-hidden cursor-pointer">
                <Image
                    src={product.image}
                    alt={`${product.name} by Sugar & Soul`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Badges */}
                {product.type === "cupcake" && (
                    <div className="absolute top-3 right-3 bg-pink-100 text-pink-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide z-10 flex items-center gap-1">
                        <Tag size={10} /> Cupcakes
                    </div>
                )}

                {/* Custom Occasion Tags - Replaces Bestseller if present */}
                {product.tag ? (
                    <div className="absolute top-3 right-3 bg-purple text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide z-10 border border-white/20">
                        {product.tag}
                    </div>
                ) : (
                    !product.type && product.bestseller && (
                        <div className="absolute top-3 right-3 bg-yellow text-brown text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide z-10">
                            Best Seller
                        </div>
                    )
                )}

                {product.discountText && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide z-10 animate-pulse">
                        {product.discountText}
                    </div>
                )}
                {/* Like Button Overlay */}
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsLiked(!isLiked)
                    }}
                    className="absolute bottom-3 left-3 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-transform hover:scale-110 active:scale-95 backdrop-blur-sm z-10"
                >
                    <Heart
                        size={18}
                        className={cn("transition-colors", isLiked ? "fill-red-500 text-red-500" : "text-brown")}
                    />
                </button>
            </div>

            {/* 2. Content Section */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="mb-3">
                    <h3 className="font-heading text-xl font-bold text-brown leading-tight mb-1 line-clamp-2 md:min-h-[3.25rem]">
                        {product.name}
                    </h3>
                    <p className={cn(
                        "text-brown/50 text-xs font-medium",
                        (product.category === "brownies" || product.type === "cupcake") ? "line-clamp-3 md:min-h-[3rem]" : "line-clamp-1"
                    )}>
                        {product.description}
                    </p>
                </div>

                {/* 3. Options Selector */}
                <div className="mb-4" onClick={(e) => e.stopPropagation()}>
                    {/* Size Guide - Only for Cakes */}
                    {product.type !== "cupcake" && product.category !== "brownies" && (
                        <div className="text-[9px] text-brown/40 mb-1.5 italic text-center">
                            1lb≈450g | 2lb≈900g | 3lb≈1350g
                        </div>
                    )}

                    {/* Cupcake Badges Info */}
                    {product.type === "cupcake" && (
                        <div className="text-[9px] text-brown/40 mb-1.5 italic text-center">
                            Sold per piece | Combo offer available
                        </div>
                    )}

                    <div className="flex bg-cream/50 rounded-lg p-1 gap-1 mb-2">
                        {product.type === "cupcake" ? (
                            <>
                                <button
                                    onClick={(e) => handleWeightSelect(e, "piece")}
                                    className={cn(
                                        "flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all duration-200 flex items-center justify-center gap-1",
                                        selectedWeight === "piece"
                                            ? "bg-white text-brown shadow-sm border border-brown/10"
                                            : "text-brown/40 hover:bg-white/50"
                                    )}
                                >
                                    1 Piece
                                </button>
                                <button
                                    onClick={(e) => handleWeightSelect(e, "10pc")}
                                    className={cn(
                                        "flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all duration-200 flex items-center justify-center gap-1",
                                        selectedWeight === "10pc"
                                            ? "bg-white text-brown shadow-sm border border-brown/10"
                                            : "text-brown/40 hover:bg-white/50"
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
                                        "flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all duration-200 flex items-center justify-center gap-1",
                                        selectedWeight === "piece"
                                            ? "bg-white text-brown shadow-sm border border-brown/10"
                                            : "text-brown/40 hover:bg-white/50"
                                    )}
                                >
                                    Piece
                                </button>
                                <button
                                    onClick={(e) => handleWeightSelect(e, "1lb")}
                                    className={cn(
                                        "flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all duration-200 flex items-center justify-center gap-1",
                                        selectedWeight === "1lb"
                                            ? "bg-white text-brown shadow-sm border border-brown/10"
                                            : "text-brown/40 hover:bg-white/50"
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
                                        "flex-1 py-2 md:py-1.5 rounded-md text-xs font-bold transition-all duration-200 min-h-[32px] md:min-h-0 flex items-center justify-center relative",
                                        selectedWeight === weight
                                            ? "bg-white text-brown shadow-sm border border-brown/10 transform scale-[1.02]"
                                            : "text-brown/40 hover:bg-white/50 hover:text-brown/70"
                                    )}
                                >
                                    {weight}
                                    {selectedWeight === weight && (
                                        <div className="absolute top-0.5 right-0.5">
                                            <Check size={8} className="text-purple" strokeWidth={4} />
                                        </div>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* 4. Price & Action (Bottom Section) */}
                <div className="mt-auto border-t border-dashed border-brown/10 pt-3 flex items-end justify-between gap-2">
                    {/* Price Block */}
                    <div className="flex flex-col">
                        <span className="text-[10px] text-brown/40 font-bold uppercase tracking-wider mb-0.5">Price</span>
                        <div className="flex items-baseline gap-1">
                            {/* Original Price Logic: Show if discount exists. For 10pc, original is 200. For cake 1lb/no selection. */}
                            {product.originalPrice && (
                                (product.type === "cupcake" && selectedWeight === "10pc") ||
                                (!product.type && (!selectedWeight || selectedWeight === "1lb"))
                            ) && (
                                    <span className="text-sm text-brown/40 line-through mr-1 font-bold">₹{product.originalPrice}</span>
                                )}

                            <span className={cn("font-heading text-2xl leading-none",
                                product.originalPrice && (
                                    (product.type === "cupcake" && selectedWeight === "10pc") ||
                                    (!product.type && (!selectedWeight || selectedWeight === "1lb"))
                                ) ? "text-red-500" : "text-brown"
                            )}>
                                ₹{currentPrice}
                            </span>
                        </div>
                    </div>

                    {/* Action Block */}
                    <div className="flex-1 max-w-[140px] relative">
                        {product.type !== "cupcake" && product.category !== "brownies" && !selectedWeight && (
                            <div className="absolute -top-5 left-0 w-full text-center">
                                <span className="text-[10px] text-red-500 font-bold animate-pulse">Select Size</span>
                            </div>
                        )}
                        <Button
                            onClick={handleOrder}
                            disabled={!selectedWeight}
                            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white h-10 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center justify-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Order
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
