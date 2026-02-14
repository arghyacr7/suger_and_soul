"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search, Phone, Heart } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"
import { SearchModal } from "@/components/ui/SearchModal"
import { useAuth } from "@/context/AuthContext"

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Cakes", href: "/cakes" },
    { name: "Cream Cakes", href: "/cream-cakes" },
    { name: "Brownies", href: "/brownies" },
    { name: "Custom Order", href: "/custom-order" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const { user, greeting, loading, likedProducts, signOut } = useAuth()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/10 shadow-[0_4px_20px_-10px_rgba(255,215,0,0.3)] md:shadow-none">
            <div className="container mx-auto px-2 md:px-6 h-20 md:h-24 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 md:gap-4 scale-105 hover:scale-110 transition-transform origin-left">
                    <Image
                        src="/images/logo.png"
                        alt="Sugar & Soul"
                        width={80}
                        height={80}
                        className="w-auto h-12 md:h-16 object-contain"
                    />
                    <div className="flex flex-col items-start -gap-1 md:gap-0">
                        <span className="font-heading text-sm md:text-2xl font-bold text-brown uppercase tracking-wider leading-none">
                            Sugar & Soul
                        </span>

                        {/* Luxury Divider */}
                        <div className="w-10 md:w-16 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent mt-1 mb-1 opacity-80"></div>

                        {/* Premium Glow Credit */}
                        <span className="text-[9px] md:text-[10px] font-light tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_6px_rgba(255,215,0,0.6)] leading-none ml-0.5">
                            by Moumita Das
                        </span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6 mr-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-brown/80 hover:text-brown font-heading font-bold uppercase tracking-wider text-sm transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 border-l border-brown/10 pl-6">
                        {/* Auth Section */}
                        {loading ? (
                            <div className="w-20 h-8 bg-brown/5 animate-pulse rounded-full" />
                        ) : user ? (
                            <div className="flex items-center gap-2 md:gap-4">
                                <Link
                                    href="/liked-products"
                                    className="p-2 rounded-full hover:bg-brown/5 transition-colors text-brown relative group"
                                    aria-label="Liked Products"
                                >
                                    <Heart size={22} className={cn("transition-colors", likedProducts.length > 0 ? "fill-red-500 text-red-500" : "text-brown")} strokeWidth={2.5} />
                                    {likedProducts.length > 0 && (
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                            {likedProducts.length}
                                        </span>
                                    )}
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="text-[10px] md:text-xs font-bold text-brown/60 hover:text-red-500 uppercase tracking-wide transition-colors hidden md:block"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/auth"
                                className="text-sm font-bold text-brown hover:text-purple uppercase tracking-wide transition-colors"
                            >
                                Login
                            </Link>
                        )}

                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 rounded-full hover:bg-brown/5 transition-colors text-brown"
                            aria-label="Search"
                        >
                            <Search size={22} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

                {/* Mobile Right: Heart + Menu */}
                <div className="flex md:hidden items-center">
                    {user && !loading && (
                        <Link
                            href="/liked-products"
                            className="p-1.5 rounded-full hover:bg-brown/5 transition-colors text-brown relative"
                            aria-label="Liked Products"
                        >
                            <Heart size={20} className={cn("transition-colors", likedProducts.length > 0 ? "fill-red-500 text-red-500" : "text-brown")} strokeWidth={2.5} />
                            {likedProducts.length > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold flex items-center justify-center rounded-full">
                                    {likedProducts.length}
                                </span>
                            )}
                        </Link>
                    )}
                    {!user && !loading && (
                        <Link
                            href="/auth"
                            className="text-[9px] font-bold text-brown hover:text-purple uppercase tracking-wide transition-colors px-2"
                        >
                            Login
                        </Link>
                    )}
                    {/* Mobile Menu Toggle */}
                    <button
                        className="text-brown"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0A0A0A] border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-white/80 hover:text-yellow font-heading uppercase tracking-widest text-sm py-3 border-b border-white/5 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link href="/cakes">
                                <Button className="w-full bg-yellow text-black border border-yellow hover:bg-white hover:text-black rounded-none uppercase tracking-widest font-bold mt-4" onClick={() => setIsOpen(false)}>
                                    Order Now
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
