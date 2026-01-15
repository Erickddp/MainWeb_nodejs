"use client";

import React from "react";
import { cn } from "@/lib/utils"; // Assuming utils exists, standard in shadcn/next projects

interface SymptomIconProps {
    children: React.ReactNode;
    className?: string;
    tone?: "neutral" | "problem";
}

export const SymptomIcon = ({ children, className, tone = "neutral" }: SymptomIconProps) => {
    const isProblem = tone === "problem";

    return (
        <div
            className={cn(
                "relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24",
                "rounded-2xl backdrop-blur-sm pointer-events-auto transition-transform duration-300",
                "hover:scale-105 active:scale-95 touch-manipulation overflow-hidden",
                // Tone: Neutral
                !isProblem && "bg-accent/5 ring-1 ring-accent/20 shadow-[0_0_15px_-3px_hsl(var(--accent)/0.3)]",
                // Tone: Problem (Warning/Corruption)
                isProblem && "bg-[rgba(255,120,80,0.05)] ring-1 ring-[rgba(255,140,90,0.3)] shadow-[0_0_20px_-5px_rgba(255,100,50,0.15)] text-[rgba(255,140,90,0.9)]",
                className
            )}
            role="figure"
        >
            {/* Scanline overlay for problem tone */}
            {isProblem && (
                <div
                    className="absolute inset-0 pointer-events-none opacity-20 z-0"
                    style={{
                        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 100, 50, 0.1) 3px)"
                    }}
                />
            )}

            {/* Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};
