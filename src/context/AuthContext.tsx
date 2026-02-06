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
    updateDOB: (dob: string) => Promise<void>
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

    // Check if today is user's birthday
    const checkBirthday = (dob: string | undefined) => {
        if (!dob) {
            console.log('🎂 Birthday Check: No DOB set')
            return false
        }
        try {
            const today = new Date()
            const birthDate = new Date(dob)
            const isBday = (
                today.getDate() === birthDate.getDate() &&
                today.getMonth() === birthDate.getMonth()
            )
            console.log('🎂 Birthday Check:', {
                dob,
                todayDate: today.getDate(),
                todayMonth: today.getMonth(),
                birthDate: birthDate.getDate(),
                birthMonth: birthDate.getMonth(),
                isBirthday: isBday
            })
            return isBday
        } catch (error) {
            console.error('🎂 Birthday Check Error:', error)
            return false
        }
    }

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
                setIsBirthday(checkBirthday(session.user.user_metadata?.dob))
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
                setIsBirthday(checkBirthday(session.user.user_metadata?.dob))
            } else {
                setLikedProducts([])
                setIsBirthday(false)
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
        // Re-check birthday after session refresh
        if (session?.user?.user_metadata?.dob) {
            setIsBirthday(checkBirthday(session.user.user_metadata.dob))
        }
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
        <AuthContext.Provider value={{ user, session, loading, greeting, isBirthday, likedProducts, toggleLike, signOut, refreshSession, updateDOB }}>
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
