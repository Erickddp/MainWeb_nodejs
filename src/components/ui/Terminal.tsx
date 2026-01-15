"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalProps {
    lines: string[];
    className?: string;
}

export const Terminal = ({ lines, className }: TerminalProps) => {
    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });
    const hasStarted = useRef(false);

    useEffect(() => {
        if (isInView && !hasStarted.current) {
            hasStarted.current = true;
            let currentLine = 0;

            const typeLine = () => {
                if (currentLine < lines.length) {
                    setVisibleLines(prev => [...prev, lines[currentLine]]);
                    currentLine++;
                    setTimeout(typeLine, 800 + Math.random() * 500);
                } else {
                    setIsComplete(true);
                }
            };

            typeLine();
        }
    }, [isInView, lines]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "font-mono text-xs md:text-sm p-6 rounded-lg border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl relative overflow-hidden h-[240px] flex flex-col",
                className
            )}
        >
            {/* Terminal Header */}
            <div className="flex gap-1.5 mb-4 border-b border-white/5 pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <span className="ml-2 text-[10px] text-white/30 uppercase tracking-widest">system_terminal.exe</span>
            </div>

            {/* Lines */}
            <div className="flex-1 space-y-2 overflow-y-auto scrollbar-none">
                {visibleLines.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-emerald-400/90 flex gap-2"
                    >
                        <span className="opacity-50 select-none">[{i + 1}]</span>
                        <span>{line}</span>
                    </motion.div>
                ))}

                {hasStarted.current && !isComplete && (
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-emerald-400/50 ml-1 align-middle"
                    />
                )}

                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-accent/60 animate-pulse mt-4 flex items-center gap-2"
                    >
                        <span className="text-[10px] uppercase font-bold tracking-tighter">System Ready</span>
                        <div className="h-1 w-1 rounded-full bg-accent" />
                    </motion.div>
                )}
            </div>

            {/* Reflection Effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30" />
        </div>
    );
};
