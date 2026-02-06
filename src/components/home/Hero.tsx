import Link from "next/link"
import { Button } from "@/components/ui/Button"

export function Hero() {
    return (
        <section className="relative min-h-[75vh] w-full flex items-center justify-center overflow-visible py-12 md:py-20">
            {/* Background Graphic/Image Placeholder - CSS Pattern */}
            <div className="absolute inset-0 bg-yellow/5" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4A3B32_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto backdrop-blur-sm bg-cream/30 dark:bg-black/10 rounded-[3rem] p-6 md:p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/20">

                <h1 className="font-script text-4xl md:text-7xl text-white mb-6 leading-tight animate-[slide-up_1s_ease-out] drop-shadow-xl tracking-wider text-center flex flex-col items-center justify-center gap-2">
                    <span className="text-outline-white text-[#FF80AB] drop-shadow-[5px_5px_0px_#3E2723]">Baked with Love</span>
                    <span className="text-3xl md:text-4xl text-yellow font-heading opacity-80">&</span>
                    <span className="text-outline-white text-[#FFD23F] drop-shadow-[5px_5px_0px_#3E2723]">Served with Soul</span>
                </h1>

                <p className="text-lg md:text-xl text-brown mb-8 font-bold max-w-xl mx-auto drop-shadow-md leading-relaxed">
                    Premium Cakes, Cream Cakes & Brownies.<br />
                    Freshly baked to order from our cloud kitchen in <span className="text-purple bg-white px-2 rounded-md transform -skew-x-12 inline-block border-2 border-black">Dankuni</span>.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[slide-up_1.4s_ease-out] relative z-20">
                    <div className="animate-[float_3s_infinite_ease-in-out]">
                        <Link href="#menu">
                            <Button variant="primary" size="lg" className="text-lg bg-[#25D366] hover:bg-[#128C7E] text-white border-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                                Order on WhatsApp
                            </Button>
                        </Link>
                    </div>
                    <Link href="#menu">
                        <Button variant="secondary" size="lg" className="text-lg bg-white text-brown hover:bg-cream">
                            View Menu
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
