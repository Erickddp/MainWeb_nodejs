"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useTour } from "./TourContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypewriterText } from "@/components/ui/TypewriterText";

export const TourOverlay = () => {
    const { isTourActive, currentStepIndex, steps, endTour, nextStep, prevStep } = useTour();
    const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
    const [mounted, setMounted] = useState(false);
    const originalOverflowRef = useRef<string>("");
    const [isMobile, setIsMobile] = useState(false);

    // Mount check prevents hydration mismatch
    useEffect(() => {
        setMounted(true);
        // Basic mobile detection
        setIsMobile(window.innerWidth < 768);
    }, []);

    // 1. SCROLL LOCK & ESCAPE HANDLING (BULLETPROOF)
    useEffect(() => {
        if (isTourActive) {
            // Save original and lock
            originalOverflowRef.current = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            // Escape key handler
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") endTour();
            };
            window.addEventListener("keydown", handleKeyDown);

            return () => {
                // Restore logic
                document.body.style.overflow = originalOverflowRef.current;
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [isTourActive, endTour]);

    // 2. SCROLL TO TARGET (ON STEP CHANGE ONLY)
    useEffect(() => {
        if (!isTourActive || currentStepIndex === -1) return;

        const step = steps[currentStepIndex];
        if (!step) return;

        const selector = `[data-tour="${step.target}"]`;
        const element = document.querySelector(selector);

        if (element) {
            // Run once per step change
            element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [currentStepIndex, isTourActive, steps]);

    // 3. RECT CALCULATION (PASSIVE READ)
    const updateRect = () => {
        if (!isTourActive || currentStepIndex === -1) return;

        const step = steps[currentStepIndex];
        if (!step) return;

        const selector = `[data-tour="${step.target}"]`;
        const element = document.querySelector(selector);

        let newRect: DOMRect;

        if (element) {
            // Just measure, never scroll here
            newRect = element.getBoundingClientRect();
        } else {
            // Fallback: Center spotlight
            const width = Math.min(window.innerWidth * 0.8, 600);
            const height = 200;
            newRect = new DOMRect(
                (window.innerWidth - width) / 2,
                (window.innerHeight - height) / 2,
                width,
                height
            );
        }
        setHighlightRect(newRect);
    };

    // React to resize/scroll
    useEffect(() => {
        if (!isTourActive) return;

        // Immediate update request
        updateRect();

        // Check continuously during potential smooth scroll
        let animationFrameId: number;
        const tick = () => {
            updateRect();
            animationFrameId = requestAnimationFrame(tick);
        };
        // Start loop to catch smooth scroll updates
        tick();

        const onResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", onResize);
        // Scroll listener not strictly needed if we run a RAF loop, 
        // but let's keep it mostly for passive updates if we stopped the loop.
        // Actually, a RAF loop is better for smooth-scrolling tracking than scroll event.
        // Let's rely on the loose RAF loop during tour.

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", onResize);
        };
    }, [isTourActive, currentStepIndex]);

    // 3. RENDER LOGIC
    if (!mounted) return null;
    if (!isTourActive) return null;

    // Use calculated rect OR centered fallback for initial frame to ensure visibility
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    const useBackupRect = !highlightRect;
    const activeRect = highlightRect || new DOMRect(
        (windowWidth / 2) - 300,
        (windowHeight / 2) - 100,
        600,
        200
    );

    const { top, left, width, height, bottom, right } = activeRect;
    const overlayColor = "rgba(0, 0, 0, 0.75)";

    // Tiered blur: heavy on desktop, none on mobile for performance
    const backdropClass = isMobile
        ? "absolute pointer-events-auto transition-all duration-300 ease-out"
        : "absolute pointer-events-auto transition-all duration-300 ease-out backdrop-blur-[2px]";

    const content = (
        // Wrapper is pointer-events-none to let clicks pass through the spotlight hole
        <div className="fixed inset-0 z-[9999] isolate pointer-events-none font-sans">
            {/* BACKDROP: Always visible. Uses 4-part if rect exists, else full screen. */}
            {!useBackupRect ? (
                <>
                    <div className={backdropClass} style={{ top: 0, left: 0, width: '100%', height: top, backgroundColor: overlayColor }} />
                    <div className={backdropClass} style={{ top: top, left: 0, height: height, width: left, backgroundColor: overlayColor }} />
                    <div className={backdropClass} style={{ top: top, right: 0, height: height, width: windowWidth - right, backgroundColor: overlayColor }} />
                    <div className={backdropClass} style={{ top: bottom, left: 0, width: '100%', height: windowHeight - bottom, backgroundColor: overlayColor }} />
                </>
            ) : (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto" />
            )}

            {/* SPOTLIGHT BORDER */}
            <motion.div
                layout
                initial={false}
                animate={{
                    top: top - 8,
                    left: left - 8,
                    width: width + 16,
                    height: height + 16
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute border border-accent/60 rounded-xl pointer-events-none z-[10000] shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)] box-content"
            />

            {/* CENTERED MODAL CONTAINER - Decoupled from spotlight */}
            <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStepIndex}
                        initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="pointer-events-auto w-full max-w-lg bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                    >
                        {/* Glossy overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-xs uppercase tracking-[0.2em] font-bold text-accent drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                    Paso {(currentStepIndex || 0) + 1} / {steps.length}
                                </span>
                                <button onClick={endTour} className="text-white/40 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all duration-300 group">
                                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                            </div>

                            <h3 className="text-3xl font-bold mb-4 text-white tracking-tight drop-shadow-md">
                                {steps[currentStepIndex]?.title}
                            </h3>

                            <div className="text-lg text-gray-200 leading-relaxed mb-8 min-h-[80px]">
                                <TypewriterText
                                    content={steps[currentStepIndex]?.content}
                                    speed={15}
                                />
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-white/5">
                                {(currentStepIndex || 0) > 0 && (
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={prevStep}
                                        className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-white/40 hover:text-white transition-all"
                                    >
                                        <ChevronLeft size={18} className="mr-2" /> Atrás
                                    </Button>
                                )}
                                <Button
                                    variant="glow"
                                    size="lg"
                                    onClick={nextStep}
                                    className="flex-1 text-base font-semibold shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all"
                                >
                                    {currentStepIndex === steps.length - 1 ? "Finalizar" : "Siguiente"}
                                    {currentStepIndex !== steps.length - 1 && <ChevronRight size={18} className="ml-2" />}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );

    // Robust Portal Target
    const root = document.getElementById("tour-root");
    if (root) return createPortal(content, root);
    if (typeof document !== 'undefined') return createPortal(content, document.body);
    return null;
};
