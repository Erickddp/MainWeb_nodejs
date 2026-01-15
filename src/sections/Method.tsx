"use client";

import { useContent } from "@/components/ContentProvider";
import { SectionShell } from "@/components/layout/SectionShell";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";

export const Method = () => {
    const { method } = useContent() as any;
    const { steps = [] } = method || {};

    return (
        <SectionShell
            id="metodo"
            className="pb-0"
            containerClassName="border-t border-border/10 pt-20"
        >
            <MotionWrapper className="text-center mb-16" preset="fade">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{method.title}</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    {method.subtitle}
                </p>
            </MotionWrapper>

            <div className="grid gap-8 md:grid-cols-3 items-stretch">
                {steps.map((step: any, idx: number) => (
                    <MotionWrapper key={idx} delay={idx * 0.08} preset="up">
                        <div className="relative group h-full">
                            {/* Numero: más alineado, más “premium”, y siempre encima */}
                            <div className="absolute -top-6 -left-2 z-20 text-7xl md:text-8xl font-black tracking-tight text-accent/20 group-hover:text-accent/45 transition-all duration-300 group-hover:-translate-y-0.5 select-none pointer-events-none">
                                {step.step}
                            </div>

                            {/* Glow suave en hover */}
                            <div className="absolute -inset-2 rounded-3xl bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <GlassCard
                                className="
                  relative z-10 h-full
                  border-white/10 bg-white/[0.02]
                  rounded-3xl
                  p-8
                  pt-12
                  transition-all duration-300
                  hover:-translate-y-1 active:scale-[0.99] 
                  hover:shadow-xl hover:shadow-accent/10
                "
                                interactive
                            >
                                {/* Línea superior tipo “status bar” */}
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

                                <h3 className="text-xl font-bold mb-3">
                                    {step.title}
                                </h3>

                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {step.desc}
                                </p>

                                {/* Mini indicador inferior (da sensación de sistema) */}
                                <div className="mt-6 h-px w-12 bg-accent/30 group-hover:w-16 transition-all duration-300" />
                            </GlassCard>
                        </div>
                    </MotionWrapper>
                ))}
            </div>
        </SectionShell>
    );
};
