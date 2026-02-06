"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { generateWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/whatsapp"
import { ArrowLeft, Calendar, Cake, Weight } from "lucide-react"
import Link from "next/link"

export default function CustomOrderPage() {
    const [formData, setFormData] = useState({
        occasion: "",
        theme: "",
        weight: "1",
        date: "",
        message: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Construct WhatsApp Message
        const text = `
*New Custom Cake Enquiry* 🎂

*Occasion:* ${formData.occasion}
*Theme/Design:* ${formData.theme}
*Weight:* ${formData.weight} kg
*Date Required:* ${formData.date}
*Message on Cake:* ${formData.message || "None"}

Please let me know the price and availability.
    `.trim()

        const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
        window.open(link, "_blank")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="min-h-screen bg-cream py-12 px-4">
            <div className="container mx-auto max-w-2xl">
                <Link href="/" className="inline-flex items-center text-brown mb-8 hover:text-purple font-bold transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Home
                </Link>

                <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-brown">
                    <div className="text-center mb-8">
                        <h1 className="font-display text-4xl text-brown mb-2 uppercase">Custom Cake Enquiry</h1>
                        <p className="text-brown/70 font-bold">Dreaming of a unique cake? Tell us about it!</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Occasion */}
                        <div>
                            <label className="block text-brown font-bold mb-2 uppercase text-sm">Occasion</label>
                            <input
                                type="text"
                                name="occasion"
                                required
                                placeholder="Birthday, Anniversary, Wedding..."
                                className="w-full bg-cream border-2 border-brown/20 rounded-xl p-4 text-brown font-bold focus:outline-none focus:border-yellow transition-colors placeholder:text-brown/30"
                                value={formData.occasion}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Theme & Weight Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-brown font-bold mb-2 uppercase text-sm flex items-center gap-2">
                                    <Cake size={16} /> Theme / Design
                                </label>
                                <input
                                    type="text"
                                    name="theme"
                                    required
                                    placeholder="Marvel, Unicorn, Floral..."
                                    className="w-full bg-cream border-2 border-brown/20 rounded-xl p-4 text-brown font-bold focus:outline-none focus:border-yellow transition-colors placeholder:text-brown/30"
                                    value={formData.theme}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-brown font-bold mb-2 uppercase text-sm flex items-center gap-2">
                                    <Weight size={16} /> Est. Weight (kg)
                                </label>
                                <select
                                    name="weight"
                                    className="w-full bg-cream border-2 border-brown/20 rounded-xl p-4 text-brown font-bold focus:outline-none focus:border-yellow transition-colors"
                                    value={formData.weight}
                                    onChange={handleChange}
                                >
                                    <option value="0.5">0.5 kg</option>
                                    <option value="1">1 kg</option>
                                    <option value="1.5">1.5 kg</option>
                                    <option value="2">2 kg</option>
                                    <option value="3">3 kg</option>
                                    <option value="4">4 kg</option>
                                    <option value="5+">5+ kg</option>
                                </select>
                            </div>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-brown font-bold mb-2 uppercase text-sm flex items-center gap-2">
                                <Calendar size={16} /> Date Required
                            </label>
                            <input
                                type="date"
                                name="date"
                                required
                                className="w-full bg-cream border-2 border-brown/20 rounded-xl p-4 text-brown font-bold focus:outline-none focus:border-yellow transition-colors"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-brown font-bold mb-2 uppercase text-sm">Message on Cake</label>
                            <input
                                type="text"
                                name="message"
                                placeholder="Happy Birthday Alex!"
                                className="w-full bg-cream border-2 border-brown/20 rounded-xl p-4 text-brown font-bold focus:outline-none focus:border-yellow transition-colors placeholder:text-brown/30"
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                            Enquire on WhatsApp
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
