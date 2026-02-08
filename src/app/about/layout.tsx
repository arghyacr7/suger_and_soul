import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "About Us",
    description: "Discover the story behind Sugar & Soul. We are a premium cloud kitchen in Dankuni serving handcrafted cakes, brownies, and desserts with love.",
}

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
