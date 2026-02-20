import * as React from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                className={cn(
                    "group inline-flex items-center justify-center gap-2 rounded-full",
                    "px-8 py-6 text-base font-bold uppercase tracking-wider", // Matches Explore button size/padding
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                    "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
                    "transition-all duration-300 ease-out",
                    "hover:-translate-y-1",
                    className
                )}
                {...props}
            >
                {children}
            </Button>
        )
    }
)
PrimaryButton.displayName = "PrimaryButton"

export { PrimaryButton }
