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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-brown/10">
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-2">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 md:gap-3 scale-105 hover:scale-110 transition-transform origin-left">
                    <Image
                        src="/images/logo.png"
                        alt="Sugar & Soul"
                        width={80}
                        height={80}
                        className="w-auto h-10 md:h-16 object-contain"
                    />
                    <span className="font-heading text-sm md:text-2xl font-bold text-brown uppercase tracking-wider">
                        Sugar & Soul
                    </span>
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
                <div className="flex md:hidden items-center gap-2 flex-shrink-0">
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
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-brown flex-shrink-0"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-cream border-t border-brown/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-brown font-medium text-lg py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button className="w-full" onClick={() => setIsOpen(false)}>
                                Order Now
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
