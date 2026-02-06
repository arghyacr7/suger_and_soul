"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Gift, MessageCircle } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"

const WHATSAPP_NUMBER = "919836733874"

export function BirthdayBanner() {
    const { user, isBirthday } = useAuth()
    const [isDismissed, setIsDismissed] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Ensure client-side only rendering
    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        // Debug logs
        if (mounted) {
            console.log('🎉 BirthdayBanner - State Update:', {
                isBirthday,
                hasUser: !!user,
                dob: user?.user_metadata?.dob
            })
        }

        // Check if banner was dismissed today
        if (typeof window !== 'undefined') {
            const dismissedDate = localStorage.getItem("birthdayBannerDismissed")
            const today = new Date().toDateString()

            if (dismissedDate === today) {
                setIsDismissed(true)
            } else if (dismissedDate && dismissedDate !== today) {
                // Clear old dismissal
                localStorage.removeItem("birthdayBannerDismissed")
            }
        }
    }, [isBirthday, user, mounted])

    const handleDismiss = () => {
        setIsDismissed(true)
        if (typeof window !== 'undefined') {
            localStorage.setItem("birthdayBannerDismissed", new Date().toDateString())
        }
    }

    const handleWhatsApp = () => {
        const userName = user?.user_metadata?.full_name || "User"
        const message = `Hi ${userName},\n\nThe Sugar & Soul family wishes you a very Happy Birthday 🎉\n\nWe hope your day is filled with joy and sweetness.\nIf you'd like to celebrate with a cake, we'd be happy to offer you a 5% birthday discount on your order.\n\nPlease feel free to reach out anytime.\nWarm wishes,\nSugar & Soul`
        const encodedMessage = encodeURIComponent(message)
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
        window.open(whatsappUrl, "_blank")
    }

    // Don't render until client-side hydration is complete
    // TEMPORARY DEBUG: Show debug info if user exists, regardless of birthday
    if (!mounted) return null
    if (!user) return null

    const firstName = user.user_metadata?.full_name?.split(" ")[0] || "Friend"
    const today = new Date()

    return (
        <>
            {/* DEBUG OVERLAY - VISIBLE UNTIL FIXED */}
            <div className="fixed bottom-20 left-4 z-[9999] bg-black/80 text-white p-4 rounded-xl text-xs font-mono border border-yellow pointer-events-none">
                <p className="font-bold text-yellow border-b border-white/20 mb-2 pb-1">MOBILE DEBUGGER</p>
                <p>User: {user ? '✅' : '❌'}</p>
                <p>IsBirthday: {isBirthday ? '✅ TRUE' : '❌ FALSE'}</p>
                <p>DOB: {user.user_metadata?.dob || 'None'}</p>
                <p>Today: {today.getDate()}/{today.getMonth() + 1}</p>
                <p>Dismissed: {isDismissed ? 'Yes' : 'No'}</p>
            </div>

            {(isBirthday && !isDismissed) && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-6 bg-black/60 backdrop-blur-sm"
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="w-full max-w-lg mx-auto relative"
                        >
                            <div className="relative bg-gradient-to-r from-yellow via-pink to-purple rounded-3xl shadow-2xl p-6 md:p-8 border-4 border-white/50 overflow-hidden">
                                {/* Confetti Effect */}
                                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ y: -20, opacity: 1 }}
                                            animate={{
                                                y: [0, 400],
                                                x: [0, (Math.random() - 0.5) * 200],
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
                                    className="absolute top-3 right-3 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors z-20"
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
                                        className="text-6xl md:text-7xl mb-4"
                                    >
                                        🎂
                                    </motion.div>

                                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 drop-shadow-lg">
                                        Happy Birthday, {firstName}! 🎉
                                    </h2>

                                    <p className="text-white/90 text-lg md:text-xl mb-8 font-bold drop-shadow-md leading-relaxed">
                                        Sugar & Soul wishes you a wonderful day!<br />
                                        Celebrate with something sweet 🍰
                                    </p>

                                    {/* CTA Buttons */}
                                    <div className="flex flex-col gap-3 justify-center items-center">
                                        <Button
                                            onClick={handleWhatsApp}
                                            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-6 py-4 rounded-xl shadow-lg hover:scale-105 transition-all text-lg"
                                        >
                                            <Gift size={24} />
                                            Claim Birthday Surprise
                                        </Button>
                                        <button
                                            onClick={handleDismiss}
                                            className="text-white/80 text-sm font-semibold hover:text-white underline decoration-white/50 underline-offset-4"
                                        >
                                            No thanks, maybe later
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
            )}
                </>
            )
            }
