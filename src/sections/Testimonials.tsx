"use client";

import { useContent } from "@/components/ContentProvider";
import { SectionShell } from "@/components/layout/SectionShell";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

export const Testimonials = () => {
    const { testimonials = [] } = useContent();

    return (
        <SectionShell id="referencias" data-tour="testimonials" className="overflow-hidden">
            <MotionWrapper className="text-center mb-16" preset="fade">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Resultados</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Casos reales. Personas reales.
                    Menos carga. Más tranquilidad.
                </p>
            </MotionWrapper>

            {/* Scroll Track */}
            <div className="relative -mx-4 md:-mx-12 px-4 md:px-12">
                <div
                    className="flex gap-6 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory scrollbar-none"
                    style={{ scrollPadding: "2rem" }}
                >
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            className="min-w-[300px] md:min-w-[400px] snap-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: idx * 0.5
                                }}
                            >
                                <GlassCard className="h-full italic p-8 flex flex-col justify-between border-white/5 bg-white/[0.02]">
                                    <div>
                                        <div className="text-accent text-4xl mb-6 font-serif opacity-50">“</div>
                                        <p className="text-foreground/90 text-lg mb-8 leading-relaxed">
                                            {t.quote}
                                        </p>
                                    </div>
                                    <div className="not-italic flex items-center justify-between border-t border-white/10 pt-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent/40 to-primary/40 flex items-center justify-center font-bold text-sm">
                                                {t.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm tracking-wide">{t.name}</div>
                                                <div className="text-xs text-muted-foreground uppercase">{t.role}</div>
                                            </div>
                                        </div>
                                        {t.highlight && (
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
                                                {t.highlight}
                                            </div>
                                        )}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Visual Fades */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10 hidden md:block" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 hidden md:block" />
            </div>

            <div className="mt-8 flex justify-center gap-2">
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] animate-pulse">Desliza para explorar</span>
            </div>
        </SectionShell>
    );
};
