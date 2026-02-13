import * as React from "react"
import { cn } from "@/lib/utils"
// import { Loader2 } from "lucide-react" // usage for loading state later

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient"
    size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-none font-semibold transition-all duration-500 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-[0.2em]",
                    {
                        "bg-transparent border border-yellow text-yellow hover:bg-yellow hover:text-black shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]": variant === "primary",
                        "bg-transparent border border-brown/30 text-brown hover:border-brown hover:bg-brown hover:text-black": variant === "secondary",
                        "border border-brown text-brown hover:bg-brown hover:text-black": variant === "outline",
                        "text-yellow border-b border-transparent hover:border-yellow p-0 h-auto rounded-none": variant === "ghost",
                        "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 hover:brightness-110 hover:scale-[1.02] shadow-[0_0_20px_rgba(236,72,153,0.3)]": variant === "gradient",
                        "h-10 px-6 text-[10px]": size === "sm",
                        "h-12 px-8 text-xs": size === "md",
                        "h-16 px-12 text-sm": size === "lg",
                    },
                    className
                )}
                {...props}
            >
                {children}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button }
