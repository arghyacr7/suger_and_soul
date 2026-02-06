import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product/ProductDetail"
import { Metadata } from "next"
import { products, getProductById } from "@/lib/products"

interface PageProps {
    params: Promise<{ id: string }>
}

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const product = getProductById(id)
    if (!product) return { title: "Product Not Found" }

    return {
        title: `${product.name} - Sugar & Soul`,
        description: product.description,
    }
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params
    const product = getProductById(id)

    if (!product) {
        notFound()
    }

    return <ProductDetail product={product} />
}
