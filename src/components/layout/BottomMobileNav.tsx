"use client"

import Link from "next/link"
import { Home, Grid, Search, MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { SearchModal } from "../ui/SearchModal"

export function BottomMobileNav() {
    const pathname = usePathname()
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const isActive = (path: string) => pathname === path

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-brown/10 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:hidden pb-safe">
                <div className="flex justify-around items-center h-16">
                    <Link
                        href="/"
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-full space-y-1",
                            isActive("/") ? "text-brown" : "text-brown/40"
                        )}
                    >
                        <Home size={24} strokeWidth={isActive("/") ? 2.5 : 2} />
                        <span className="text-[10px] font-bold uppercase tracking-wide">Home</span>
                    </Link>

                    <Link
                        href="/cakes"
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-full space-y-1",
                            isActive("/cakes") ? "text-brown" : "text-brown/40"
                        )}
                    >
                        <Grid size={24} strokeWidth={isActive("/cakes") ? 2.5 : 2} />
                        <span className="text-[10px] font-bold uppercase tracking-wide">Menu</span>
                    </Link>

                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="flex flex-col items-center justify-center w-full h-full space-y-1 text-brown/40 hover:text-brown"
                    >
                        <div className="bg-yellow text-brown p-2 rounded-full -mt-6 border-4 border-white shadow-sm">
                            <Search size={24} strokeWidth={2.5} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wide">Search</span>
                    </button>

                    <a
                        href="#" // Floating WhatsApp handles the click usually, but this is a dedicated nav item
                        onClick={(e) => {
                            e.preventDefault()
                            // Trigger the existing floating whatsapp click if possible, or just open link
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
