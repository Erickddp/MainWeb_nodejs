import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    interactive?: boolean;
}

export const GlassCard = ({ children, className, interactive = false }: GlassCardProps) => {
    return (
        <div
            className={cn(
                "glass rounded-2xl p-6 transition-all duration-300",
                interactive && "hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30",
                className
            )}
        >
            {children}
        </div>
    );
};
