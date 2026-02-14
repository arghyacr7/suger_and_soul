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
        <section className="relative min-h-[85dvh] md:min-h-[55vh] w-full flex items-center justify-center overflow-hidden pt-[52px] pb-16 md:pt-16 md:pb-12">
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

            {/* Content - Dark Luxury Card */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto backdrop-blur-md bg-[#0A0A0A]/40 rounded-[3rem] p-6 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 animate-[fade-in_1s_ease-out] w-[95%] md:w-full">

                {/* User Greeting */}
                {user && !loading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="mb-4 md:mb-8"
                    >
                        <div
                            onClick={() => setIsProfileOpen(true)}
                            className="inline-block bg-white/5 backdrop-blur-xl px-8 py-4 rounded-full border-2 border-white/10 hover:border-yellow/50 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95"
                        >
                            <span className="text-base md:text-xl font-bold text-white drop-shadow-lg">
                                {greeting}, <span className="text-yellow">{user.user_metadata.full_name?.split(" ")[0] || "User"}</span>! 🎂
                            </span>
                        </div>
                    </motion.div>
                )}

                {/* Animated Gradient Badge */}
                <div className="relative group inline-block mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <span className="relative font-bold uppercase tracking-[0.3em] text-xs md:text-sm bg-[#0A0A0A] text-yellow px-4 py-2 border border-yellow/20 rounded-full inline-block backdrop-blur-xl">
                        Dankuni, West Bengal
                    </span>
                </div>

                <h1 className="font-heading text-5xl md:text-7xl mb-6 leading-tight text-white drop-shadow-2xl">
                    <span className="block text-white">Sugar</span>
                    <span className="block text-[0.5em] md:text-[0.6em] font-script text-yellow my-2 md:my-4">&</span>
                    <span className="block text-white">Soul</span>
                </h1>

                <p className="font-sans text-lg md:text-xl text-white/90 max-w-lg mx-auto mb-8 leading-relaxed font-light tracking-wide text-shadow">
                    Premium Cloud Kitchen
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
