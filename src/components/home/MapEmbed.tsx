"use client"

import { MapPin } from "lucide-react"

export function MapEmbed() {
    return (
        <section className="py-16 container mx-auto px-4 md:px-6">
            <div className="bg-white border-4 border-brown rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(62,39,35,1)] flex flex-col md:flex-row">
                {/* Info Side */}
                <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 text-yellow mb-4">
                        <MapPin size={32} fill="currentColor" strokeWidth={2} className="text-brown" />
                        <span className="font-heading font-bold text-brown uppercase tracking-wider">Cloud Kitchen</span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl text-brown mb-6 drop-shadow-sm">Pickups Welcome!</h2>
                    <p className="text-xl text-brown/80 mb-6 font-medium">
                        Sugar & Soul is a home-based cloud kitchen located in <span className="font-bold">Dankuni, Rabindranagar</span>.
                        You can pick up your freshly baked cakes directly from our kitchen.
                    </p>

                    <div className="bg-cream rounded-xl p-6 border-2 border-brown/10 mb-8">
                        <h3 className="font-heading text-xl text-brown mb-2">Delivery Radius</h3>
                        <p className="text-brown/70">
                            We strictly deliver within a <span className="font-bold underline text-brown">1 km radius</span> to ensure your cake reaches you fresh and in perfect condition.
                        </p>
                    </div>

                    <a
                        href="https://maps.app.goo.gl/n3LpyyDbt1PNir2aA"
                        target="_blank"
                        className="inline-flex items-center justify-center gap-2 bg-brown text-white font-heading uppercase text-lg px-8 py-4 rounded-xl hover:bg-brown/90 transition-all shadow-[4px_4px_0px_0px_rgba(255,210,63,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,210,63,1)]"
                    >
                        Get Directions <MapPin size={20} />
                    </a>
                </div>

                {/* Map Side */}
                <div className="flex-1 h-[400px] md:h-auto bg-gray-200 relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.385567540939!2d88.2841935!3d22.6797079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f883a064144ccd%3A0x394e7c70c39df53a!2sRabindranagar%20Club!5e0!3m2!1sen!2sin!4v1707077700000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
                    />
                </div>
            </div>
        </section>
    )
}
