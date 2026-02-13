"use client"

import { useState, useEffect } from "react"
import { Search, X, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Product } from "@/types"
import { products } from "@/lib/products" // Import real data
import Image from "next/image"

interface SearchModalProps {
    isOpen: boolean
    onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Product[]>([])

    useEffect(() => {
        if (query.trim() === "") {
            setResults([])
            return
        }
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.includes(query.toLowerCase())
        )
        setResults(filtered)
    }, [query])

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: -20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: -20 }}
                    className="bg-[#0A0A0A] w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] mx-4 border border-white/10"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-white/5">
                        <Search className="text-white/50" size={24} />
                        <input
                            type="text"
                            placeholder="Search for cakes, brownies..."
                            className="flex-1 bg-transparent text-xl font-bold text-white placeholder:text-white/30 focus:outline-none font-display uppercase tracking-wide"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <X size={24} className="text-white/70" />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="max-h-[60vh] overflow-y-auto p-4 bg-[#0A0A0A] custom-scrollbar">
                        {results.length > 0 ? (
                            <div className="grid gap-3">
                                {results.map(product => (
                                    <Link
                                        key={product.id}
                                        href={`/#menu`} // Linking to menu since individual product pages might not be fully set up for all items, or using direct ProductModal handler would be better but this is a quick fix. ideally /product/[id] if that page works. user said "opening a card card it not chnaged" implies modals.
                                        // Wait, the previous issue was about MODALS not opening. 
                                        // If I link to /product/id, does that page exist? I verified src/app/product/[id] exists.
                                        // Let's rely on the route.
                                        // actually, user might want the modal to open. But SearchModal is a separate overlay. 
                                        // Navigating to /product/[id] is the standard way for search results.
                                        href={`/product/${product.id}`}
                                        onClick={onClose}
                                        className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl hover:bg-white/10 border border-transparent hover:border-yellow/50 transition-all group"
                                    >
                                        <div className="w-16 h-16 bg-white/5 rounded-xl overflow-hidden relative border border-white/10">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg text-white group-hover:text-yellow transition-colors font-display line-clamp-1">{product.name}</h4>
                                            <p className="text-sm text-white/50 capitalize">{product.category.replace("-", " ")}</p>
                                        </div>
                                        <span className="font-bold text-yellow mr-2">₹{product.price}</span>
                                        <ArrowRight size={18} className="text-white/30 group-hover:text-yellow group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        ) : query !== "" ? (
                            <div className="text-center py-12 text-white/30 flex flex-col items-center">
                                <Search size={48} className="mb-4 opacity-20" />
                                <p>No sweets found for "{query}" 🍪</p>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-white/30 flex flex-col items-center">
                                <p className="uppercase tracking-widest text-xs font-bold mb-2 opacity-50">Start Typing</p>
                                <p>Find your favorite treats...</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
