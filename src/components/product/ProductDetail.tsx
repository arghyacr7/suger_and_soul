"use client"

import { useState } from "react"
import Image from "next/image"
import { Product } from "@/types"
import { Button } from "@/components/ui/Button"
import { ShoppingBag, ChevronLeft, Minus, Plus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { generateWhatsAppLink } from "@/lib/whatsapp"

interface ProductDetailProps {
    product: Product
}

type Weight = 1 | 2 | 3

export function ProductDetail({ product }: ProductDetailProps) {
    const [weight, setWeight] = useState<Weight>(1)
    const [quantity, setQuantity] = useState(1)
    const [message, setMessage] = useState("")

    // Calculate price based on weight
    const pricePerLb = product.price
    const currentPrice = pricePerLb * weight
    const totalPrice = currentPrice * quantity

    const handleOrder = () => {
        const selectedWeight = `${weight} lb`
        const text = `
Hi Sugar & Soul 🍰

I would like to order:
*Product:* ${product.name}
*Category:* ${product.category}
*Weight:* ${selectedWeight}
*Quantity:* ${quantity}
*Total Price:* ₹${totalPrice}
${message ? `*Message on Cake:* ${message}` : ''}

_(Note: I understand delivery is within 1km radius only)_

Please confirm availability.
        `.trim()
        const link = generateWhatsAppLink({ text })
        window.open(link, "_blank")
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 min-h-screen bg-[#050505]">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors">
                <ChevronLeft size={20} className="mr-1" /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wide">{product.name}</h1>
                    <p className="text-xl text-white/70 mb-6 leading-relaxed">{product.description}</p>

                    <div className="h-px w-full bg-white/10 mb-8" />

                    {/* Weight Selector */}
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-white/50 mb-3 uppercase tracking-widest">Select Weight</label>
                        <div className="flex gap-4">
                            {[1, 2, 3].map((w) => (
                                <button
                                    key={w}
                                    onClick={() => setWeight(w as Weight)}
                                    className={cn(
                                        "w-16 h-16 rounded-xl border-2 flex items-center justify-center font-bold text-lg transition-all",
                                        weight === w
                                            ? "border-yellow bg-yellow/20 text-yellow"
                                            : "border-white/10 text-white/60 hover:border-white/30 hover:bg-white/5"
                                    )}
                                >
                                    {w} lb
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-white/50 mb-3 uppercase tracking-widest">Quantity</label>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="text-xl font-bold text-white w-8 text-center">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Custom Message Input */}
                    <div className="mb-8">
                        <label className="block text-white font-bold mb-2 uppercase text-sm tracking-widest">Message on Cake (Optional)</label>
                        <input
                            type="text"
                            placeholder="e.g. Happy Birthday Mom"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-white/5 border-2 border-white/10 rounded-xl p-3 text-white font-bold focus:outline-none focus:border-yellow transition-colors placeholder:text-white/30 font-display"
                        />
                    </div>

                    {/* Delivery Note */}
                    <div className="bg-yellow/10 border-2 border-yellow/20 rounded-xl p-4 mb-8 flex items-start gap-3">
                        <div className="bg-yellow text-[#050505] rounded-full p-1 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3" /><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" /><path d="M14 17h1" /><circle cx="7.5" cy="17.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>
                        </div>
                        <div>
                            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-widest">Delivery Notice</h4>
                            <p className="text-white/70 text-sm">We only deliver fresh within a <span className="font-bold underline text-yellow">1 km radius</span>. Pickup available for standard orders.</p>
                        </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="mt-auto bg-white/5 border border-white/10 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-white/60 uppercase tracking-wide font-bold text-sm">Total Amount</span>
                            <span className="font-heading text-3xl font-bold text-yellow">₹{totalPrice}</span>
                        </div>
                        <Button size="lg" className="w-full gap-2 text-lg" onClick={handleOrder}>
                            <span>Order on WhatsApp</span>
                            <ShoppingBag size={20} />
                        </Button>
                        <p className="text-xs text-center text-white/40 mt-3">
                            *Prices may vary slightly based on customization.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
