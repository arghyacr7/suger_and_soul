"use client"

import dynamic from "next/dynamic"

const BirthdayBanner = dynamic(
    () => import("./BirthdayBanner").then((mod) => mod.BirthdayBanner),
    { ssr: false }
)

export function BirthdayBannerWrapper() {
    return <BirthdayBanner />
}
