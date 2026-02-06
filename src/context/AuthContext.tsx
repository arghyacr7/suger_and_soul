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
    isBirthday: boolean
    likedProducts: string[]
    toggleLike: (productId: string) => Promise<void>
    signOut: () => Promise<void>
    refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const [greeting, setGreeting] = useState("")
    const [isBirthday, setIsBirthday] = useState(false)
    const [likedProducts, setLikedProducts] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
        // Calculate Greeting
        const hour = new Date().getHours()
        if (hour >= 5 && hour < 12) setGreeting("Good Morning")
        else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon")
        else setGreeting("Good Evening")

        // ✅ Restore session safely
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session)
            setUser(data.session?.user ?? null)
            if (data.session?.user) {
                fetchLikes(data.session.user.id)
            }
            setLoading(false)
        })

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session)
                setUser(session?.user ?? null)
                if (session?.user) {
                    fetchLikes(session.user.id)
                } else {
                    setLikedProducts([])
                    setIsBirthday(false)
                }
                setLoading(false)
            }
        )

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    // Check Birthday
    useEffect(() => {
        if (!user?.user_metadata?.dob) {
            setIsBirthday(false)
            return
        }

        try {
            // Robust parsing: "YYYY-MM-DD" -> [YYYY, MM, DD]
            // This avoids all timezone issues by treating date as strict integers
            const dobParts = user.user_metadata.dob.split('-')
            if (dobParts.length !== 3) return

            const birthMonth = parseInt(dobParts[1], 10)
            const birthDay = parseInt(dobParts[2], 10)

            const today = new Date()
            const currentMonth = today.getMonth() + 1
            const currentDay = today.getDate()

            console.log('🎂 Birthday Check:', { birthMonth, birthDay, currentMonth, currentDay })

            if (birthMonth === currentMonth && birthDay === currentDay) {
                setIsBirthday(true)
            } else {
                setIsBirthday(false)
            }
        } catch (e) {
            console.error('Error checking birthday:', e)
            setIsBirthday(false)
        }
    }, [user])

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
        // Re-check birthday after session refresh
        if (session?.user?.user_metadata?.dob) {
            // Force client-side re-render for birthday check via effect
            const dob = session.user.user_metadata.dob
            // We don't need to manually check here as the useEffect checks user.user_metadata.dob
        }
    }

    return (
        <AuthContext.Provider value={{ user, session, loading, greeting, isBirthday, likedProducts, toggleLike, signOut, refreshSession }}>
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
