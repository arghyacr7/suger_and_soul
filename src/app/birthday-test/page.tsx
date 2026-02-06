"use client"

import { useAuth } from "@/context/AuthContext"

export default function BirthdayTestPage() {
    const { user, isBirthday } = useAuth()

    return (
        <div className="min-h-screen bg-cream p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-brown mb-6">🎂 Birthday Debug Page</h1>

                <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h2 className="font-bold text-lg mb-2">User Data:</h2>
                        <pre className="text-sm overflow-auto">
                            {JSON.stringify({
                                hasUser: !!user,
                                name: user?.user_metadata?.full_name,
                                dob: user?.user_metadata?.dob,
                                isBirthday: isBirthday
                            }, null, 2)}
                        </pre>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                        <h2 className="font-bold text-lg mb-2">Current Date:</h2>
                        <p className="text-sm">
                            {new Date().toLocaleDateString()} - {new Date().toISOString().split('T')[0]}
                        </p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                        <h2 className="font-bold text-lg mb-2">Birthday Check Result:</h2>
                        <p className="text-xl font-bold">
                            {isBirthday ? "✅ IT'S YOUR BIRTHDAY!" : "❌ Not your birthday"}
                        </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                        <h2 className="font-bold text-lg mb-2">localStorage Check:</h2>
                        <p className="text-sm">
                            Dismissed: {typeof window !== 'undefined' ? localStorage.getItem('birthdayBannerDismissed') || 'Not dismissed' : 'N/A'}
                        </p>
                        <button
                            onClick={() => {
                                if (typeof window !== 'undefined') {
                                    localStorage.removeItem('birthdayBannerDismissed')
                                    alert('Cleared! Refresh the page.')
                                }
                            }}
                            className="mt-2 bg-purple text-white px-4 py-2 rounded-lg hover:bg-purple/80"
                        >
                            Clear Dismissal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
