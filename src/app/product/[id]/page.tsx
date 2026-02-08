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

    const domain = "https://sugarandsoul.com"

    return {
        title: `${product.name} - Sugar & Soul`,
        description: product.description,
        openGraph: {
            title: `${product.name} - Sugar & Soul`,
            description: product.description,
            url: `${domain}/product/${product.id}`,
            images: [
                {
                    url: `${domain}${product.image}`,
                    width: 800,
                    height: 600,
                    alt: product.name,
                },
            ],
            type: "website",
        },
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
