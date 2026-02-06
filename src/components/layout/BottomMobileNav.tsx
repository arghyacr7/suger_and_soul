"use client"

import Link from "next/link"
import { Home, Grid, Search, MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { SearchModal } from "../ui/SearchModal"
import { motion, AnimatePresence } from "framer-motion"

export function BottomMobileNav() {
    const pathname = usePathname()
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const isActive = (path: string) => pathname === path

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-brown/10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:hidden pb-safe">
                <div className="flex justify-around items-center h-16 relative">
                    <Link
                        href="/"
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-full space-y-1",
                            isActive("/") ? "text-brown" : "text-brown/40"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Home size={24} strokeWidth={isActive("/") ? 2.5 : 2} />
                        <span className="text-[10px] font-bold uppercase tracking-wide">Home</span>
                    </Link>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                            isMenuOpen || isActive("/cakes") || isActive("/cream-cakes") || isActive("/brownies") ? "text-brown" : "text-brown/40"
                        )}
                    >
                        <Grid size={24} strokeWidth={isMenuOpen ? 2.5 : 2} />
                        <span className="text-[10px] font-bold uppercase tracking-wide">Menu</span>
                    </button>

                    {/* Menu Drawer */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 mb-16"
                                />
                                <motion.div
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: "100%", opacity: 0 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    className="absolute bottom-full left-0 right-0 bg-white rounded-t-[2rem] shadow-2xl border-t-2 border-brown/10 p-6 z-50 mb-[2px]"
                                >
                                    <div className="flex flex-col gap-3">
                                        <div className="text-center mb-2">
                                            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto" />
                                            <h3 className="font-heading text-lg font-bold text-brown mt-4 uppercase">Select Category</h3>
                                        </div>

                                        <Link
                                            href="/cakes"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-4 rounded-xl bg-yellow/10 text-brown font-bold text-lg text-center active:scale-95 transition-transform border border-yellow/20"
                                        >
                                            Normal Cakes
                                        </Link>
                                        <Link
                                            href="/cream-cakes"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-4 rounded-xl bg-pink/10 text-brown font-bold text-lg text-center active:scale-95 transition-transform border border-pink/20"
                                        >
                                            Cream Cakes
                                        </Link>
                                        <Link
                                            href="/brownies"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-4 rounded-xl bg-blue/10 text-brown font-bold text-lg text-center active:scale-95 transition-transform border border-blue/20"
                                        >
                                            Brownies
                                        </Link>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => {
                            setIsSearchOpen(true)
                            setIsMenuOpen(false)
                        }}
                        className="flex flex-col items-center justify-center w-full h-full space-y-1 text-brown/40 hover:text-brown"
                    >
                        <div className="bg-yellow text-brown p-2 rounded-full -mt-6 border-4 border-white shadow-sm">
                            <Search size={24} strokeWidth={2.5} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wide">Search</span>
                    </button>

                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            setIsMenuOpen(false)
                            window.open(`https://wa.me/919836733874`, "_blank")
                        }}
                        className="flex flex-col items-center justify-center w-full h-full space-y-1 text-brown/40"
                    >
                        <MessageCircle size={24} strokeWidth={2} />
                        <span className="text-[10px] font-bold uppercase tracking-wide">Chat</span>
                    </a>
                </div>
            </div>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    )
}
