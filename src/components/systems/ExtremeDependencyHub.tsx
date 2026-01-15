"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export const ExtremeDependencyHub = () => {
    const [isBoosted, setIsBoosted] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const handleStart = () => setIsBoosted(true);
    const handleEnd = () => setIsBoosted(false);

    // Satellite positions around center (50, 50) with radius ~30
    const satellites = [
        { x: 50, y: 20 },
        { x: 76, y: 35 },
        { x: 76, y: 65 },
        { x: 50, y: 80 },
        { x: 24, y: 65 },
        { x: 24, y: 35 },
    ];

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
            aria-label="Animación de dependencia extrema con fallo central"
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
                {/* Connections */}
                {satellites.map((pos, i) => (
                    <motion.line
                        key={`line-${i}`}
                        x1="50"
                        y1="50"
                        x2={pos.x}
                        y2={pos.y}
                        className="origin-center"
                        animate={{
                            opacity: isBoosted ? 0.1 : 0.4,
                            strokeDasharray: isBoosted ? "4 4" : "0 0"
                        }}
                        transition={{ duration: 0.3 }}
                        strokeWidth="1.5"
                    />
                ))}

                {/* Satellites */}
                {satellites.map((pos, i) => (
                    <motion.circle
                        key={`sat-${i}`}
                        cx={pos.x}
                        cy={pos.y}
                        r="3"
                        animate={{
                            opacity: isBoosted ? 0.2 : 0.8,
                            scale: isBoosted ? 0.8 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        fill="currentColor"
                        className="drop-shadow-sm"
                    />
                ))}

                {/* Central Hub - Failure Simulation */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="8"
                    fill="currentColor"
                    animate={
                        shouldReduceMotion
                            ? {}
                            : isBoosted
                                ? {
                                    scale: [0.8, 0.7, 0.85, 0.75, 0.8],
                                    opacity: [0.3, 0.2, 0.4, 0.2, 0.3],
                                    x: [0, -1, 1, 0, 0] // Shake
                                }
                                : { scale: [1, 1.1, 1], opacity: 1, x: 0 }
                    }
                    transition={{
                        duration: isBoosted ? 0.2 : 2,
                        repeat: Infinity,
                        ease: isBoosted ? "linear" : "easeInOut",
                    }}
                    className="drop-shadow-md z-10"
                />

                {/* Warning Icon when failed */}
                <motion.path
                    d="M 50 46 L 50 52 M 50 55 L 50 55"
                    stroke="black" // or dark color for contrast inside the hub
                    strokeWidth="2"
                    animate={{ opacity: isBoosted ? 1 : 0 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                />
            </svg>
        </div>
    );
};
