"use client"

import { Heart, ShieldCheck, Sparkles, ChefHat } from "lucide-react"

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#050505]">


            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4">
                <div className="container mx-auto text-center max-w-4xl">
                    <span className="font-heading text-yellow text-xl mb-4 block uppercase tracking-widest">Our Story</span>
                    <h1 className="font-heading text-5xl md:text-7xl text-white mb-8 text-outline-gold drop-shadow-2xl">
                        Baked with Love,<br />Served with Soul.
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 font-medium leading-relaxed max-w-2xl mx-auto">
                        Sugar & Soul is a premium cloud kitchen dedicated to bringing you the freshest, homemade delights with a touch of magic.
                    </p>
                </div>
            </section>

            {/* Philosophy Grid */}
            <section className="py-16 container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-[#0A0A0A] p-8 rounded-none border border-white/10 hover:border-yellow shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all">
                        <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center mb-6 border border-yellow/30 text-black">
                            <ChefHat size={32} />
                        </div>
                        <h3 className="font-heading text-2xl text-white mb-4 uppercase tracking-wider">Home-Baked Philosophy</h3>
                        <p className="text-white/60 font-medium leading-relaxed">
                            Every cake is baked from scratch in small batches. No mass production, just pure homemade goodness in every bite.
                        </p>
                    </div>

                    <div className="bg-[#0A0A0A] p-8 rounded-none border border-white/10 hover:border-yellow shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all md:mt-12">
                        <div className="w-16 h-16 bg-pink rounded-full flex items-center justify-center mb-6 border border-pink/30 text-black">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="font-heading text-2xl text-white mb-4 uppercase tracking-wider">Hygiene & Freshness</h3>
                        <p className="text-white/60 font-medium leading-relaxed">
                            We follow strict hygiene protocols. Our cloud kitchen is sanitized daily, and we use only the freshest, high-quality ingredients.
                        </p>
                    </div>

                    <div className="bg-[#0A0A0A] p-8 rounded-none border border-white/10 hover:border-yellow shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all">
                        <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center mb-6 border border-purple/30 text-black">
                            <Sparkles size={32} className="text-white" />
                        </div>
                        <h3 className="font-heading text-2xl text-white mb-4 uppercase tracking-wider">Pure Ingredients</h3>
                        <p className="text-white/60 font-medium leading-relaxed">
                            Real butter, fresh cream, and premium Belgian chocolate. We never compromise on the quality of our raw materials.
                        </p>
                    </div>
                </div>
            </section>

            {/* Decorative Divider */}
            <div className="h-24 bg-[url('/images/wave.svg')] bg-repeat-x bg-contain opacity-5 invert"></div>


        </main>
    )
}
