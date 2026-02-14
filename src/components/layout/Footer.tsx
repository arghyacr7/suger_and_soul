import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-[#050505] text-white/80 py-12 border-t border-white/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <Image
                                src="/images/logo.png"
                                alt="Sugar & Soul"
                                width={60}
                                height={60}
                                className="w-auto h-14 object-contain invert"
                            />
                            <span className="font-branding text-2xl font-bold text-white">
                                Sugar & Soul
                            </span>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed mb-4">
                            Baked with Love, Served with Soul.<br />
                            A premium cloud kitchen delivering handcrafted cakes and brownies.
                        </p>
                        <div className="text-sm text-white/60 space-y-2">
                            <p className="font-semibold text-yellow">Contact Us</p>
                            <p>
                                <a href="mailto:dasmoumita0668@gmail.com" className="hover:text-yellow transition-colors">
                                    Email: dasmoumita0668@gmail.com
                                </a>
                            </p>
                            <p>
                                <a href="tel:9836733874" className="hover:text-yellow transition-colors">
                                    Phone: 9836733874
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-display text-lg font-semibold mb-4 text-white">Shop</h3>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><Link href="/cakes" className="hover:text-yellow transition-colors">Cakes</Link></li>
                            <li><Link href="/cream-cakes" className="hover:text-yellow transition-colors">Cream Cakes</Link></li>
                            <li><Link href="/brownies" className="hover:text-yellow transition-colors">Brownies</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-heading text-lg font-semibold mb-4 text-white">Support</h3>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li><Link href="/contact" className="hover:text-yellow transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-yellow transition-colors">FAQs</Link></li>
                            <li><Link href="/custom-order" className="hover:text-yellow transition-colors">Custom Order</Link></li>
                        </ul>
                    </div>

                    {/* Delivery */}
                    <div>
                        <h3 className="font-heading text-lg font-semibold mb-4 text-white">Delivery</h3>
                        <p className="text-sm text-white/60 mb-2">
                            🚚 <strong>1 km Radius Only</strong><br />
                            Ensure fresh & fast delivery.
                        </p>
                        <p className="text-sm text-white/60">
                            📦 <strong>Pickup Available</strong><br />
                            From our cloud kitchen.
                        </p>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="font-heading text-lg font-semibold mb-4 text-white">Follow Us</h3>
                        <div className="flex gap-4">
                            <Link href="https://www.facebook.com/arghyadeep.das.948" target="_blank" rel="noopener noreferrer" className="hover:text-yellow transition-colors">
                                <Facebook size={24} />
                            </Link>
                            <Link href="https://www.instagram.com/iammoumita1?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-yellow transition-colors">
                                <Instagram size={24} />
                            </Link>
                        </div>
                        <div className="mt-4">
                            <span className="text-[10px] text-white/30 hover:text-white/50 transition-colors cursor-default tracking-wider">
                                Crafted by Arghyadeep
                            </span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-6 md:mt-12 pt-8 text-center text-sm text-white/40">
                    © {new Date().getFullYear()} Sugar & Soul. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
