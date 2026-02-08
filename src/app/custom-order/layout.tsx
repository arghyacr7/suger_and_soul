import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Custom Cake Order | Sugar & Soul",
    description: "Order a custom designed cake for birthdays, weddings, or any special occasion. Customize flavor, theme, and size with Sugar & Soul.",
}

export default function CustomOrderLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
