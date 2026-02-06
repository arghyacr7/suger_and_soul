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
                const { error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.name,
                        },
                    },
                })
                if (error) throw error
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                })
                if (error) throw error
            }

            // Success - Redirect back or to home
            router.back()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-cream flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden animate-[fade-in_0.5s_ease-out]">
                {/* Header */}
                <div className="bg-brown text-cream p-6 relative">
                    <button
                        onClick={() => router.back()}
                        className="absolute top-6 left-6 text-cream/70 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="font-heading text-3xl text-center mt-4">
                        {mode === "login" ? "Welcome Back" : "Join Sugar & Soul"}
                    </h1>
                    <p className="text-center text-cream/60 text-sm mt-1">
                        {mode === "login" ? "Login to access your liked cakes" : "Sign up to save your favorites"}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-4">
                    {mode === "signup" && (
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-brown/60 uppercase ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-brown/40" size={18} />
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-purple/50 text-brown"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-brown/60 uppercase ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-brown/40" size={18} />
                            <input
                                type="email"
                                placeholder="hello@example.com"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-purple/50 text-brown"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-brown/60 uppercase ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-brown/40" size={18} />
                            <input
                                type="password"
                                placeholder={mode === "signup" ? "Min 6 chars (A-Z, 0-9)" : "Your password"}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-purple/50 text-brown"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg flex items-center gap-2">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple hover:bg-purple/90 h-12 rounded-xl text-lg font-bold shadow-lg mt-4"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (mode === "login" ? "Login" : "Sign Up")}
                    </Button>

                    <div className="text-center pt-4">
                        <p className="text-sm text-brown/60">
                            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                            <button
                                type="button"
                                onClick={() => {
                                    setMode(mode === "login" ? "signup" : "login")
                                    setError(null)
                                }}
                                className="text-purple font-bold ml-1 hover:underline focus:outline-none"
                            >
                                {mode === "login" ? "Sign Up" : "Login"}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
