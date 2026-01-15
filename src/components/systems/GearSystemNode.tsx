"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useSpring,
    useReducedMotion,
    useTransform,
    MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

// --- Utility: Generate Gear Path Centered at 0,0 ---
const createGearPath = (
    teeth: number,
    outerRadius: number,
    innerRadius: number,
    holeRadius: number = 0
): string => {
    const cx = 0;
    const cy = 0;
    const steps = teeth * 2;
    const angleStep = (Math.PI * 2) / steps;

    let d = "";

    for (let i = 0; i < steps; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = i * angleStep;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    }
    d += " Z";

    // Hole
    if (holeRadius > 0) {
        d += ` M ${cx + holeRadius} ${cy}`;
        d += ` A ${holeRadius} ${holeRadius} 0 1 0 ${cx - holeRadius} ${cy}`;
        d += ` A ${holeRadius} ${holeRadius} 0 1 0 ${cx + holeRadius} ${cy}`;
    }

    return d;
};

// --- Sub-Component: Gear ---
interface GearProps {
    x: number;
    y: number;
    size: number;
    teeth: number;
    driveMin: MotionValue<number>;
    ratio: number;
    direction?: 1 | -1;
    color?: string;
    opacity?: number;
}

const Gear = React.memo(({
    x,
    y,
    size,
    teeth,
    driveMin,
    ratio,
    direction = 1,
    color = "currentColor",
    opacity = 0.2
}: GearProps) => {
    // Determine rotation
    const rotation = useTransform(driveMin, (v) => v * ratio * direction);

    // Generate path once
    const r = size / 2;
    const rInner = r * 0.8;
    const rHole = r * 0.3;

    const pathData = useMemo(
        () => createGearPath(teeth, r, rInner, rHole),
        [teeth, r]
    );

    return (
        <motion.g
            style={{
                translateX: x,
                translateY: y,
                rotate: rotation,
                willChange: "transform",
            }}
        >
            <path
                d={pathData}
                fill={color}
                fillOpacity={opacity}
                stroke={color}
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
            />
            {/* Decoration: Inner Ring */}
            <circle cx="0" cy="0" r={rHole + (rInner - rHole) * 0.5} stroke={color} strokeWidth="1" fill="none" opacity={opacity} />
        </motion.g>
    );
});
Gear.displayName = "Gear";


// --- Configs (ViewBox 1000 x 1000) ---
type GearConfig = { id: string; x: number; y: number; size: number; teeth: number; ratio: number; direction: 1 | -1; opacity: number; };

const DESKTOP_GEARS: GearConfig[] = [
    { id: "main", x: 500, y: 500, size: 360, teeth: 24, ratio: 1.0, direction: 1, opacity: 0.15 },
    { id: "sat1", x: 740, y: 500, size: 160, teeth: 12, ratio: 2.0, direction: -1, opacity: 0.1 },
    { id: "sat2", x: 260, y: 500, size: 160, teeth: 12, ratio: 2.0, direction: -1, opacity: 0.1 },
    { id: "top", x: 500, y: 240, size: 200, teeth: 14, ratio: 1.7, direction: -1, opacity: 0.08 },
    { id: "bot", x: 500, y: 760, size: 200, teeth: 14, ratio: 1.7, direction: -1, opacity: 0.08 },
    { id: "tl", x: 200, y: 200, size: 120, teeth: 10, ratio: 2.4, direction: 1, opacity: 0.05 },
    { id: "br", x: 800, y: 800, size: 120, teeth: 10, ratio: 2.4, direction: 1, opacity: 0.05 },
];

const MOBILE_GEARS: GearConfig[] = [
    { id: "m-center", x: 500, y: 500, size: 400, teeth: 20, ratio: 1.0, direction: 1, opacity: 0.15 },
    { id: "m-top", x: 500, y: 180, size: 280, teeth: 14, ratio: 1.4, direction: -1, opacity: 0.12 },
    { id: "m-bot", x: 500, y: 820, size: 280, teeth: 14, ratio: 1.4, direction: -1, opacity: 0.12 },
    { id: "m-l1", x: 150, y: 350, size: 220, teeth: 12, ratio: 1.6, direction: -1, opacity: 0.08 },
    { id: "m-r1", x: 850, y: 350, size: 220, teeth: 12, ratio: 1.6, direction: -1, opacity: 0.08 },
    { id: "m-l2", x: 150, y: 650, size: 220, teeth: 12, ratio: 1.6, direction: -1, opacity: 0.08 },
    { id: "m-r2", x: 850, y: 650, size: 220, teeth: 12, ratio: 1.6, direction: -1, opacity: 0.08 },
    { id: "m-tl", x: 100, y: 100, size: 180, teeth: 10, ratio: 2.0, direction: 1, opacity: 0.05 },
    { id: "m-tr", x: 900, y: 100, size: 180, teeth: 10, ratio: 2.0, direction: 1, opacity: 0.05 },
    { id: "m-bl", x: 100, y: 900, size: 180, teeth: 10, ratio: 2.0, direction: 1, opacity: 0.05 },
    { id: "m-br", x: 900, y: 900, size: 180, teeth: 10, ratio: 2.0, direction: 1, opacity: 0.05 },
];


interface GearSystemNodeProps {
    baseSpeed?: number;
    boostMultiplier?: number;
    className?: string;
    debug?: boolean;
}

export default function GearSystemNode({
    baseSpeed = 15,
    boostMultiplier = 0.2, // fast boost
    className,
    debug = false,
}: GearSystemNodeProps) {
    const reducedMotionPreference = useReducedMotion();
    const [isBoosted, setIsBoosted] = useState(false);

    // Responsive Logic
    const [gears, setGears] = useState<GearConfig[]>(DESKTOP_GEARS);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            if (mobile) {
                if (debug) console.log("Gears: Switched to MOBILE");
                setGears(MOBILE_GEARS);
            } else {
                setGears(DESKTOP_GEARS);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [debug]);

    // Physics
    const masterRotation = useMotionValue(0);
    const baseVelocity = 360 / baseSpeed;
    const boostVelocity = 360 / (baseSpeed * boostMultiplier);
    const effectiveBase = reducedMotionPreference ? 0.5 : baseVelocity;
    const effectiveBoost = reducedMotionPreference ? 0.5 : boostVelocity;
    const targetVelocity = isBoosted ? effectiveBoost : effectiveBase;

    const velocity = useSpring(targetVelocity, {
        stiffness: 40,
        damping: 20,
        mass: 1,
    });

    useAnimationFrame((time, delta) => {
        const safeDelta = Math.min(delta, 64);
        const step = (velocity.get() / 1000) * safeDelta;
        masterRotation.set(masterRotation.get() + step);
    });

    // --- Interaction Handlers (Robust Cross-Platform) ---
    const activate = useCallback((e?: any) => {
        if (debug) console.log("Interaction: Active", e?.type);
        setIsBoosted(true);
    }, [debug]);

    const deactivate = useCallback((e?: any) => {
        if (debug) console.log("Interaction: Inactive", e?.type);
        setIsBoosted(false);
    }, [debug]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            if (debug) console.log("Interaction: Key toggle");
            setIsBoosted(prev => !prev);
            e.preventDefault();
        }
    }, [debug]);

    return (
        <div
            role="button"
            tabIndex={0}
            className={cn(
                "relative flex items-center justify-center overflow-hidden outline-none",
                "cursor-pointer select-none",
                "z-10", // Ensure z-index is positive
                className
            )}
            // POINTER EVENTS (Modern standard)
            // Captures both Mouse and Touch in most modern browsers
            onPointerDown={activate}
            onPointerUp={deactivate}
            onPointerCancel={deactivate}
            onPointerLeave={deactivate} // For mouse leaving the area

            // TOUCH EVENTS (iOS Safari Fallback & Specifics)
            // Sometimes Pointer events are delayed or behave physically differently on older webkit
            onTouchStart={activate}
            onTouchEnd={deactivate}
            onTouchCancel={deactivate}

            // MOUSE (Specific Desktop Hover Fallback)
            onMouseEnter={activate}
            onMouseLeave={deactivate}

            // KEYBOARD
            onKeyDown={handleKeyDown}

            style={{
                touchAction: "manipulation", // Allows scrolling but removes tap delay
                WebkitTapHighlightColor: "transparent" // Removes gray highlight on mobile tap
            }}
            aria-label="Interactive Gear System: Tap to speed up"
        >
            <svg
                viewBox="0 0 1000 1000"
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full text-accent pointer-events-none" // Content doesn't block interaction on parent
                style={{
                    filter: "drop-shadow(0px 0px 10px rgba(var(--accent-rgb), 0.1))",
                }}
            >
                {/* Connecting lines */}
                <path
                    d="M 500 500 L 200 200 M 500 500 L 800 800 M 500 500 L 500 180 M 500 500 L 850 350"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="opacity-10"
                    vectorEffect="non-scaling-stroke"
                />

                {gears.map((g) => (
                    <Gear
                        key={g.id}
                        x={g.x}
                        y={g.y}
                        size={g.size}
                        teeth={g.teeth}
                        ratio={g.ratio}
                        direction={g.direction}
                        driveMin={masterRotation}
                        opacity={g.opacity}
                    />
                ))}
            </svg>

            {/* Glossy overlay inside interaction area needs to ignore pointer events to let parent div catch them? 
                Actually parent div catches them, this is just visual. 
                pointer-events-none makes sure it doesn't block bubbling if that were an issue.
            */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
        </div>
    );
}
