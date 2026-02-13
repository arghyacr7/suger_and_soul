"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { ProfileModal } from "@/components/profile/ProfileModal"

export function Hero() {
    const { user, greeting, loading } = useAuth()
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    return (
        <section className="relative min-h-[60vh] md:min-h-[75vh] w-full flex items-center justify-center overflow-visible pt-24 pb-8 md:py-20">
            {/* Background Graphic/Image Placeholder - CSS Pattern */}
            <div className="absolute inset-0 bg-yellow/5" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4A3B32_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto backdrop-blur-sm bg-cream/30 dark:bg-black/10 rounded-[3rem] p-6 md:p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/20">

                {/* User Greeting */}
                {user && !loading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="mb-4 md:mb-6"
                    >
                        <div
                            onClick={() => setIsProfileOpen(true)}
                            className="inline-block bg-gradient-to-r from-yellow/30 via-pink/30 to-purple/30 px-6 py-3 rounded-full border-2 border-brown/20 shadow-lg backdrop-blur-md cursor-pointer hover:scale-105 transition-transform active:scale-95"
                        >
                            <span className="text-base md:text-xl font-bold text-brown drop-shadow-md">
                                {greeting}, {user.user_metadata.full_name?.split(" ")[0] || "User"}! 🎂
                            </span>
                        </div>
                    </motion.div>
                )}

                <h1 className="font-script text-3xl md:text-7xl text-white mb-3 md:mb-6 leading-tight animate-[slide-up_1s_ease-out] drop-shadow-xl tracking-wider text-center flex flex-col items-center justify-center gap-2">
                    <span className="text-outline-white text-[#FF80AB] drop-shadow-[5px_5px_0px_#3E2723]">Baked with Love</span>
                    <span className="text-3xl md:text-4xl text-yellow font-heading opacity-80">&</span>
                    <span className="text-outline-white text-[#FFD23F] drop-shadow-[5px_5px_0px_#3E2723]">Served with Soul</span>
                </h1>

                <p className="text-base md:text-xl text-brown mb-4 md:mb-8 font-bold max-w-xl mx-auto drop-shadow-md leading-relaxed">
                    Premium Cakes, Cream Cakes & Brownies.<br />
                    Freshly baked to order from our cloud kitchen in <span className="text-purple bg-white px-2 rounded-md transform -skew-x-12 inline-block border-2 border-black">Dankuni</span>.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center animate-[slide-up_1.4s_ease-out] relative z-20">
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

            {/* Profile Modal */}
            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
            />
        </section>
    )
}
