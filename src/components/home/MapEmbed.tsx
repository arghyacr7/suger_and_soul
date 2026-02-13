"use client"

import { MapPin } from "lucide-react"

export function MapEmbed() {
    return (
        <section className="py-16 container mx-auto px-4 md:px-6">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden flex flex-col md:flex-row hover:border-yellow/30 transition-all duration-500 group">
                {/* Info Side */}
                <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 text-yellow mb-6">
                        <MapPin size={24} fill="currentColor" strokeWidth={2} className="text-black" />
                        <span className="font-heading font-bold text-yellow uppercase tracking-[0.2em] text-sm">Cloud Kitchen</span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl text-brown mb-6 uppercase tracking-widest leading-tight">Pickups Welcome!</h2>
                    <p className="text-sm md:text-base text-brown/60 mb-8 font-light leading-relaxed tracking-wide uppercase max-w-md">
                        Sugar & Soul is a home-based cloud kitchen located in <span className="text-white font-medium">Dankuni, Rabindranagar</span>.
                        <br />Freshly baked, just for you.
                    </p>

                    <div className="bg-[#111] rounded-none p-6 border border-white/5 mb-8 hover:border-yellow/20 transition-colors">
                        <h3 className="font-heading text-lg text-brown mb-2 uppercase tracking-widest">Delivery Radius</h3>
                        <p className="text-brown/50 text-xs uppercase tracking-wider leading-relaxed">
                            We deliver within a <span className="text-yellow font-medium">1 km radius</span> to ensure perfection.
                        </p>
                    </div>

                    <a
                        href="https://maps.app.goo.gl/n3LpyyDbt1PNir2aA"
                        target="_blank"
                        className="inline-flex items-center justify-center gap-3 bg-transparent text-brown border border-brown/30 font-bold uppercase text-xs tracking-[0.2em] px-8 py-4 rounded-none hover:bg-brown hover:text-black transition-all duration-500 w-fit"
                    >
                        Get Directions <MapPin size={16} />
                    </a>
                </div>

                {/* Map Side */}
                <div className="flex-1 h-[400px] md:h-auto bg-[#111] relative border-l border-white/5">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.385567540939!2d88.2841935!3d22.6797079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f883a064144ccd%3A0x394e7c70c39df53a!2sRabindranagar%20Club!5e0!3m2!1sen!2sin!4v1707077700000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(90%) grayscale(20%)" }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 transition-all duration-500 opacity-80 hover:opacity-100"
                    />
                </div>
            </div>
        </section>
    )
}
