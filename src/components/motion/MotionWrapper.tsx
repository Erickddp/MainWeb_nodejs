"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn, fadeInUp, fadeInScale } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type MotionPreset = "fade" | "up" | "scale";

interface MotionWrapperProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    preset?: MotionPreset;
    once?: boolean;
    immediate?: boolean;
}

const presetMap = {
    fade: fadeIn,
    up: fadeInUp,
    scale: fadeInScale,
};

export const MotionWrapper = ({
    children,
    className,
    delay = 0,
    preset = "fade",
    once = true,
    immediate = false
}: MotionWrapperProps) => {
    const shouldReduceMotion = useReducedMotion();
    const variant = presetMap[preset];

    if (shouldReduceMotion) {
        return <div className={cn(className)}>{children}</div>;
    }

    return (
        <motion.div
            initial="hidden"
            whileInView={!immediate ? "visible" : undefined}
            animate={immediate ? "visible" : undefined}
            viewport={!immediate ? { once, amount: 0.1 } : undefined}
            variants={{
                hidden: variant.hidden,
                visible: {
                    ...variant.visible,
                    transition: {
                        ...(variant.visible as any).transition,
                        delay: typeof window !== "undefined" && window.innerWidth < 768 ? delay * 0.5 : delay,
                        duration: typeof window !== "undefined" && window.innerWidth < 768 ? 0.4 : (variant.visible as any).transition.duration
                    },
                },
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};
