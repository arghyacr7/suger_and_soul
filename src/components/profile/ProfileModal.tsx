"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User, Calendar, LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/Button"

interface ProfileModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
    const { user, signOut, updateDOB } = useAuth()
    const [dob, setDob] = useState(user?.user_metadata?.dob || "")
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSave = async () => {
        setSaving(true)
        setSuccess(false)
        try {
            await updateDOB(dob)
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (error) {
            console.error("Error saving DOB:", error)
        } finally {
            setSaving(false)
        }
    }

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
                            {/* Success Message */}
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-sm font-bold"
                                >
                                    ✅ Profile updated successfully!
                                </motion.div>
                            )}

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

                            {/* Date of Birth Field (Editable) */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold text-brown/60 uppercase">
                                    <Calendar size={16} />
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all text-brown font-bold"
                                    placeholder="Select your date of birth"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-6 bg-cream space-y-3">
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                className="w-full bg-gradient-to-r from-yellow to-pink text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                            >
                                {saving ? "Saving..." : "✅ Save"}
                            </Button>

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
