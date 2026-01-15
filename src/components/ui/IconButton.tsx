import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}

export const IconButton = ({ children, className, ...props }: IconButtonProps) => {
    return (
        <button
            className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-accent/10 active:scale-95",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
