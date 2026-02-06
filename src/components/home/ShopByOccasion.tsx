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
        <section className="py-16 container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="font-heading text-4xl text-brown mb-4 uppercase drop-shadow-sm">Shop by Occasion</h2>
                <p className="text-brown/70 font-bold max-w-2xl mx-auto">Find the perfect cake for your special moment.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {occasions.map((occ) => (
                    <a
                        key={occ.name}
                        href={buildWhatsAppLink(occ.message + `\n\n(Note: Delivery available within 1 km radius only)`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Order for ${occ.name}`}
                        className={`group flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-white relative overflow-hidden cursor-pointer`}
                    >
                        <div className={`absolute top-0 left-0 w-full h-2 ${occ.color}`} />
                        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                            {occ.icon}
                        </div>
                        <h3 className="font-heading text-xl text-brown uppercase">{occ.name}</h3>
                    </a>
                ))}
            </div>
        </section>
    )
}
