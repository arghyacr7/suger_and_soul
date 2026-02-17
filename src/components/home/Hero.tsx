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
        <section className="relative h-auto w-full flex items-center justify-center overflow-hidden pt-12 md:pt-20 pb-0">
            {/* Cinematic Background Image with Slow Zoom */}
            <div
                className="absolute inset-0 bg-cover bg-center animate-slowZoom"
                style={{
                    backgroundImage: "url('/images/plain%20cake/Rich_Chocolate_Sponge.jpg')",
                    filter: "brightness(0.6)"
                }}
            />

            {/* Dark Overlay with Blur */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black backdrop-blur-[2px]" />

            {/* Bottom Gradient Fade (Behind Content) */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent z-0 pointer-events-none" />

            {/* Content - Dark Luxury Card (Transparent) */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-6 px-6 pb-0 md:pt-14 md:px-14 md:pb-0 animate-[fade-in_1s_ease-out] w-[95%] md:w-full">

                {/* User Greeting */}
                {user && !loading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="mb-4 md:mb-8 w-full flex justify-center"
                    >
                        <div
                            onClick={() => setIsProfileOpen(true)}
                            className="inline-block bg-[#050505] px-6 md:px-10 py-2.5 rounded-full border border-white/10 hover:border-yellow/50 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95 min-w-[200px] max-w-full whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                            <span className="text-sm md:text-xl font-bold text-white drop-shadow-lg font-waffle-mango tracking-wide truncate">
                                {greeting}, <span className="text-yellow capitalize">{user.user_metadata.full_name?.split(" ")[0].toLowerCase() || "User"}</span> 🎂
                            </span>
                        </div>
                    </motion.div>
                )}

                {/* Animated Gradient Badge */}
                <div className="relative group inline-block mb-6 max-w-full">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <span className="relative font-bold uppercase tracking-widest md:tracking-[0.3em] text-[10px] md:text-sm bg-[#0A0A0A] text-yellow px-4 py-2 border border-yellow/20 rounded-full inline-block backdrop-blur-xl whitespace-nowrap">
                        Dankuni, West Bengal
                    </span>
                </div>

                <h1 className="font-branding text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight text-white normal-case tracking-normal font-bold flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                    <span className="text-white">Sugar</span>
                    <span className="text-[0.6em] text-yellow">&</span>
                    <span className="text-white">Soul</span>
                </h1>

                <p className="font-sans text-lg md:text-xl text-white/90 max-w-lg mx-auto mb-8 leading-relaxed font-light tracking-wide text-shadow">
                    Handcrafted Home Bakery
                    <span className="block text-sm mt-2 text-white/70">Handcrafted Cakes • Brownies • Desserts</span>
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <Link href="https://wa.me/919836733874" target="_blank" rel="noopener noreferrer">
                        <Button
                            variant="gradient"
                            size="lg"
                            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 font-bold uppercase tracking-widest hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.3)] rounded-xl"
                        >
                            Order on WhatsApp
                        </Button>
                    </Link>
                    <Link href="#menu">
                        <Button variant="secondary" size="lg" className="text-sm md:text-base bg-transparent text-yellow border border-yellow hover:bg-yellow hover:text-black rounded-xl uppercase tracking-[0.2em] font-bold backdrop-blur-sm px-8 py-6">
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
