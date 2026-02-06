"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

const faqs = [
    {
        question: "Do you deliver everywhere?",
        answer: "We currently deliver within 1 km radius only from Dankuni, Rabindranagar. This ensures freshness."
    },
    {
        question: "Is pickup available?",
        answer: "Yes, pickup is available directly from our cloud kitchen in Dankuni. Select 'Pickup' when ordering."
    },
    {
        question: "How do I place an order?",
        answer: "Simply click 'Order on WhatsApp' on any product and send us your requirement. We'll confirm instantly."
    },
    {
        question: "Do you provide eggless cakes?",
        answer: "Yes! All our cakes are 100% eggless by default. We use premium substitutes to ensure they stay soft and moist."
    },
    {
        question: "Can I customize the cake design?",
        answer: "Absolutely! Use our 'Custom Order' page to send us your theme, flavor preferences, and reference images."
    }
]

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <main className="min-h-screen bg-cream">
            <Navbar />

            <div className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-brown mb-4 uppercase">Frequently Asked Questions</h1>
                    <p className="text-brown/70 font-medium text-lg">Everything you need to know about Sugar & Soul.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border-2 border-brown/10 overflow-hidden transition-all duration-300 hover:border-brown/30"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-heading text-lg font-bold text-brown">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="text-brown" />
                                ) : (
                                    <ChevronDown className="text-brown/50" />
                                )}
                            </button>

                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="text-brown/80 leading-relaxed font-sans">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <FloatingWhatsApp />
            <Footer />
        </main>
    )
}
