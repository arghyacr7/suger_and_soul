"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Product } from "@/types"
import { Trash, Plus, BarChart3, Package } from "lucide-react"

// Mock Data (In reality, fetch from Supabase)
const initialProducts: Product[] = [
    { id: "1", name: "Truffle Bliss Cake", description: "Rich dark chocolate ganache with moist sponge.", price: 850, image: "/images/cake-1.jpg", category: "cakes", popular: true },
    { id: "2", name: "Red Velvet Dream", description: "Classic red velvet with cream cheese frosting.", price: 900, image: "/images/cake-2.jpg", category: "cakes", popular: true },
    { id: "3", name: "Lotus Cheesecak", description: "Creamy biscoff cheesecake.", price: 1200, image: "/images/cake-3.jpg", category: "cream-cakes", popular: true },
    { id: "4", name: "Fudgy Walnut Brownie", description: "Gooey chocolate brownies loaded with walnuts.", price: 150, image: "/images/brownie-1.jpg", category: "brownies", popular: true },
]

export default function AdminDashboard() {
    const router = useRouter()
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const session = localStorage.getItem("admin_session")
        if (!session) {
            router.push("/admin")
        } else {
            setIsAuthenticated(true)
        }
    }, [router])

    if (!isAuthenticated) return null

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(p => p.id !== id))
            // Call Supabase delete here
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("admin_session")
        router.push("/admin")
    }

    // Mock Likes Analytics (Static for now to prevent hydration errors)
    const mostLiked = [...products] // Sorted by default order

    return (
        <div className="min-h-screen bg-crimson/5">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-brown">Admin Dashboard</h1>
                        <p className="text-brown/60">Welcome back, Admin.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={() => alert("Open Add Product Modal")} className="gap-2">
                            <Plus size={18} /> Add Product
                        </Button>
                        <Button variant="outline" onClick={handleLogout}>Logout</Button>
                    </div>
                </div>

                {/* Analytics Section */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold text-brown mb-4 flex items-center gap-2">
                        <BarChart3 size={24} /> Popularity Tracker
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {mostLiked.map((p, i) => (
                            <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-brown/5 flex items-center justify-between">
                                <div>
                                    <span className="text-xs font-bold text-gray-400">#{i + 1} Most Liked</span>
                                    <p className="font-display font-bold text-brown">{p.name}</p>
                                </div>
                                <div className="text-pink font-bold text-xl">
                                    {10 + (i * 12)} ❤️
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Product Management */}
                <section>
                    <h2 className="text-xl font-bold text-brown mb-4 flex items-center gap-2">
                        <Package size={24} /> Product Management
                    </h2>
                    <div className="bg-white rounded-xl shadow-sm border border-brown/5 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-cream">
                                <tr>
                                    <th className="p-4 font-display text-brown">Product Name</th>
                                    <th className="p-4 font-display text-brown">Category</th>
                                    <th className="p-4 font-display text-brown">Price</th>
                                    <th className="p-4 font-display text-brown">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-t border-brown/5 hover:bg-brown/5 transition-colors">
                                        <td className="p-4 font-medium text-brown">{product.name}</td>
                                        <td className="p-4 text-brown/60 capitalize">{product.category.replace("-", " ")}</td>
                                        <td className="p-4 text-brown">₹{product.price}</td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}
