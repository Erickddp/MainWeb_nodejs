"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const RepeatedErrorsLoop = () => {
    const [isBoosted, setIsBoosted] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const handleStart = () => setIsBoosted(true);
    const handleEnd = () => setIsBoosted(false);

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
            aria-label="Animación de errores repetitivos en bucle"
        >
            <motion.svg
                viewBox="0 0 100 100"
                className="w-full h-full p-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={
                    isBoosted && !shouldReduceMotion
                        ? { x: [0, -1, 1, -1, 1, 0] }
                        : { x: 0 }
                }
                transition={{ duration: 0.2, repeat: isBoosted ? Infinity : 0, repeatDelay: 2 }}
            >
                {/* Definition for gradient if needed, but keeping simple current color */}

                {/* Infinite Loop Path (Circle) */}
                <circle
                    cx="50"
                    cy="50"
                    r="30"
                    className="opacity-20"
                    vectorEffect="non-scaling-stroke"
                />

                {/* Jittery "Error" Marker on the track */}
                <motion.circle
                    cx="50"
                    cy="20" // Top of circle (cy = 50 - 30)
                    r="2"
                    className="opacity-50"
                    animate={
                        !shouldReduceMotion
                            ? {
                                opacity: [0.3, 1, 0.3],
                                x: [0, -2, 2, -1, 1, 0, 0, 0, 0, 0], // Sharp jitter
                            }
                            : {}
                    }
                    transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1] }}
                // vectorEffect="non-scaling-stroke"
                />

                {/* Rotating Segment/Dot - With Hiccups */}
                {!shouldReduceMotion && (
                    <motion.g
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: isBoosted ? 1 : 3,
                            repeat: Infinity,
                            ease: "linear", // Base linear, but simulated hiccup via speed change if we used keyframes. 
                            // Since we want hiccups, let's use keyframes for rotation instead of simple 360
                        }}
                        style={{ originX: "50px", originY: "50px" }}
                    >
                        <circle cx="50" cy="20" r="4" fill="currentColor" filter="drop-shadow(0 0 2px currentColor)" />
                        {/* Phantom tail */}
                        <path d="M 50 20 A 30 30 0 0 0 25 35" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" fill="none" />
                    </motion.g>
                )}
            </motion.svg>
        </div>
    );
};
