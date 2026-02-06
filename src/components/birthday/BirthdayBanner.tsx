"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Gift } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"

const WHATSAPP_NUMBER = "919836733874"

export function BirthdayBanner() {
    const { user } = useAuth()

    const [mounted, setMounted] = useState(false)
    const [showBanner, setShowBanner] = useState(false)
    const [isDismissed, setIsDismissed] = useState(false)

    // ✅ Ensure client-side rendering only
    useEffect(() => {
        setMounted(true)
    }, [])

    // ✅ Check birthday AFTER user + hydration (PRODUCTION SAFE)
    useEffect(() => {
        if (!mounted || !user) return

        const dob = user.user_metadata?.dob
        if (!dob) return

        const today = new Date()
        const dobDate = new Date(dob)

        const isBirthdayToday =
            today.getDate() === dobDate.getDate() &&
            today.getMonth() === dobDate.getMonth()

        setShowBanner(isBirthdayToday)
    }, [mounted, user])

    // ✅ Handle dismissal (once per day)
    useEffect(() => {
        if (!mounted) return

        const dismissedDate = localStorage.getItem("birthdayBannerDismissed_v2")
        const today = new Date().toDateString()

        if (dismissedDate === today) {
            setIsDismissed(true)
        } else {
            localStorage.removeItem("birthdayBannerDismissed_v2")
        }
    }, [mounted])

    const handleDismiss = () => {
        setIsDismissed(true)
        localStorage.setItem(
            "birthdayBannerDismissed_v2",
            new Date().toDateString()
        )
    }

    const handleWhatsApp = () => {
        const userName =
            user?.user_metadata?.full_name?.split(" ")[0] || "Friend"

        const message = `Hi ${userName},

The Sugar & Soul family wishes you a very Happy Birthday.

We hope your day is filled with joy and sweetness.
If you'd like to celebrate with a cake, we’d be happy to offer you a 5% birthday discount on your order.

Warm wishes,
Sugar & Soul`

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            message
        )}`

        window.open(whatsappUrl, "_blank")
    }

    // ❌ Do not render until everything is ready
    if (!mounted || !user || !showBanner || isDismissed) return null

    const firstName =
        user.user_metadata?.full_name?.split(" ")[0] || "Friend"

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ type: "spring", damping: 18, stiffness: 250 }}
                    className="w-full max-w-lg mx-auto"
                >
                    <div className="relative bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-3xl shadow-2xl p-6 md:p-8 border-4 border-white/50 overflow-hidden">

                        {/* Close Button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-3 right-3 p-2 rounded-full bg-white/30 hover:bg-white/50 transition"
                            aria-label="Close"
                        >
                            <X size={20} className="text-white" />
                        </button>

                        {/* Content */}
                        <div className="text-center relative z-10">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-6xl mb-4"
                            >
                                🎂
                            </motion.div>

                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow">
                                Happy Birthday, {firstName}!
                            </h2>

                            <p className="text-white/90 text-lg mb-8 leading-relaxed">
                                Wishing you a wonderful day filled with happiness and sweetness.
                            </p>

                            <div className="flex flex-col gap-3 items-center">
                                <Button
                                    onClick={handleWhatsApp}
                                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-4 rounded-xl shadow-lg transition-transform hover:scale-105"
                                >
                                    <Gift size={22} />
                                    Claim Birthday Surprise
                                </Button>

                                <button
                                    onClick={handleDismiss}
                                    className="text-white/80 text-sm underline hover:text-white"
                                >
                                    No thanks, maybe later
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
