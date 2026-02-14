"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/Button"
import { ChevronLeft, Loader2, Mail, Lock, User, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
    const [mode, setMode] = useState<"login" | "signup">("signup")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const validate = () => {
        if (!formData.email.includes("@")) return "Invalid email address."
        if (formData.password.length < 6) return "Password must be at least 6 characters."
        if (mode === "signup") {
            if (!formData.name) return "Name is required."
            if (!/^[a-zA-Z0-9 ]+$/.test(formData.password)) return "Password must be alphanumeric."
        }
        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const validationError = validate()
        if (validationError) {
            setError(validationError)
            return
        }

        setLoading(true)
        try {
            if (mode === "signup") {
                const { data, error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.name,
                        },
                        emailRedirectTo: undefined,
                    },
                })
                if (error) throw error

                // Check if email confirmation is required
                if (data?.user && !data.session) {
                    setError("Please check your email to confirm your account before logging in.")
                    setLoading(false)
                    return
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                })
                if (error) throw error
            }

            // Wait a bit for session to propagate
            await new Promise(resolve => setTimeout(resolve, 500))

            // Redirect to home page
            router.push("/")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#050505]">
            {/* Left Side - Cinematic Image */}
            <div className="w-full h-48 md:h-auto md:w-1/2 relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-[5s]" style={{ backgroundImage: "url('/images/cream%20cake/Red_Velvet_Cake2.jpg')" }}>
                    <div className="absolute inset-0 bg-black/40 md:bg-black/60 backdrop-blur-[0px] md:backdrop-blur-[1px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-6 md:p-16 max-w-2xl z-10">
                    <h2 className="font-heading text-3xl md:text-6xl mb-2 md:mb-6 leading-none text-white md:text-brown tracking-tighter drop-shadow-lg md:drop-shadow-none">
                        Experience <br /><span className="text-yellow">Excellence.</span>
                    </h2>
                    <p className="hidden md:block text-xl text-brown/80 font-light tracking-wide max-w-md border-l border-yellow pl-6">
                        Join the inner circle. Exclusive tastes, reserved for the distinguished.
                    </p>
                </div>
            </div>

            {/* Right Side - Dark Auth Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative bg-[#050505]">
                <div className="w-full max-w-md bg-[#0A0A0A] border border-[#222] rounded-[2rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.7)] animate-[fade-in_0.8s_ease-out]">

                    {/* Header */}
                    <div className="mb-8 md:mb-12 text-center">
                        <h1 className="font-heading text-3xl md:text-4xl text-brown mb-3 tracking-[0.1em] uppercase">
                            {mode === "login" ? "Member Login" : "Sign Up"}
                        </h1>
                        <div className="w-16 h-0.5 bg-yellow mx-auto mb-4 rounded-full"></div>
                        <p className="text-brown/40 text-[10px] md:text-xs tracking-[0.2em] uppercase">
                            {mode === "login" ? "Welcome back to the suite" : "Begin your journey"}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                        {mode === "signup" && (
                            <div className="group relative">
                                <input
                                    type="text"
                                    placeholder="FULL NAME"
                                    className="peer w-full py-3 bg-transparent border-b border-[#333] focus:border-yellow outline-none transition-colors text-brown placeholder-transparent font-light tracking-widest text-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <label className="absolute left-0 -top-3.5 text-[10px] text-yellow transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-brown/30 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-yellow peer-focus:text-[10px] uppercase tracking-widest">
                                    Full Name
                                </label>
                            </div>
                        )}

                        <div className="group relative">
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                className="peer w-full py-3 bg-transparent border-b border-[#333] focus:border-yellow outline-none transition-colors text-brown placeholder-transparent font-light tracking-widest text-sm"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <label className="absolute left-0 -top-3.5 text-[10px] text-yellow transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-brown/30 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-yellow peer-focus:text-[10px] uppercase tracking-widest">
                                Email Address
                            </label>
                        </div>

                        <div className="group relative">
                            <input
                                type="password"
                                placeholder="PASSWORD"
                                className="peer w-full py-3 bg-transparent border-b border-[#333] focus:border-yellow outline-none transition-colors text-brown placeholder-transparent font-light tracking-widest text-sm"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <label className="absolute left-0 -top-3.5 text-[10px] text-yellow transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-brown/30 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-yellow peer-focus:text-[10px] uppercase tracking-widest">
                                Password
                            </label>
                        </div>

                        {mode === "login" && (
                            <div className="flex justify-end -mt-4 mb-6">
                                <button
                                    type="button"
                                    onClick={() => router.push("/forgot-password")}
                                    className="text-[10px] md:text-xs text-brown/60 hover:text-yellow transition-colors tracking-widest uppercase"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        {error && (
                            <div className="border border-red-900/50 bg-red-950/20 text-red-400 text-xs p-4 tracking-wide flex items-center gap-3 rounded-lg">
                                <AlertCircle size={14} />
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            variant="primary"
                            className="w-full text-xs mt-6 h-12 rounded-xl"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (mode === "login" ? "Enter" : "Sign Up")}
                        </Button>

                        <div className="text-center pt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setMode(mode === "login" ? "signup" : "login")
                                    setError(null)
                                }}
                                className="text-brown/40 hover:text-yellow text-[10px] uppercase tracking-[0.2em] transition-colors"
                            >
                                {mode === "login" ? "Create an Account" : "Already a Member?"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
