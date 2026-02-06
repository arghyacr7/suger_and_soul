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
        <div className="min-h-screen bg-cream py-8 px-4 md:px-6">
            <div className="container mx-auto max-w-2xl">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-brown/60 hover:text-brown mb-8 font-bold uppercase text-xs tracking-wider transition-colors">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="font-heading text-4xl py-2 md:text-5xl text-brown mb-3">Custom Cake Enquiry</h1>
                    <p className="text-brown/70 text-lg">Dreaming of a unique cake? Tell us about it!</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border-4 border-white">
                    <div className="space-y-6">
                        {/* Occasion */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-brown uppercase tracking-wide">Occasion</label>
                            <input
                                type="text"
                                placeholder="Birthday, Anniversary, Wedding..."
                                value={occasion}
                                onChange={(e) => setOccasion(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/10 outline-none transition-all placeholder:text-gray-400 text-brown"
                            />
                        </div>

                        {/* Theme */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-brown uppercase tracking-wide">Theme / Design</label>
                            <input
                                type="text"
                                placeholder="Marvel, Unicorn, Floral..."
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/10 outline-none transition-all placeholder:text-gray-400 text-brown"
                            />
                        </div>

                        {/* Weight */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-brown uppercase tracking-wide">Estimated Weight (kg)</label>
                            <select
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/10 outline-none transition-all text-brown appearance-none"
                            >
                                <option value="1 kg">1 kg</option>
                                <option value="2 kg">2 kg</option>
                                <option value="3 kg">3 kg</option>
                                <option value="4 kg">4 kg</option>
                                <option value="5 kg">5 kg</option>
                            </select>
                            <p className="text-[10px] text-brown/60 italic">*Currently accepting custom cake orders from 1 kg up to 5 kg only.</p>
                        </div>

                        {/* Date */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-brown uppercase tracking-wide">Date Required</label>
                            <input
                                type="date"
                                min={today}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/10 outline-none transition-all text-brown"
                            />
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-brown uppercase tracking-wide">Message on Cake</label>
                            <input
                                type="text"
                                placeholder="Happy Birthday Alex!"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/10 outline-none transition-all placeholder:text-gray-400 text-brown"
                            />
                        </div>

                        {/* Action */}
                        <div className="pt-4">
                            <Button
                                onClick={handleEnquire}
                                className="w-full h-14 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-0.5 border-none"
                            >
                                <Send size={20} className="mr-2" /> Enquire on WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
