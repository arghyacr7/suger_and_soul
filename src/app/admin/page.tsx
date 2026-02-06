"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"

export default function AdminLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Demo Login Logic (Replace with Supabase Auth later)
        if (email === "admin@sugarandsoul.com" && password === "admin123") {
            localStorage.setItem("admin_session", "true")
            router.push("/admin/dashboard")
        } else {
            alert("Invalid credentials. Try admin@sugarandsoul.com / admin123")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cream">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-brown/10">
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl font-bold text-brown">Admin Login</h1>
                    <p className="text-brown/60">Manage your sweet empire.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-brown mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-brown/20 focus:outline-none focus:ring-2 focus:ring-pink/50"
                            placeholder="admin@sugarandsoul.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brown mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-brown/20 focus:outline-none focus:ring-2 focus:ring-pink/50"
                            placeholder="••••••••"
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </div>
        </div>
    )
}
