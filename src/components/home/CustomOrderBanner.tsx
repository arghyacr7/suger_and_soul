"use client"

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export function CustomOrderBanner() {
    return (
        <section className="py-12 container mx-auto px-4 md:px-6">
            <div className="bg-[#0A0A0A] rounded-none p-8 md:p-12 relative overflow-hidden border border-white/10 md:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-yellow/30 transition-all duration-500">

                <div className="relative z-10 max-w-xl text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-none text-xs font-bold uppercase tracking-[0.2em] mb-6 border border-white/10 text-yellow">
                        <Sparkles size={14} className="text-yellow" /> Custom Cakes
                    </div>
                    <h2 className="font-heading text-3xl md:text-5xl text-brown mb-6 uppercase tracking-widest leading-tight">
                        Have something <span className="text-yellow">special</span> in mind?
                    </h2>
                    <p className="text-brown/60 text-sm md:text-base font-light leading-relaxed tracking-wide uppercase">
                        Tell us your idea and we’ll turn it into a delicious reality. Theme cakes, custom flavors, and special messages.
                    </p>
                </div>

                <div className="relative z-10 shrink-0">
                    <Link
                        href="/custom-order"
                        className="inline-flex items-center justify-center h-14 px-10 text-sm font-bold bg-transparent text-yellow border border-yellow hover:bg-yellow hover:text-black uppercase tracking-[0.2em] transition-all duration-500 rounded-none transform hover:-translate-y-1"
                    >
                        Get a Custom Cake
                    </Link>
                </div>

                {/* Decorations */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-yellow/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            </div>
        </section>
    )
}
