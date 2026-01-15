"use client";

import { useState } from "react";
import { useContent } from "@/components/ContentProvider";
import { SectionShell } from "@/components/layout/SectionShell";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { scrollToAnchor } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const Services = () => {
    const { services = [] } = useContent();
    const [activeTab, setActiveTab] = useState(services[0]?.id || "");

    const activeService = services.find(s => s.id === activeTab) || services[0];

    if (!activeService) return null;

    return (
        <SectionShell
            id="servicios"
            data-tour-step="services"
            className="py-14 md:py-24"
        >
            {/* Pill Selector */}
            <div
                className="flex flex-wrap justify-center gap-4 mb-8 md:mb-16"

                role="tablist"
                aria-label="Servicios de Evorix"
            >
                {services.map((service) => (
                    <button
                        key={service.id}
                        onClick={() => setActiveTab(service.id)}
                        role="tab"
                        aria-selected={activeTab === service.id}
                        aria-controls={`panel-${service.id}`}
                        id={`tab-${service.id}`}
                        className={cn(
                            "relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent",
                            activeTab === service.id
                                ? "text-white"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {activeTab === service.id && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-accent rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{service.title}</span>
                    </button>
                ))}
            </div>

            {/* Content Panel */}
            <div className="max-w-4xl mx-auto min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        id={`panel-${activeTab}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${activeTab}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <GlassCard className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center overflow-hidden bg-white/70 border border-black/10 shadow-sm dark:bg-black/40 dark:border-white/10 dark:shadow-accent/20">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-white/70">
                                        {activeService.title}
                                    </h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {activeService.intro}
                                    </p>
                                </div>

                                <ul className="space-y-4">
                                    {(activeService.bullets || []).map((bullet, bIdx) => (
                                        <motion.li
                                            key={bIdx}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + bIdx * 0.1 }}
                                            className="flex items-center gap-3 text-foreground/80"
                                        >
                                            <div className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                            {bullet}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col justify-center items-center md:items-end space-y-8">
                                <div className="text-center md:text-right space-y-2">
                                    <p className="text-sm uppercase tracking-widest text-accent font-bold">Inversión</p>
                                    <p className="text-2xl font-bold">{activeService.priceLabel}</p>
                                </div>

                                <div className="w-full max-w-[280px] space-y-4">
                                    <div className="p-4 rounded-xl bg-white/80 border border-black/10 shadow-sm dark:bg-black/30 dark:border-white/10 dark:shadow-accent/20">
                                        <p className="text-xs text-muted-foreground mb-2 uppercase font-semibold">Ideal para:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {(activeService.idealFor || []).map((item, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[10px] px-2 py-1 rounded-md bg-black/5 text-foreground/80 dark:bg-white/10 dark:text-white/90"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <Button
                                        variant="glow"
                                        className="w-full py-6 text-lg"
                                        onClick={() => scrollToAnchor("contacto")}
                                    >
                                        {activeService.ctaLabel}
                                    </Button>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </AnimatePresence>
            </div>
        </SectionShell>
    );
};
