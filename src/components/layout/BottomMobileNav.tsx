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
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A] border-t border-white/10 shadow-[0_-4px_10px_rgba(0,0,0,0.4)] md:hidden pb-safe">
                <div className="flex justify-around items-center h-16 relative">
                    <Link
                        href="/"
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-full space-y-1",
                            isActive("/") ? "text-yellow" : "text-white/40 hover:text-white/60"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <Home size={24} strokeWidth={isActive("/") ? 2.5 : 1.5} />
                        <span className="text-[10px] font-bold uppercase tracking-wide">Home</span>
                    </Link>

                    <div className="relative -top-5">
                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                y: [0, -4, 0],
                                boxShadow: [
                                    "0 4px 6px -1px rgba(212, 175, 55, 0.3)",
                                    "0 10px 15px -3px rgba(212, 175, 55, 0.4)",
                                    "0 4px 6px -1px rgba(212, 175, 55, 0.3)"
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
                                "bg-[#0A0A0A] text-yellow",
                                "shadow-lg shadow-yellow/20 border border-yellow",
                                "relative z-50"
                            )}
                        >
                            <Grid size={28} strokeWidth={2.5} className="drop-shadow-sm" />
                        </motion.button>
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wide text-white/40">Menu</span>
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
                                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 mb-16"
                                />
                                <motion.div
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: "100%", opacity: 0 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    className="absolute bottom-full left-0 right-0 bg-[#0A0A0A] rounded-t-[2rem] shadow-2xl border-t border-yellow/30 p-6 z-50 mb-2"
                                >
                                    <div className="flex flex-col gap-3">
                                        <div className="text-center mb-2">
                                            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto" />
                                            <h3 className="font-heading text-lg font-bold text-yellow mt-4 uppercase tracking-widest">Select Category</h3>
                                        </div>

                                        <Link
                                            href="/cakes"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-4 rounded-none bg-[#111] text-white/80 font-bold text-lg text-center active:scale-95 transition-transform border border-white/5 hover:border-yellow hover:text-yellow uppercase tracking-widest"
                                        >
                                            Normal Cakes
                                        </Link>
                                        <Link
                                            href="/cream-cakes"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-4 rounded-none bg-[#111] text-white/80 font-bold text-lg text-center active:scale-95 transition-transform border border-white/5 hover:border-pink-500 hover:text-pink-500 uppercase tracking-widest"
                                        >
                                            Cream Cakes
                                        </Link>
                                        <Link
                                            href="/brownies"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-4 rounded-none bg-[#111] text-white/80 font-bold text-lg text-center active:scale-95 transition-transform border border-white/5 hover:border-blue-500 hover:text-blue-500 uppercase tracking-widest"
                                        >
                                            Brownies
                                        </Link>
                                        <Link
                                            href="/custom-order"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-4 rounded-none bg-[#111] text-white/80 font-bold text-lg text-center active:scale-95 transition-transform border border-white/5 hover:border-purple-500 hover:text-purple-500 flex items-center justify-center gap-2 uppercase tracking-widest"
                                        >
                                            <PenTool size={20} className="text-purple" />
                                            Custom Cake
                                        </Link>
                                        <Link
                                            href="/liked-products"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-4 rounded-none bg-[#111] text-white/80 font-bold text-lg text-center active:scale-95 transition-transform border border-white/5 hover:border-red-500 hover:text-red-500 flex items-center justify-center gap-2 uppercase tracking-widest"
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
                            isSearchOpen ? "text-yellow" : "text-white/40 hover:text-white/60"
                        )}
                    >
                        <Search size={24} strokeWidth={isSearchOpen ? 2.5 : 1.5} />
                        <span className="text-[10px] font-bold uppercase tracking-wide">Search</span>
                    </button>

                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            setIsMenuOpen(false)
                            window.open(`https://wa.me/919836733874`, "_blank")
                        }}
                        className="flex flex-col items-center justify-center w-full h-full space-y-1 text-white/40 hover:text-white/60 transition-colors"
                    >
                        <MessageCircle size={24} strokeWidth={1.5} />
                        <span className="text-[10px] font-bold uppercase tracking-wide">Chat</span>
                    </a>
                </div>
            </div>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    )
}
