"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Calendar, LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"

interface ProfileModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
    const { user, loading, signOut } = useAuth()
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
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
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
                        className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 bg-white rounded-t-3xl md:rounded-3xl shadow-2xl max-w-md w-full mx-auto overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-yellow to-pink p-6 relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                                aria-label="Close"
                            >
                                <X size={20} className="text-white" />
                            </button>
                            <h2 className="text-2xl font-heading font-bold text-white">
                                My Profile
                            </h2>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Name Field (Read-only) */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-brown/60 uppercase">
                                    <User size={16} />
                                    Name
                                </label>
                                <div className="bg-gray-100 px-4 py-3 rounded-xl border border-gray-200">
                                    <p className="text-brown font-bold">
                                        {user.user_metadata.full_name || "User"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-6 pb-20 md:pb-6 bg-cream">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 bg-white border-2 border-red-500 text-red-500 font-bold py-4 rounded-xl hover:bg-red-50 transition-all"
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
