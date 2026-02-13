"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, User, LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

interface ProfileModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
    const { user, signOut } = useAuth()
    const handleLogout = async () => {
        await signOut()
        onClose()
    }

    if (!user) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: "100%",
                            scale: 0.95
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                        }}
                        exit={{
                            opacity: 0,
                            y: "100%",
                            scale: 0.95
                        }}
                        transition={{
                            duration: 0.4,
                            ease: "easeOut"
                        }}
                        className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[70] bg-[#0A0A0A] border border-white/10 rounded-t-[2rem] md:rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-md w-full mx-auto overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-center relative">
                            <button
                                onClick={onClose}
                                className="absolute top-1/2 -translate-y-1/2 right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                            <h2 className="text-xl font-heading font-bold text-white tracking-widest uppercase">
                                My Profile
                            </h2>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-8">
                            {/* Avatar / Placeholder */}
                            <div className="flex justify-center">
                                <div className="size-24 rounded-full bg-gradient-to-br from-yellow/20 to-purple/20 border-2 border-yellow/30 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                                    <span className="text-4xl font-heading text-yellow">
                                        {user.user_metadata.full_name?.charAt(0).toUpperCase() || "U"}
                                    </span>
                                </div>
                            </div>

                            {/* Name Field (Read-only) */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-widest">
                                    <User size={14} />
                                    Name
                                </label>
                                <div className="bg-white/5 px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-3">
                                    <span className="text-white font-bold text-lg tracking-wide bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                                        {user.user_metadata.full_name || "User"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-6 pb-10 md:pb-6 bg-white/5 border-t border-white/5">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 bg-[#0A0A0A] border border-red-500/30 text-red-500 font-bold py-4 rounded-xl hover:bg-red-500/10 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all uppercase tracking-widest text-sm"
                            >
                                <LogOut size={18} />
                                Log Out
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
