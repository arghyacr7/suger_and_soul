"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search, Phone } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"
import { SearchModal } from "@/components/ui/SearchModal"

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

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-brown/10">
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 scale-105 hover:scale-110 transition-transform origin-left">
                    <Image
                        src="/images/logo.png"
                        alt="Sugar & Soul"
                        width={80}
                        height={80}
                        className="w-auto h-12 md:h-16 object-contain"
                    />
                    <span className="font-heading text-xl md:text-2xl font-bold text-brown uppercase tracking-wider">
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
                        <a
                            href="tel:9836733874"
                            className="flex items-center gap-2 text-brown hover:text-purple font-bold tracking-wide transition-colors group"
                        >
                            <div className="p-2 rounded-full bg-brown/5 group-hover:bg-brown/10 transition-colors">
                                <Phone size={20} />
                            </div>
                            <span className="hidden lg:inline text-sm">9836733874</span>
                        </a>

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

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-brown"
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
