"use client";

import React, { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const ManualCaptureFlow = () => {
    const [isBoosted, setIsBoosted] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    // Interaction handlers
    const handleStart = () => setIsBoosted(true);
    const handleEnd = () => setIsBoosted(false);

    // Path for the flow: A line that goes almost to end, then loops back
    // ViewBox 100x100
    // Start (10, 50) -> Right (70, 50) -> Loop Back (40, 30) -> Rejoin (60, 50)
    const pathD = "M 20 50 L 60 50 C 70 50 75 45 65 35 C 55 25 45 35 55 50 L 80 50";

    return (
        <div
            className="w-full h-full flex items-center justify-center text-accent/80"
            onPointerDown={handleStart}
            onPointerUp={handleEnd}
            onPointerCancel={handleEnd}
            onMouseEnter={handleStart}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
            onTouchCancel={handleEnd}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setIsBoosted(true);
            }}
            onKeyUp={() => setIsBoosted(false)}
            style={{ touchAction: "manipulation" }}
            aria-label="Animación de flujo manual con retrocesos"
        >
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full p-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {/* Base Track */}
                <path
                    d={pathD}
                    className="opacity-20"
                    vectorEffect="non-scaling-stroke"
                />

                {/* Nodes */}
                <circle cx="20" cy="50" r="2" className="opacity-50" />
                <circle cx="30" cy="50" r="2" className="opacity-50" />
                <circle cx="40" cy="50" r="2" className="opacity-50" />
                <circle cx="50" cy="50" r="2" className="opacity-50" />
                <circle cx="60" cy="50" r="2" className="opacity-50" />
                <circle cx="70" cy="50" r="2" className="opacity-50" />
                <circle cx="80" cy="50" r="2" className="opacity-50" />

                {/* Problem Node (Blinking on manual capture - Irregular/Error) */}
                {!shouldReduceMotion && (
                    <motion.circle
                        cx="60"
                        cy="50"
                        r="3"
                        className="text-current"
                        animate={{
                            opacity: [0.3, 1, 0.3, 0.3, 0.8, 0.2], // Irregular flicker
                            scale: [1, 1.3, 1, 1, 1.1, 1],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            times: [0, 0.1, 0.2, 0.6, 0.7, 1], // Erratic timing
                            ease: "easeInOut",
                        }}
                    />
                )}

                {/* Moving Dot (Replica del esfuerzo manual - Backflow/Crash) */}
                {!shouldReduceMotion && (
                    <motion.circle
                        r="3"
                        fill="currentColor"
                        filter="drop-shadow(0 0 2px currentColor)"
                    >
                        <animateMotion
                            path={pathD}
                            dur={isBoosted ? "1s" : "3s"}
                            calcMode="linear"
                            keyTimes="0; 0.4; 0.6; 1"
                            keyPoints="0; 0.9; 0.6; 0" // Go almost to end (0.9), abruptly go back (0.6), then fail to start (0)
                            repeatCount="indefinite"
                        />
                    </motion.circle>
                )}
            </svg>
        </div>
    );
};
