"use client"

import { CheckCircle, Clock, Heart } from "lucide-react"

export function WhySugarAndSoul() {
    return (
        <section className="py-16 bg-transparent border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-10">
                    <h2 className="font-heading text-3xl md:text-5xl text-brown mb-4 uppercase tracking-widest">Why Sugar & Soul?</h2>
                    <p className="text-brown/50 tracking-widest uppercase text-sm">The secret ingredients.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-[#0A0A0A] p-10 border border-white/5 flex flex-col items-center text-center hover:border-yellow transition-all duration-500 group">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-yellow mb-6 border border-yellow/30 group-hover:bg-yellow group-hover:text-black transition-all duration-500">
                            <Heart size={24} fill="currentColor" className="opacity-80" />
                        </div>
                        <h3 className="font-heading text-xl text-brown mb-4 uppercase tracking-widest">Made with Love</h3>
                        <p className="text-brown/60 text-sm leading-relaxed tracking-wide font-light">
                            Handcrafted in small batches with premium ingredients and a whole lot of soul.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#0A0A0A] p-10 border border-white/5 flex flex-col items-center text-center hover:border-yellow transition-all duration-500 group">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-yellow mb-6 border border-yellow/30 group-hover:bg-yellow group-hover:text-black transition-all duration-500">
                            <CheckCircle size={24} className="opacity-80" />
                        </div>
                        <h3 className="font-heading text-xl text-brown mb-4 uppercase tracking-widest">Hygiene Promise</h3>
                        <p className="text-brown/60 text-sm leading-relaxed tracking-wide font-light">
                            Strict hygiene protocols in our cloud kitchen. Safety and freshness guaranteed.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#0A0A0A] p-10 border border-white/5 flex flex-col items-center text-center hover:border-yellow transition-all duration-500 group">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-yellow mb-6 border border-yellow/30 group-hover:bg-yellow group-hover:text-black transition-all duration-500">
                            <Clock size={24} className="opacity-80" />
                        </div>
                        <h3 className="font-heading text-xl text-brown mb-4 uppercase tracking-widest">Freshly Baked</h3>
                        <p className="text-brown/60 text-sm leading-relaxed tracking-wide font-light">
                            We bake only after you order. Experience the magic of oven-fresh delights.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
