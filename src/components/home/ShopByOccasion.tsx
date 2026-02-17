"use client"

import { Gift, Heart, Baby, PartyPopper } from "lucide-react"
import { buildWhatsAppLink } from "@/lib/whatsapp"

const occasions = [
    {
        name: "Birthdays",
        icon: <Gift size={48} className="text-purple" />,
        color: "bg-[#FFD23F]", // Yellow
        message: `Hi Sugar & Soul,

I am looking for a cake for a Birthday.
Please suggest available cakes and prices.

Thank you.`
    },
    {
        name: "Anniversaries",
        icon: <Heart size={48} className="text-red-500" />,
        color: "bg-[#FF8FAB]", // Pink
        message: `Hi Sugar & Soul,

I would like to order a cake for an Anniversary.
Please share your best options.

Thank you.`
    },
    {
        name: "Kids Special",
        icon: <Baby size={48} className="text-blue-500" />,
        color: "bg-[#A0C4FF]", // Blue
        message: `Hi Sugar & Soul,

I am looking for a Kids Special cake.
Please guide me with available designs and flavors.

Thank you.`
    },
    {
        name: "Celebrations",
        icon: <PartyPopper size={48} className="text-green-500" />,
        color: "bg-[#9BF6FF]", // Cyan
        message: `Hi Sugar & Soul,

I would like to order a cake for a celebration.
Please let me know the available options.

Thank you.`
    },
]

export function ShopByOccasion() {
    return (
        <section className="relative py-8 md:py-16 container mx-auto px-4 md:px-6">
            {/* Top Gradient Fade */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050505] to-transparent z-0 pointer-events-none" />

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent z-0 pointer-events-none" />

            <div className="relative z-20 text-center mb-6 md:mb-12">
                <h2 className="font-heading text-4xl text-brown mb-4 uppercase drop-shadow-sm tracking-widest">Shop by Occasion</h2>
                <p className="text-brown/60 uppercase tracking-widest text-sm max-w-2xl mx-auto">Find the perfect cake for your special moment.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {occasions.map((occ) => (
                    <a
                        key={occ.name}
                        href={buildWhatsAppLink(occ.message + `\n\n(Note: Delivery available within 1 km radius only)`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Order for ${occ.name}`}
                        className={`group flex flex-col items-center justify-center p-4 md:p-8 rounded-none border border-white/10 hover:border-yellow shadow-none hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all bg-[#0A0A0A] relative overflow-hidden cursor-pointer duration-500`}
                    >
                        <div className={`absolute top-0 left-0 w-full h-[1px] ${occ.color} opacity-50`} />
                        <div className="mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100">
                            {occ.icon}
                        </div>
                        <h3 className="font-heading text-xs md:text-lg text-brown uppercase tracking-wider md:tracking-widest group-hover:text-yellow transition-colors break-words text-center">{occ.name}</h3>
                    </a>
                ))}
            </div>
        </section>
    )
}
