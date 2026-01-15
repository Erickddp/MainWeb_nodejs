import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
    children: ReactNode;
    className?: string;
    isFullWidth?: boolean;
}

export const Container = ({ children, className, isFullWidth = false }: ContainerProps) => {
    return (
        <div
            className={cn(
                "mx-auto px-6 md:px-12",
                !isFullWidth && "max-w-7xl",
                className
            )}
        >
            {children}
        </div>
    );
};
