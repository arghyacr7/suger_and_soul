"use client"

import { CheckCircle, Clock, Heart } from "lucide-react"

export function WhySugarAndSoul() {
    return (
        <section className="py-16 bg-white border-y-2 border-brown/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-3xl md:text-4xl text-brown mb-2 uppercase">Why Sugar & Soul?</h2>
                    <p className="text-brown/60 font-medium">The secret ingredients behind our goodness.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-cream rounded-2xl p-6 border-2 border-brown/10 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="bg-yellow w-12 h-12 rounded-full flex items-center justify-center text-brown mb-4 border-2 border-black">
                            <Heart size={24} fill="currentColor" />
                        </div>
                        <h3 className="font-heading text-xl text-brown mb-2">Made with Love</h3>
                        <p className="text-brown/70 text-sm leading-relaxed">
                            Handcrafted in small batches with premium ingredients and a whole lot of soul.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-cream rounded-2xl p-6 border-2 border-brown/10 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="bg-purple w-12 h-12 rounded-full flex items-center justify-center text-white mb-4 border-2 border-black">
                            <CheckCircle size={24} />
                        </div>
                        <h3 className="font-heading text-xl text-brown mb-2">Hygiene Promise</h3>
                        <p className="text-brown/70 text-sm leading-relaxed">
                            Strict hygiene protocols in our cloud kitchen. Safety and freshness guaranteed.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-cream rounded-2xl p-6 border-2 border-brown/10 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="bg-pink w-12 h-12 rounded-full flex items-center justify-center text-brown mb-4 border-2 border-black">
                            <Clock size={24} />
                        </div>
                        <h3 className="font-heading text-xl text-brown mb-2">Freshly Baked</h3>
                        <p className="text-brown/70 text-sm leading-relaxed">
                            We bake only after you order. Experience the magic of oven-fresh delights.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
