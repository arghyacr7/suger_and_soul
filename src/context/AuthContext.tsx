"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface AuthContextType {
    user: User | null
    session: Session | null
    loading: boolean
    greeting: string
    likedProducts: string[]
    toggleLike: (productId: string) => Promise<void>
    signOut: () => Promise<void>
    refreshSession: () => Promise<void>
    updateDOB: (dob: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [greeting, setGreeting] = useState("")
    const [likedProducts, setLikedProducts] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
        // Calculate Greeting
        const hour = new Date().getHours()
        if (hour >= 5 && hour < 12) setGreeting("Good Morning")
        else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon")
        else setGreeting("Good Evening")

        // Check active session
        async function initSession() {
            const { data: { session } } = await supabase.auth.getSession()
            setSession(session)
            setUser(session?.user ?? null)
            if (session?.user) {
                fetchLikes(session.user.id)
            }
            setLoading(false)
        }
        initSession()

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            if (session?.user) {
                fetchLikes(session.user.id)
            } else {
                setLikedProducts([])
            }
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const fetchLikes = async (userId: string) => {
        const { data, error } = await supabase
            .from('likes')
            .select('product_id')
            .eq('user_id', userId)

        if (data) {
            setLikedProducts(data.map(item => item.product_id))
        }
    }

    const toggleLike = async (productId: string) => {
        if (!user) return

        if (likedProducts.includes(productId)) {
            // Unlike
            setLikedProducts(prev => prev.filter(id => id !== productId))
            await supabase.from('likes').delete().match({ user_id: user.id, product_id: productId })
        } else {
            // Like
            setLikedProducts(prev => [...prev, productId])
            await supabase.from('likes').insert({ user_id: user.id, product_id: productId })
        }
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        setLikedProducts([])
        router.refresh()
    }

    const refreshSession = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
    }

    const updateDOB = async (dob: string) => {
        if (!user) return

        const { data, error } = await supabase.auth.updateUser({
            data: {
                dob: dob
            }
        })

        if (error) {
            throw error
        }

        // Refresh session to get updated user data
        await refreshSession()
    }

    return (
        <AuthContext.Provider value={{ user, session, loading, greeting, likedProducts, toggleLike, signOut, refreshSession, updateDOB }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
