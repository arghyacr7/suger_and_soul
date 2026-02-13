"use client"

import { useState, useEffect, useMemo } from "react"
import { X, Check, Star } from "lucide-react"
import { Product } from "@/types"
import { Button } from "@/components/ui/Button"
import { buildWhatsAppLink } from "@/lib/whatsapp"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductModalProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const [selectedWeight, setSelectedWeight] = useState<"1lb" | "2lb" | "3lb" | "piece" | "10pc" | null>(null)
    const [rating, setRating] = useState<number | null>(null)
    const [hoverRating, setHoverRating] = useState<number | null>(null)

    // Reset state when product opens
    useEffect(() => {
        if (isOpen && product) {
            // Auto-select defaults
            if (product.type === "cupcake") {
                setSelectedWeight("piece")
            } else if (product.category === "brownies") {
                setSelectedWeight("piece")
            } else {
                setSelectedWeight("1lb")
            }
            // Reset rating
            setRating(null)
            setHoverRating(null)
        }
    }, [isOpen, product])

    // Calculate Dynamic Price
    const currentPrice = useMemo(() => {
        if (!product || !selectedWeight) return 0
        if (product.variantPrices?.[selectedWeight]) {
            return product.variantPrices[selectedWeight]
        }
        return product.price
    }, [selectedWeight, product])

    if (!isOpen || !product) return null

    const handleOrder = () => {
        if (!selectedWeight) {
            alert("Please select a size or option first!")
            return
        }

        let message = `Hi Sugar & Soul,\n\nI would like to order the following item:\n\nProduct: *${product.name}*`

        // Add details based on type
        if (product.type === "cupcake") {
            message += `\nQuantity: ${selectedWeight === "piece" ? "1 Piece" : "10 Pieces"}`
        } else if (product.category === "brownies") {
            message += `\nOption: ${selectedWeight === "piece" ? "Per Piece" : "1lb Box (6 pcs)"}`
        } else {
            const weightLabel = selectedWeight === "1lb" ? "1lb (Approx 450g)" :
                selectedWeight === "2lb" ? "2lb (Approx 900g)" :
                    "3lb (Approx 1350g)"
            message += `\nSize: ${weightLabel}`
        }

        message += `\nPrice: Rs. ${currentPrice}`

        // Add Rating if selected
        if (rating) {
            message += `\nRating: ${rating} Star`
        }

        // Add Product Links
        // Using verified deployment URL
        const domain = "https://suger-and-soul-n7dbujw8l-arghyacr7s-projects.vercel.app"
        const productUrl = `${domain}/product/${product.id}`
        // Ensure image URL is properly formatted/encoded if needed
        const imageUrl = `${domain}${product.image.split(" ").join("%20")}`

        message += `\n\nProduct Page:\n${productUrl}`
        message += `\n\nProduct Image:\n${imageUrl}`

        message += `\n\nDelivery Location: __________\n(Note: Delivery available within 1 km only)`

        message += `\n\nPlease confirm availability.\nThank you.`

        const link = buildWhatsAppLink(message)
        window.open(link, "_blank")
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content - Dark Luxury Style */}
            <div className="relative bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-[slide-up_0.3s_ease-out] max-h-[90vh] flex flex-col md:flex-row overflow-y-auto md:overflow-visible">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-black/50 border border-white/10 p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white/70 hover:text-white"
                >
                    <X size={24} />
                </button>

                {/* Image Side */}
                <div className="md:w-1/2 h-64 md:h-auto relative bg-white/5">
                    <Image
                        src={product.image}
                        alt={`${product.name} by Sugar & Soul`}
                        fill
                        className="object-cover"
                    />
                    {product.discountText && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wide z-10">
                            {product.discountText}
                        </div>
                    )}
                </div>
                {/* Info Side */}
                <div className="md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
                    <span className="text-purple-400 font-bold text-sm uppercase tracking-wider mb-2">{product.category.replace("-", " ")}</span>
                    <h2 className="font-heading text-3xl text-white mb-2 leading-tight">{product.name}</h2>
                    <p className="text-white/70 mb-6 text-sm leading-relaxed font-light">{product.description}</p>

                    {/* Size Guide - Only for Cakes */}
                    {product.type !== "cupcake" && product.category !== "brownies" && (
                        <div className="text-[10px] text-white/40 mb-2 italic">
                            Size Guide: 1lb ≈ 450g | 2lb ≈ 900g | 3lb ≈ 1350g
                        </div>
                    )}

                    {/* Weights / Options */}
                    <div className="mb-6">
                        <label className="block text-white font-bold text-sm mb-3 uppercase tracking-wide opacity-90">
                            {product.type === "cupcake" ? "Select Quantity" : product.category === "brownies" ? "Select Option" : "Select Weight"}
                        </label>
                        <div className="flex gap-3 flex-wrap">
                            {product.type === "cupcake" ? (
                                <>
                                    <button
                                        onClick={() => setSelectedWeight("piece")}
                                        className={cn(
                                            "flex-1 py-3 px-2 rounded-xl text-sm font-bold border transition-all duration-200 relative overflow-hidden flex flex-col items-center justify-center min-w-[120px]",
                                            selectedWeight === "piece"
                                                ? "border-purple-500 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                                : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                                        )}
                                    >
                                        <span className="block text-xs uppercase mb-1 opacity-70">1 Piece</span>
                                        <span className="block text-lg">₹{product.variantPrices?.["piece"] || 20}</span>
                                        {selectedWeight === "piece" && (
                                            <div className="absolute top-2 right-2">
                                                <Check size={16} className="text-purple-400" strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setSelectedWeight("10pc")}
                                        className={cn(
                                            "flex-1 py-3 px-2 rounded-xl text-sm font-bold border transition-all duration-200 relative overflow-hidden flex flex-col items-center justify-center min-w-[120px]",
                                            selectedWeight === "10pc"
                                                ? "border-purple-500 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                                : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                                        )}
                                    >
                                        <span className="block text-xs uppercase mb-1 opacity-70">10 Pieces (Combo)</span>
                                        <span className="block text-lg">₹{product.variantPrices?.["10pc"] || 170}</span>
                                        {selectedWeight === "10pc" && (
                                            <div className="absolute top-2 right-2">
                                                <Check size={16} className="text-purple-400" strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>
                                </>
                            ) : product.category === "brownies" ? (
                                <>
                                    <button
                                        onClick={() => setSelectedWeight("piece")}
                                        className={cn(
                                            "flex-1 py-3 px-2 rounded-xl text-sm font-bold border transition-all duration-200 relative overflow-hidden flex flex-col items-center justify-center min-w-[120px]",
                                            selectedWeight === "piece"
                                                ? "border-purple-500 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                                : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                                        )}
                                    >
                                        <span className="block text-xs uppercase mb-1 opacity-70">Per Piece</span>
                                        <span className="block text-lg">₹{product.variantPrices?.["piece"] || 50}</span>
                                        {selectedWeight === "piece" && (
                                            <div className="absolute top-2 right-2">
                                                <Check size={16} className="text-purple-400" strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setSelectedWeight("1lb")}
                                        className={cn(
                                            "flex-1 py-3 px-2 rounded-xl text-sm font-bold border transition-all duration-200 relative overflow-hidden flex flex-col items-center justify-center min-w-[120px]",
                                            selectedWeight === "1lb"
                                                ? "border-purple-500 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                                : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                                        )}
                                    >
                                        <span className="block text-xs uppercase mb-1 opacity-70">1lb Box (6pcs)</span>
                                        <span className="block text-lg">₹{product.variantPrices?.["1lb"] || 250}</span>
                                        {selectedWeight === "1lb" && (
                                            <div className="absolute top-2 right-2">
                                                <Check size={16} className="text-purple-400" strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>
                                </>
                            ) : (
                                (["1lb", "2lb", "3lb"] as const).map((weight) => (
                                    <button
                                        key={weight}
                                        onClick={() => setSelectedWeight(weight)}
                                        className={cn(
                                            "flex-1 py-3 px-2 rounded-xl text-sm font-bold border transition-all duration-200 relative overflow-hidden",
                                            selectedWeight === weight
                                                ? "border-purple-500 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                                : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                                        )}
                                    >
                                        <span className="block text-xs uppercase mb-1 opacity-70">
                                            {weight}
                                        </span>
                                        <span className="block text-lg">
                                            ₹{product.variantPrices?.[weight]}
                                        </span>
                                        {selectedWeight === weight && (
                                            <div className="absolute top-1 right-1">
                                                <Check size={12} className="text-purple-400" strokeWidth={4} />
                                            </div>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* NEW Rating Section */}
                    <div className="mb-8">
                        <label className="block text-white/80 font-bold text-sm mb-2 opacity-90 uppercase tracking-wide">
                            How do you like this cake?
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(null)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star
                                        size={24}
                                        className={cn(
                                            "transition-colors duration-200",
                                            (hoverRating || rating || 0) >= star
                                                ? "fill-yellow text-yellow"
                                                : "fill-transparent text-white/20"
                                        )}
                                        strokeWidth={1.5}
                                    />
                                </button>
                            ))}
                        </div>
                        {rating && (
                            <span className="text-xs text-yellow font-bold mt-1 block animate-pulse">
                                {rating} Star{rating > 1 ? 's' : ''} Selected
                            </span>
                        )}
                    </div>

                    {/* Price & Action */}
                    <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                        <div>
                            <span className="block text-xs text-white/40 uppercase font-bold tracking-wider">Total Price</span>
                            <div className="flex items-baseline gap-2">
                                {product.originalPrice && (
                                    (product.type === "cupcake" && selectedWeight === "10pc") ||
                                    (!product.type && (!selectedWeight || selectedWeight === "1lb"))
                                ) && (
                                        <span className="text-lg text-white/30 line-through font-bold">₹{product.originalPrice}</span>
                                    )}
                                <span className={cn("font-heading text-3xl animate-[fade-in_0.3s_ease-out] block text-white drop-shadow-md",
                                    product.originalPrice && (
                                        (product.type === "cupcake" && selectedWeight === "10pc") ||
                                        (!product.type && (!selectedWeight || selectedWeight === "1lb"))
                                    ) ? "text-green-400" : "text-white"
                                )}>
                                    ₹{currentPrice}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            {product.type !== "cupcake" && product.category !== "brownies" && !selectedWeight && (
                                <span className="text-[10px] text-red-500 font-bold animate-pulse">
                                    Please select size
                                </span>
                            )}
                            <Button
                                onClick={handleOrder}
                                disabled={!selectedWeight}
                                className="bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-[0_0_20px_rgba(37,211,102,0.4)] px-8 py-6 rounded-xl font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all"
                            >
                                Order on WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
