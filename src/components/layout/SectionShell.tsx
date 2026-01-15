import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
    children: ReactNode;
    id?: string;
    className?: string;
    containerClassName?: string;
    isFullWidth?: boolean;
}

export const SectionShell = ({
    children,
    id,
    className,
    containerClassName,
    isFullWidth = false,
    ...props
}: SectionShellProps) => {
    return (
        <section
            id={id}
            className={cn("py-20 md:py-32 outline-none", className)}
            {...props}
        >
            <Container isFullWidth={isFullWidth} className={containerClassName}>
                {children}
            </Container>
        </section>
    );
};
