"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { useTour } from "./TourContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TourOverlay = () => {
    const { isTourActive, currentStepIndex, steps, endTour, nextStep, prevStep } = useTour();
    const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
    const [mounted, setMounted] = useState(false);
    const originalOverflowRef = useRef<string>("");

    // Mount check prevents hydration mismatch
    useEffect(() => {
        setMounted(true);
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

    // 2. RECT CALCULATION (ROBUST & DEBOUNCED)
    const updateRect = () => {
        if (!isTourActive || currentStepIndex === -1) return;

        const step = steps[currentStepIndex];
        if (!step) return;

        const selector = `[data-tour="${step.target}"]`;
        const element = document.querySelector(selector);

        let newRect: DOMRect;

        if (element) {
            // Smooth scroll to target
            element.scrollIntoView({ behavior: "smooth", block: "center" });
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

    // React to step changes
    useEffect(() => {
        if (!isTourActive) return;

        // Immediate update request
        updateRect();

        // Safety checks for layout shifts (after animations/scroll)
        const t1 = setTimeout(updateRect, 100);
        const t2 = setTimeout(updateRect, 400);

        const onResize = () => requestAnimationFrame(updateRect);
        window.addEventListener("resize", onResize);
        window.addEventListener("scroll", onResize, { passive: true });

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("scroll", onResize);
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

    const content = (
        <div className="fixed inset-0 z-[9999] isolate pointer-events-auto">
            {/* BACKDROP: Always visible. Uses 4-part if rect exists, else full screen. */}
            {!useBackupRect ? (
                <>
                    <div className="absolute top-0 left-0 w-full pointer-events-auto transition-all duration-300 ease-out" style={{ height: top, backgroundColor: overlayColor }} />
                    <div className="absolute left-0 pointer-events-auto transition-all duration-300 ease-out" style={{ top: top, height: height, width: left, backgroundColor: overlayColor }} />
                    <div className="absolute right-0 pointer-events-auto transition-all duration-300 ease-out" style={{ top: top, height: height, width: windowWidth - right, backgroundColor: overlayColor }} />
                    <div className="absolute bottom-0 left-0 w-full pointer-events-auto transition-all duration-300 ease-out" style={{ top: bottom, height: windowHeight - bottom, backgroundColor: overlayColor }} />
                </>
            ) : (
                <div className="absolute inset-0 bg-black/75 transition-opacity duration-300" />
            )}

            {/* SPOTLIGHT BORDER */}
            <motion.div
                layout
                initial={false}
                animate={{
                    top: top - 4,
                    left: left - 4,
                    width: width + 8,
                    height: height + 8
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute border-2 border-accent rounded-lg pointer-events-none z-[10000] shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            />

            {/* INTERACTIVE CARD */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStepIndex}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-[10001] pointer-events-auto w-[320px] bg-background/95 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl"
                    style={{
                        // Intelligent positioning: prefer bottom, flip to top if space limited
                        top: (bottom + 20 + 300 > windowHeight) ? Math.max(20, top - 280) : bottom + 20,
                        left: Math.max(20, Math.min(windowWidth - 340, left + (width / 2) - 160))
                    }}
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-accent">
                            Paso {(currentStepIndex || 0) + 1} / {steps.length}
                        </span>
                        <button onClick={endTour} className="text-muted-foreground hover:text-foreground p-1 hover:bg-white/10 rounded-full transition-colors">
                            <X size={16} />
                        </button>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-foreground">{steps[currentStepIndex]?.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {steps[currentStepIndex]?.content}
                    </p>

                    <div className="flex gap-2">
                        {(currentStepIndex || 0) > 0 && (
                            <Button variant="outline" size="sm" onClick={prevStep} className="flex-1">
                                <ChevronLeft size={16} className="mr-1" /> Atrás
                            </Button>
                        )}
                        <Button variant="glow" size="sm" onClick={nextStep} className="flex-1">
                            {currentStepIndex === steps.length - 1 ? "Finalizar" : "Siguiente"}
                            {currentStepIndex !== steps.length - 1 && <ChevronRight size={16} className="ml-1" />}
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );

    // Robust Portal Target
    const root = document.getElementById("tour-root");
    if (root) return createPortal(content, root);
    if (typeof document !== 'undefined') return createPortal(content, document.body);
    return null;
};
