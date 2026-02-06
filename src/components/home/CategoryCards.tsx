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
        <section className="py-20 container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-brown mb-4 uppercase drop-shadow-sm">Our Sweet Collections</h2>
                <p className="text-brown/60 max-w-2xl mx-auto">Discover our range of handcrafted treats, baked fresh every day.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={cat.href}
                        className="group relative overflow-hidden rounded-[2rem] h-80 transition-all hover:-translate-y-2 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                        <div className={`absolute inset-0 ${cat.color} opacity-100`} />

                        <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                            <div>
                                <h3 className="font-heading text-4xl font-bold text-brown mb-2 uppercase drop-shadow-sm">{cat.name}</h3>
                                <p className="text-brown font-bold text-lg leading-tight opacity-90">{cat.description}</p>
                            </div>

                            <div className="inline-flex self-start items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-full text-brown font-bold uppercase text-sm group-hover:gap-4 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                See All <ArrowRight size={18} strokeWidth={3} />
                            </div>
                        </div>

                        {/* Decorative Circle */}
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                    </Link>
                ))}
            </div>
        </section>
    )
}
