"use client"

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export function CustomOrderBanner() {
    return (
        <section className="py-12 container mx-auto px-4 md:px-6">
            <div className="bg-gradient-to-r from-purple to-pink rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">

                <div className="relative z-10 max-w-xl">
                    <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border border-white/20">
                        <Sparkles size={16} className="text-yellow" /> Custom Cakes
                    </div>
                    <h2 className="font-heading text-3xl md:text-5xl font-black mb-4 uppercase drop-shadow-md">
                        Have something special in mind?
                    </h2>
                    <p className="text-white/90 text-xl font-medium leading-relaxed">
                        Tell us your idea and we’ll turn it into a delicious reality. Theme cakes, custom flavors, and special messages.
                    </p>
                </div>

                <div className="relative z-10 shrink-0">
                    <Link
                        href="/custom-order"
                        className="inline-flex items-center justify-center h-14 px-8 text-xl font-medium bg-yellow text-brown hover:bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] uppercase tracking-wide gap-2 rounded-xl transition-all"
                    >
                        Get a Custom Cake
                    </Link>
                </div>

                {/* Decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            </div>
        </section>
    )
}
