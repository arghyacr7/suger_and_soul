import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
    {
        id: "cakes",
        name: "Key Cakes",
        description: "Celebration cakes designed to make every occasion memorable.",
        image: "/images/category-cakes.jpg", // Placeholder
        color: "bg-[#FFD23F]", // Yellow
        href: "/cakes"
    },
    {
        id: "cream-cakes",
        name: "Cream Cakes",
        description: "Soft, luscious, and creamy delights that melt in every bite.",
        image: "/images/category-cream.jpg", // Placeholder
        color: "bg-[#FF8FAB]", // Pink
        href: "/cream-cakes"
    },
    {
        id: "brownies",
        name: "Brownies",
        description: "Fudgy, rich, and absolutely divine brownies baked to perfection.",
        image: "/images/category-brownies.jpg", // Placeholder
        color: "bg-[#A0C4FF]", // Blue
        href: "/brownies"
    }
]

export function CategoryCards() {
    return (
        <section className="py-0 container mx-auto px-6 md:px-8">
            <div className="text-center mb-12 md:mb-20">
                <h2 className="font-heading text-3xl md:text-5xl font-bold text-brown mb-4 uppercase drop-shadow-sm tracking-widest">Our Collections</h2>
                <p className="text-brown/60 max-w-2xl mx-auto text-sm md:text-base tracking-widest uppercase">Handcrafted. Exclusive. Divine.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={cat.href}
                        className="group relative overflow-hidden rounded-[2rem] h-96 transition-all duration-500 hover:-translate-y-2 border border-white/10 hover:border-purple-500/50 bg-[#0A0A0A] block shadow-[0_10px_30px_rgba(168,85,247,0.15)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.3)]"
                    >
                        {/* Subtle Color Overlay on Hover */}
                        <div className={`absolute inset-0 ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

                        <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
                            <div>
                                <h3 className="font-heading text-3xl font-bold text-brown mb-3 uppercase tracking-widest drop-shadow-sm group-hover:text-yellow transition-colors">{cat.name}</h3>
                                <p className="text-brown/60 font-light text-sm leading-relaxed tracking-wide uppercase max-w-[90%]">{cat.description}</p>
                            </div>

                            <div className="inline-flex self-start items-center gap-3 border border-brown/30 px-6 py-3 rounded-full text-brown font-bold uppercase text-xs tracking-[0.2em] group-hover:bg-yellow group-hover:text-black group-hover:border-yellow transition-all duration-500">
                                See All <ArrowRight size={16} strokeWidth={2} />
                            </div>
                        </div>

                        {/* Decorative Circle */}
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-yellow/5 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
                    </Link>
                ))}
            </div>
        </section>
    )
}
