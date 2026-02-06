"use client"

import { useState, useEffect } from "react"
import { Search, X, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Product } from "@/types"
import Image from "next/image"

// Mock Data (Ideally fetch this or pass it down)
const allProducts: Product[] = [
    { id: "1", name: "Truffle Bliss Cake", description: "Rich dark chocolate ganache with moist sponge.", price: 850, image: "/images/cake-1.jpg", category: "cakes", popular: true },
    { id: "2", name: "Red Velvet Dream", description: "Classic red velvet with cream cheese frosting.", price: 900, image: "/images/cake-2.jpg", category: "cakes", popular: true },
    { id: "3", name: "Lotus Cheesecak", description: "Creamy biscoff cheesecake.", price: 1200, image: "/images/cake-3.jpg", category: "cream-cakes", popular: true },
    { id: "4", name: "Fudgy Walnut Brownie", description: "Gooey chocolate brownies loaded with walnuts.", price: 150, image: "/images/brownie-1.jpg", category: "brownies", popular: true },
    { id: "5", name: "Pineapple Pastry", description: "Fresh pineapple slices and cream.", price: 600, image: "/images/cake-4.jpg", category: "cream-cakes" },
    { id: "6", name: "Blueberry Cheesecake", description: "No-bake blueberry delight.", price: 1100, image: "/images/cake-5.jpg", category: "cream-cakes" },
    { id: "7", name: "Double Choco Chip Brownie", description: "Loaded with white and dark chips.", price: 160, image: "/images/brownie-2.jpg", category: "brownies" },
]

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
        const filtered = allProducts.filter(p =>
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
                className="fixed inset-0 z-[60] bg-brown/80 backdrop-blur-sm flex items-start justify-center pt-24"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: -20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: -20 }}
                    className="bg-cream w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl mx-4 border-4 border-brown"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-4 border-b-2 border-brown/10 flex items-center gap-4 bg-white">
                        <Search className="text-brown/50" size={24} />
                        <input
                            type="text"
                            placeholder="Search for cakes, brownies..."
                            className="flex-1 bg-transparent text-xl font-bold text-brown placeholder:text-brown/30 focus:outline-none font-display uppercase tracking-wide"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                        <button onClick={onClose} className="p-2 hover:bg-brown/5 rounded-full transition-colors">
                            <X size={24} className="text-brown" />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="max-h-[60vh] overflow-y-auto p-4 bg-cream">
                        {results.length > 0 ? (
                            <div className="grid gap-4">
                                {results.map(product => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.id}`}
                                        onClick={onClose}
                                        className="flex items-center gap-4 p-3 bg-white rounded-2xl hover:bg-yellow/10 border-2 border-transparent hover:border-yellow transition-all group"
                                    >
                                        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden relative border border-brown/10">
                                            {/* Image Placeholder */}
                                            <div className="absolute inset-0 bg-pink/20 flex items-center justify-center text-brown/40 text-xs text-center p-1">
                                                {product.name}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg text-brown group-hover:text-purple transition-colors font-display">{product.name}</h4>
                                            <p className="text-sm text-brown/60 capitalize">{product.category.replace("-", " ")}</p>
                                        </div>
                                        <span className="font-bold text-brown mr-2">₹{product.price}</span>
                                        <ArrowRight size={18} className="text-brown/30 group-hover:text-brown group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        ) : query !== "" ? (
                            <div className="text-center py-12 text-brown/40">
                                <p>No sweets found for "{query}" 🍪</p>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-brown/40">
                                <p>Type to find your favorite treats!</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
