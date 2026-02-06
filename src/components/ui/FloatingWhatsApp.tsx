"use client"

import { MessageCircle } from "lucide-react"
import { generateWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/whatsapp"

export function FloatingWhatsApp() {
    const handleClick = () => {
        // General enquiry link
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi Sugar & Soul! I have a query regarding a cake order.`, "_blank")
    }

    return (
        <button
            onClick={handleClick}
            className="hidden md:block fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:scale-110 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] transition-all animate-[float_4s_infinite_ease-in-out] border-2 border-white"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={32} fill="white" />
        </button>
    )
}
