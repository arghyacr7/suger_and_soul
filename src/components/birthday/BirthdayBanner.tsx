"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Gift, MessageCircle } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"

const WHATSAPP_NUMBER = "919163049775"

export function BirthdayBanner() {
    const { user, isBirthday } = useAuth()
    const [isDismissed, setIsDismissed] = useState(false)

    useEffect(() => {
        // Check if banner was dismissed today
        const dismissedDate = localStorage.getItem("birthdayBannerDismissed")
        const today = new Date().toDateString()
        if (dismissedDate === today) {
            setIsDismissed(true)
        } else if (dismissedDate && dismissedDate !== today) {
            // Clear old dismissal
            localStorage.removeItem("birthdayBannerDismissed")
        }
    }, [])

    const handleDismiss = () => {
        setIsDismissed(true)
        localStorage.setItem("birthdayBannerDismissed", new Date().toDateString())
    }

    const handleWhatsApp = () => {
        const userName = user?.user_metadata?.full_name || "User"
        const message = `Hi Sugar & Soul,\n\nToday is my birthday 🎉\nI'd love to order a birthday cake.\n\nThank you!\n- ${userName}`
        const encodedMessage = encodeURIComponent(message)
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
        window.open(whatsappUrl, "_blank")
    }

    if (!isBirthday || !user || isDismissed) return null

    const firstName = user.user_metadata?.full_name?.split(" ")[0] || "Friend"

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-20 left-0 right-0 z-40 px-4 md:px-6"
            >
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-gradient-to-r from-yellow via-pink to-purple rounded-2xl shadow-2xl p-6 md:p-8 border-4 border-white/50">
                        {/* Confetti Effect */}
                        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: -20, opacity: 1 }}
                                    animate={{
                                        y: [0, 100],
                                        x: [0, (Math.random() - 0.5) * 100],
                                        opacity: [1, 0],
                                        rotate: [0, 360]
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 2
                                    }}
                                    className="absolute text-2xl"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: -20
                                    }}
                                >
                                    {["🎉", "🎂", "🎈", "✨", "🎁"][Math.floor(Math.random() * 5)]}
                                </motion.div>
                            ))}
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-3 right-3 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors z-10"
                            aria-label="Dismiss"
                        >
                            <X size={20} className="text-white" />
                        </button>

                        {/* Content */}
                        <div className="relative z-10 text-center">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-5xl md:text-6xl mb-4"
                            >
                                🎂
                            </motion.div>

                            <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-2 drop-shadow-lg">
                                Happy Birthday, {firstName}! 🎉
                            </h2>

                            <p className="text-white/90 text-base md:text-lg mb-6 font-bold drop-shadow-md">
                                Sugar & Soul wishes you a wonderful day!<br className="hidden md:block" />
                                Celebrate with something sweet 🍰
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                                <Button
                                    onClick={handleWhatsApp}
                                    className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all"
                                >
                                    <Gift size={20} />
                                    Claim Birthday Surprise
                                    <MessageCircle size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
