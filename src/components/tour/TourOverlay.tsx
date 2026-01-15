"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useTour } from "./TourContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TourOverlay = () => {
    const { isTourActive, currentStepIndex, steps, endTour, nextStep, prevStep } = useTour();
    const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
    const [mounted, setMounted] = useState(false);
    const previousOverflowRef = useRef<string>("");

    // Initial mount check for Portal
    useEffect(() => {
        setMounted(true);
    }, []);

    // Scroll Lock Management
    useEffect(() => {
        if (isTourActive && mounted) {
            previousOverflowRef.current = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = previousOverflowRef.current;
            };
        }
    }, [isTourActive, mounted]);

    // Stable update function
    const updateRect = () => {
        const step = steps[currentStepIndex];
        if (!step) return;

        // Smart selector: if it looks like a custom selector, use it; otherwise assume data-tour attribute
        const selector = /^([.#[])/.test(step.target)
            ? step.target
            : `[data-tour="${step.target}"]`;

        const element = document.querySelector(selector);



        let newRect: DOMRect;

        if (element) {
            newRect = element.getBoundingClientRect();
        } else {
            // Fallback: Center screen spotlight
            const width = Math.min(window.innerWidth * 0.8, 600);
            const height = 200;
            newRect = new DOMRect(
                (window.innerWidth - width) / 2,
                (window.innerHeight - height) / 2,
                width,
                height
            );
        }

        setHighlightRect(prev => {
            if (!prev) return newRect;
            // Equality check (1px tolerance)
            if (Math.abs(prev.x - newRect.x) < 1 &&
                Math.abs(prev.y - newRect.y) < 1 &&
                Math.abs(prev.width - newRect.width) < 1 &&
                Math.abs(prev.height - newRect.height) < 1) {
                return prev;
            }
            return newRect;
        });
    };

    useEffect(() => {
        if (!isTourActive || currentStepIndex === -1) return;

        updateRect();

        // Force an initial update slightly later to catch any layout shifts
        const timeout = setTimeout(updateRect, 100);

        let frameId: number;
        const onResize = () => {
            cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(updateRect);
        };

        window.addEventListener("scroll", onResize, { passive: true, capture: true });
        window.addEventListener("resize", onResize, { passive: true });

        return () => {
            window.removeEventListener("scroll", onResize, { capture: true });
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(frameId);
            clearTimeout(timeout);
        };
    }, [isTourActive, currentStepIndex, steps]);

    if (!mounted) return null;

    // Strict Render Gating
    if (!isTourActive || currentStepIndex === -1 || !highlightRect) return null;

    // 4-Rect Overlay Calculation
    const { top, left, width, height, bottom, right } = highlightRect;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const overlayColor = "rgba(0, 0, 0, 0.75)";

    const content = (
        <div className="fixed inset-0 z-[9999] pointer-events-none isolate" data-tour-overlay="true" data-tour-step={currentStepIndex}>

            {/* 4-Rect Backdrop (blocks clicks outside card) */}
            <div className="absolute top-0 left-0 w-full pointer-events-auto" style={{ height: top, backgroundColor: overlayColor }} />
            <div className="absolute left-0 pointer-events-auto" style={{ top: top, height: height, width: left, backgroundColor: overlayColor }} />
            <div className="absolute right-0 pointer-events-auto" style={{ top: top, height: height, width: windowWidth - right, backgroundColor: overlayColor }} />
            <div className="absolute bottom-0 left-0 w-full pointer-events-auto" style={{ top: bottom, height: windowHeight - bottom, backgroundColor: overlayColor }} />

            {/* Spotlight Border (visual only) */}
            <motion.div
                initial={false}
                animate={{
                    top: top - 4,
                    left: left - 4,
                    width: width + 8,
                    height: height + 8,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute border-2 border-accent rounded-lg pointer-events-none z-[10000]"
            />

            {/* Content Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStepIndex}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        top: bottom + 20 > windowHeight - 300
                            ? top - 280
                            : bottom + 20,
                        left: Math.max(20, Math.min(windowWidth - 340, left + (width / 2) - 160))
                    }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute w-[320px] bg-background/95 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl pointer-events-auto z-[10001]"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-accent">
                            Step {currentStepIndex + 1} / {steps.length}
                        </span>
                        <button onClick={endTour} className="text-muted-foreground hover:text-foreground transition-colors">
                            <X size={16} />
                        </button>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-foreground">{steps[currentStepIndex].title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {steps[currentStepIndex].content}
                    </p>

                    <div className="flex gap-2">
                        {currentStepIndex > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={prevStep}
                                className="flex-1"
                            >
                                <ChevronLeft size={16} className="mr-1" /> Atrás
                            </Button>
                        )}
                        <Button
                            variant="glow"
                            size="sm"
                            onClick={nextStep}
                            className="flex-1"
                        >
                            {currentStepIndex === steps.length - 1 ? "Finalizar" : "Siguiente"}
                            {currentStepIndex !== steps.length - 1 && <ChevronRight size={16} className="ml-1" />}
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );

    if (typeof document === 'undefined') return null;
    return createPortal(content, document.body);
};
