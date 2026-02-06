import * as React from "react"
import { cn } from "@/lib/utils"
// import { Loader2 } from "lucide-react" // usage for loading state later

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost"
    size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-yellow text-brown border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]": variant === "primary",
                        "bg-pink text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]": variant === "secondary",
                        "border-2 border-brown text-brown hover:bg-brown hover:text-white": variant === "outline",
                        "hover:bg-brown/5 text-brown": variant === "ghost",
                        "h-9 px-5 text-sm": size === "sm",
                        "h-12 px-8 text-base": size === "md",
                        "h-16 px-10 text-xl": size === "lg",
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
