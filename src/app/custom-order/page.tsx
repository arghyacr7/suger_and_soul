"use client"

import { useState } from "react"
import { ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { buildWhatsAppLink } from "@/lib/whatsapp"

export default function CustomOrderPage() {
    const [occasion, setOccasion] = useState("")
    const [theme, setTheme] = useState("")
    const [weight, setWeight] = useState("1 kg")
    const [date, setDate] = useState("")
    const [message, setMessage] = useState("")

    const handleEnquire = () => {
        const whatsappMessage = `Hi Sugar & Soul,\n\nI would like to enquire about a custom cake.\n\nOccasion: ${occasion || "Not Specified"}\nTheme / Design: ${theme || "Not Specified"}\nEstimated Weight: ${weight}\nDate Required: ${date || "Not Specified"}\nMessage on Cake: ${message || "None"}\n\nPlease guide me further.\nThank you.`

        const link = buildWhatsAppLink(whatsappMessage)
        window.open(link, "_blank")
    }

    // Basic date validation (disable past dates)
    const today = new Date().toISOString().split("T")[0]

    return (
        <div className="min-h-screen bg-[#050505] py-20 px-4 md:px-6">
            <div className="container mx-auto max-w-3xl">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-yellow mb-10 font-bold uppercase text-xs tracking-[0.2em] transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-6xl text-white mb-4 tracking-wider">Custom <span className="text-yellow">Creations</span></h1>
                    <p className="text-white/60 text-lg font-light tracking-wide max-w-xl mx-auto">
                        Your imagination, our craftsmanship. Design a masterpiece for your special moment.
                    </p>
                </div>

                {/* Form */}
                <div className="bg-[#0A0A0A] rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="space-y-8 relative z-10">
                        {/* Occasion */}
                        <div className="group relative">
                            <label className="block text-[10px] font-bold text-yellow uppercase tracking-[0.2em] mb-2">Occasion</label>
                            <input
                                type="text"
                                placeholder="Birthday, Anniversary, Wedding..."
                                value={occasion}
                                onChange={(e) => setOccasion(e.target.value)}
                                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-yellow outline-none transition-all placeholder:text-white/20 text-white font-light tracking-wide rounded-none"
                            />
                        </div>

                        {/* Theme */}
                        <div className="group relative">
                            <label className="block text-[10px] font-bold text-yellow uppercase tracking-[0.2em] mb-2">Theme / Design</label>
                            <input
                                type="text"
                                placeholder="Marvel, Unicorn, Floral, Minimalist..."
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-yellow outline-none transition-all placeholder:text-white/20 text-white font-light tracking-wide rounded-none"
                            />
                        </div>

                        {/* Weight */}
                        <div className="group relative">
                            <label className="block text-[10px] font-bold text-yellow uppercase tracking-[0.2em] mb-2">Estimated Weight</label>
                            <div className="relative">
                                <select
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-yellow outline-none transition-all text-white font-light tracking-wide rounded-none appearance-none cursor-pointer"
                                >
                                    <option className="bg-[#111] text-white" value="1 kg">1 kg</option>
                                    <option className="bg-[#111] text-white" value="2 kg">2 kg</option>
                                    <option className="bg-[#111] text-white" value="3 kg">3 kg</option>
                                    <option className="bg-[#111] text-white" value="4 kg">4 kg</option>
                                    <option className="bg-[#111] text-white" value="5 kg">5 kg</option>
                                </select>
                                <p className="text-[10px] text-white/40 italic mt-2">*Currently accepting custom cake orders from 1 kg up to 5 kg only.</p>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="group relative">
                            <label className="block text-[10px] font-bold text-yellow uppercase tracking-[0.2em] mb-2">Date Required</label>
                            <input
                                type="date"
                                min={today}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-yellow outline-none transition-all text-white font-light tracking-wide rounded-none [color-scheme:dark]"
                            />
                        </div>

                        {/* Message */}
                        <div className="group relative">
                            <label className="block text-[10px] font-bold text-yellow uppercase tracking-[0.2em] mb-2">Message on Cake</label>
                            <input
                                type="text"
                                placeholder="Happy Birthday..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-yellow outline-none transition-all placeholder:text-white/20 text-white font-light tracking-wide rounded-none"
                            />
                        </div>

                        {/* Action */}
                        <div className="pt-8">
                            <Button
                                onClick={handleEnquire}
                                variant="gradient"
                                className="w-full h-14 text-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 font-bold uppercase tracking-[0.2em] hover:brightness-110 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(236,72,153,0.3)] rounded-xl"
                            >
                                <Send size={16} className="mr-3" /> Enquire on WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
