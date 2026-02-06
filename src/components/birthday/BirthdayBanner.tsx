"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Gift } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"

const WHATSAPP_NUMBER = "919836733874"

export function BirthdayBanner() {
    const { user } = useAuth()

    const [mounted, setMounted] = useState(false)
    const [dob, setDob] = useState<string | null>(null)
    const [showBanner, setShowBanner] = useState(false)
    const [isDismissed, setIsDismissed] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // ✅ Fetch DOB from profiles table (PRODUCTION SAFE)
    useEffect(() => {
        if (!mounted || !user) return

        const fetchDOB = async () => {
            const { data } = await supabase
                .from("profiles")
                .select("dob")
                .eq("user_id", user.id)
                .single()

            if (data?.dob) setDob(data.dob)
        }

        fetchDOB()
    }, [mounted, user])

    // ✅ Birthday check AFTER DOB is fetched
    useEffect(() => {
        if (!dob) return

        const today = new Date()
        const dobDate = new Date(dob)

        const isBirthday =
            today.getDate() === dobDate.getDate() &&
            today.getMonth() === dobDate.getMonth()

        setShowBanner(isBirthday)
    }, [dob])

    // ✅ Dismiss logic
    useEffect(() => {
        const dismissedDate = localStorage.getItem("birthdayBannerDismissed_v2")
        const today = new Date().toDateString()

        if (dismissedDate === today) setIsDismissed(true)
    }, [])

    const handleDismiss = () => {
        setIsDismissed(true)
        localStorage.setItem(
            "birthdayBannerDismissed_v2",
            new Date().toDateString()
        )
    }

    const handleWhatsApp = () => {
        const firstName =
            user?.user_metadata?.full_name?.split(" ")[0] || "Friend"

        const message = `Hi ${firstName},

The Sugar & Soul family wishes you a very Happy Birthday.

If you'd like to celebrate with a cake, we’d be happy to offer you a 5% birthday discount.

Warm wishes,
Sugar & Soul`

        window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
            "_blank"
        )
    }

    if (!mounted || !user || !showBanner || isDismissed) return null

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.6 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-6 rounded-3xl max-w-lg w-full text-center border-4 border-white/50"
                >
                    <button
                        onClick={handleDismiss}
                        className="absolute top-3 right-3 text-white"
                    >
                        <X />
                    </button>

                    <div className="text-6xl mb-4">🎂</div>
                    <h2 className="text-3xl font-bold text-white mb-3">
                        Happy Birthday!
                    </h2>

                    <Button
                        onClick={handleWhatsApp}
                        className="bg-[#25D366] w-full mt-4 text-white font-bold py-4 rounded-xl"
                    >
                        <Gift className="mr-2" /> Claim Birthday Surprise
                    </Button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
