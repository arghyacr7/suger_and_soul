"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/Button"
import { ChevronLeft, Loader2, Mail, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setMessage("")

        console.log("Attempting to send reset email to:", email)
        console.log("Redirect URL:", "https://sugernsoul.shop/reset-password")

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "https://sugernsoul.shop/reset-password",
        })

        if (error) {
            setError(error.message)
        } else {
            setMessage(`If an account exists for ${email}, a password reset link has been sent.`)
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#050505]">
            {/* Left Side - Cinematic Image */}
            <div className="w-full h-48 md:h-auto md:w-1/2 relative overflow-hidden shrink-0 hidden md:block">
                <div className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-[5s]" style={{ backgroundImage: "url('/images/cream%20cake/Red_Velvet_Cake2.jpg')" }}>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-16 max-w-2xl z-10">
                    <h2 className="font-heading text-6xl mb-6 leading-none text-brown tracking-tighter">
                        Recover <br /><span className="text-yellow">Access.</span>
                    </h2>
                    <p className="text-xl text-brown/80 font-light tracking-wide max-w-md border-l border-yellow pl-6">
                        Return to the exclusive circle of sweetness.
                    </p>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative bg-[#050505]">
                <div className="w-full max-w-md bg-[#0A0A0A] border border-[#222] rounded-[2rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.7)] animate-[fade-in_0.8s_ease-out]">

                    <Link href="/auth" className="inline-flex items-center text-brown/60 hover:text-yellow transition-colors mb-8 text-[10px] uppercase tracking-widest gap-2">
                        <ChevronLeft size={14} /> Back to Login
                    </Link>

                    <h2 className="font-heading text-3xl md:text-4xl text-brown mb-3 tracking-[0.1em] uppercase text-center">Reset Password</h2>
                    <div className="w-16 h-0.5 bg-yellow mx-auto mb-8 rounded-full"></div>

                    <form onSubmit={handleReset} className="space-y-8">
                        <div className="group relative">
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                className="peer w-full py-3 bg-transparent border-b border-[#333] focus:border-yellow outline-none transition-colors text-brown placeholder-transparent font-light tracking-widest text-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label className="absolute left-0 -top-3.5 text-[10px] text-yellow transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-brown/30 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-yellow peer-focus:text-[10px] uppercase tracking-widest">
                                Email Address
                            </label>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-xs uppercase tracking-widest bg-yellow/10 text-yellow border-yellow/20 hover:bg-yellow hover:text-black">
                            {loading ? <Loader2 className="animate-spin" /> : "Send Reset Link"}
                        </Button>

                        {message && (
                            <div className="border border-green-900/50 bg-green-950/20 text-green-400 text-xs p-4 tracking-wide flex items-center gap-3 rounded-lg">
                                <CheckCircle size={14} />
                                {message}
                            </div>
                        )}
                        {error && (
                            <div className="border border-red-900/50 bg-red-950/20 text-red-400 text-xs p-4 tracking-wide flex items-center gap-3 rounded-lg">
                                <AlertCircle size={14} />
                                {error}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}
