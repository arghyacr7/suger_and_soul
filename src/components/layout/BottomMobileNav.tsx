"use client"

import Link from "next/link"
import { Home, Grid, Search, MessageCircle, Heart, PenTool } from "lucide-react"
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

                    <div className="relative -top-5">
                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                y: [0, -4, 0],
                                boxShadow: [
                                    "0 4px 6px -1px rgba(255, 128, 171, 0.3)",
                                    "0 10px 15px -3px rgba(255, 128, 171, 0.4)",
                                    "0 4px 6px -1px rgba(255, 128, 171, 0.3)"
                                ]
                            }}
                            transition={{
                                y: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                },
                                boxShadow: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                            className={cn(
                                "flex flex-col items-center justify-center size-16 rounded-full",
                                "bg-gradient-to-br from-yellow to-pink text-white",
                                "shadow-lg shadow-pink/30 border-4 border-white",
                                "relative z-50"
                            )}
                        >
                            <Grid size={28} strokeWidth={2.5} className="drop-shadow-sm" />
                        </motion.button>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wide text-brown/60">Menu</span>
                    </div>

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
                                    className="absolute bottom-full left-0 right-0 bg-white rounded-t-[2rem] shadow-2xl border-t-2 border-brown/10 p-6 z-30 mb-2"
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
                                        <Link
                                            href="/custom-order"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-4 rounded-xl bg-purple/10 text-brown font-bold text-lg text-center active:scale-95 transition-transform border border-purple/20 flex items-center justify-center gap-2"
                                        >
                                            <PenTool size={20} className="text-purple" />
                                            Custom Cake
                                        </Link>
                                        <Link
                                            href="/liked-products"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-4 rounded-xl bg-red-50 text-brown font-bold text-lg text-center active:scale-95 transition-transform border border-red-200 flex items-center justify-center gap-2"
                                        >
                                            <Heart size={20} className="text-red-500" />
                                            Liked Products
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
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                            isSearchOpen ? "text-brown" : "text-brown/40"
                        )}
                    >
                        <Search size={24} strokeWidth={isSearchOpen ? 2.5 : 2} />
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
