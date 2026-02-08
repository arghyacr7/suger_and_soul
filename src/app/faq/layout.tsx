import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Frequently Asked Questions | Sugar & Soul",
    description: "Find answers to common questions about Sugar & Soul's delivery areas, ordering process, eggless options, and more.",
}

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
