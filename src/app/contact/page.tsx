import { Mail, Phone, MapPin } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact Us - Sugar & Soul",
    description: "Get in touch with Sugar & Soul for custom cakes and queries.",
}

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="max-w-3xl mx-auto">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-brown mb-8 text-center">Contact Us</h1>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-4 border-white text-center">
                    <p className="text-xl text-brown/70 mb-10 leading-relaxed">
                        Have a question or want to discuss a custom cake? <br />
                        We'd love to hear from you!
                    </p>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="flex flex-col items-center gap-4 group">
                            <div className="w-16 h-16 bg-purple/10 rounded-full flex items-center justify-center text-purple group-hover:bg-purple group-hover:text-white transition-colors">
                                <Phone size={32} />
                            </div>
                            <div>
                                <h3 className="font-bold text-brown uppercase text-sm mb-1">Phone / WhatsApp</h3>
                                <a href="tel:9836733874" className="text-lg text-brown/80 hover:text-purple font-medium">9836733874</a>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4 group">
                            <div className="w-16 h-16 bg-pink/10 rounded-full flex items-center justify-center text-pink group-hover:bg-pink group-hover:text-white transition-colors">
                                <Mail size={32} />
                            </div>
                            <div>
                                <h3 className="font-bold text-brown uppercase text-sm mb-1">Email</h3>
                                <a href="mailto:dasmoumita0668@gmail.com" className="text-lg text-brown/80 hover:text-pink font-medium">dasmoumita0668@gmail.com</a>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4 group">
                            <div className="w-16 h-16 bg-yellow/10 rounded-full flex items-center justify-center text-brown group-hover:bg-yellow group-hover:text-white transition-colors">
                                <MapPin size={32} />
                            </div>
                            <div>
                                <h3 className="font-bold text-brown uppercase text-sm mb-1">Kitchen Location</h3>
                                <p className="text-lg text-brown/80 font-medium">Rabindranagar, Dankuni</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
