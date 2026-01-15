"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost" | "glow";
    size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants: Record<string, string> = {
            primary: "bg-primary text-primary-foreground hover:bg-primary/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            glow: "bg-accent/20 text-accent-foreground border border-accent/50 shadow-[0_0_15px_hsla(var(--accent),0.5)] hover:bg-accent/30 hover:shadow-[0_0_25px_hsla(var(--accent),0.7)] transition-all",
        };

        const sizes: Record<string, string> = {
            sm: "h-9 px-3 rounded-md text-xs",
            md: "h-11 px-8 rounded-md text-sm",
            lg: "h-14 px-10 rounded-lg text-base",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant as keyof typeof variants] || variants.primary,
                    sizes[size as keyof typeof sizes] || sizes.md,
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
