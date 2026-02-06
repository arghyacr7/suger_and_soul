import { notFound } from "next/navigation"
import { ProductCard } from "@/components/product/ProductCard"
import { getProductsByCategory, products } from "@/lib/products"
import { Metadata } from "next"

interface PageProps {
    params: Promise<{ category: string }>
}

export async function generateStaticParams() {
    return [
        { category: "cakes" },
        { category: "cream-cakes" },
        { category: "brownies" },
    ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category } = await params
    const title = category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    return {
        title: `${title} - Sugar & Soul`,
        description: `Order delicious ${title} online from Sugar & Soul.`,
    }
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params

    // Validate category (URL params)
    const validCategories = ["cakes", "cream-cakes", "brownies"]
    if (!validCategories.includes(category)) {
        notFound()
    }

    // Map URL category to Database category
    const dbCategory = category === "cakes" ? "plain-cakes" : category
    const categoryProducts = getProductsByCategory(dbCategory)

    // Display Title
    const categoryTitle = category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="text-center mb-12 animate-[fade-in_0.5s_ease-out]">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-brown mb-4">{categoryTitle}</h1>
                <p className="text-brown/60 max-w-2xl mx-auto">
                    Handcrafted {categoryTitle.toLowerCase()} made with the finest ingredients.
                </p>
            </div>

            {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-[slide-up_0.5s_ease-out]">
                    {categoryProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-brown/50">
                    <p>No products found in this category yet.</p>
                </div>
            )}
        </div>
    )
}
