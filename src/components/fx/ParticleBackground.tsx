"use client";

import { useEffect, useRef, useState } from "react";
import { Particle, ParticleMode, MODE_CONFIGS } from "@/lib/particles/types";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

interface ParticleBackgroundProps {
    mode?: ParticleMode;
    debug?: boolean;
}

export const ParticleBackground = ({ mode = "hero_index", debug = false }: ParticleBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const particles = useRef<Particle[]>([]);
    const animationFrameId = useRef<number>(0);
    const shouldReduceMotion = useReducedMotion();
    const currentModeRef = useRef<ParticleMode>(mode);
    const ghostTriggered = useRef(false);
    const { resolvedTheme } = useTheme();
    const themeRef = useRef(resolvedTheme);

    useEffect(() => {
        themeRef.current = resolvedTheme;
    }, [resolvedTheme]);

    // Update current mode ref when prop changes
    useEffect(() => {
        currentModeRef.current = mode;
        if (mode === "evorixGhost") {
            prepareGhostFormation();
        }
    }, [mode]);

    const prepareGhostFormation = () => {
        if (!offscreenCanvasRef.current) {
            offscreenCanvasRef.current = document.createElement("canvas");
        }
        const canvas = offscreenCanvasRef.current;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        const width = 400;
        const height = 200;
        canvas.width = width;
        canvas.height = height;

        ctx.fillStyle = "white";
        ctx.font = "bold 120px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("EDDP", width / 2, height / 2);

        const imageData = ctx.getImageData(0, 0, width, height).data;
        const points: { x: number; y: number }[] = [];

        // Sample points every 4 pixels
        for (let y = 0; y < height; y += 4) {
            for (let x = 0; x < width; x += 4) {
                const alpha = imageData[(y * width + x) * 4 + 3];
                if (alpha > 128) {
                    points.push({
                        x: (x - width / 2) / width,
                        y: (y - height / 2) / height
                    });
                }
            }
        }

        // Assign targets to particles
        const pArr = particles.current;
        const count = Math.min(points.length, pArr.length);

        for (let i = 0; i < pArr.length; i++) {
            if (i < points.length) {
                const target = points[i];
                pArr[i].targetX = target.x;
                pArr[i].targetY = target.y;
                pArr[i].isGhost = true;
            } else {
                pArr[i].isGhost = false;
                pArr[i].targetX = undefined;
                pArr[i].targetY = undefined;
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
            if (currentModeRef.current === "evorixGhost") prepareGhostFormation();
        };

        const initParticles = () => {
            // Find max possible count among modes
            const maxCount = Math.max(...Object.values(MODE_CONFIGS).map(m => m.count));

            particles.current = Array.from({ length: maxCount }, () => {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                return {
                    x,
                    y,
                    originX: x,
                    originY: y,
                    size: Math.random() * 1.5 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.4 + 0.2,
                };
            });
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const mode = currentModeRef.current;
            const config = MODE_CONFIGS[mode];
            const time = Date.now() * 0.001;

            // Determine active count based on mode and device
            let activeCount = config.count;
            if (window.innerWidth < 768) activeCount *= 0.5;
            if (shouldReduceMotion) activeCount *= 0.3;

            particles.current.slice(0, Math.ceil(activeCount)).forEach((p) => {
                if (mode === "evorixGhost" && p.isGhost && p.targetX !== undefined && p.targetY !== undefined) {
                    // Form transformation
                    const targetAbsX = canvas.width / 2 + p.targetX * Math.min(canvas.width, 600);
                    const targetAbsY = canvas.height / 2 + p.targetY * 300;

                    p.x += (targetAbsX - p.x) * 0.05;
                    p.y += (targetAbsY - p.y) * 0.05;
                } else {
                    // Normal behavior
                    let vx = p.speedX * config.speed;
                    let vy = p.speedY * config.speed;

                    // Drift
                    vx += Math.sin(time + p.x * 0.01) * config.drift;
                    vy += Math.cos(time + p.y * 0.01) * config.drift;

                    // Attraction to center (hero)
                    if (config.attraction > 0) {
                        const dx = canvas.width / 2 - p.x;
                        const dy = canvas.height / 2 - p.y;
                        vx += dx * config.attraction * 0.01;
                        vy += dy * config.attraction * 0.01;
                    }

                    // Grid-ish movement for apps
                    if (config.grid) {
                        vx = Math.abs(vx) * (p.speedX > 0 ? 1 : -1) * 0.8;
                        vy = Math.abs(vy) * (p.speedY > 0 ? 1 : -1) * 0.8;
                    }

                    p.x += vx;
                    p.y += vy;

                    // Loop boundaries
                    if (p.x < -50) p.x = canvas.width + 50;
                    if (p.x > canvas.width + 50) p.x = -50;
                    if (p.y < -50) p.y = canvas.height + 50;
                    if (p.y > canvas.height + 50) p.y = -50;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                const isDark = themeRef.current === "dark";
                const baseOpacity = isDark
                    ? p.opacity * (mode === "hero_index" ? 0.3 : 0.6)
                    : p.opacity * (mode === "hero_index" ? 0.5 : 0.8);

                ctx.fillStyle = mode === "evorixGhost" && p.isGhost
                    ? `rgba(59, 130, 246, ${p.opacity * 1.5})`
                    : `rgba(${isDark ? "255, 255, 255" : "0, 0, 0"}, ${baseOpacity})`;
                ctx.fill();

                if (debug && p.isGhost && p.targetX !== undefined && p.targetY !== undefined) {
                    ctx.strokeStyle = "rgba(59, 130, 246, 0.1)";
                    ctx.lineTo(canvas.width / 2 + p.targetX * 400, canvas.height / 2 + p.targetY * 200);
                }
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, [shouldReduceMotion]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 bg-transparent transition-opacity duration-1000"
            style={{
                opacity: mode === "hero_index" ? 0.3 : 0.6,
                filter: "blur(0.5px)"
            }}
        />
    );
};
