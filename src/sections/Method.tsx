"use client";

import { useContent } from "@/components/ContentProvider";
import { SectionShell } from "@/components/layout/SectionShell";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";

export const Method = () => {
    const { method } = useContent() as any;
    const { steps = [] } = method || {};

    return (
        <SectionShell id="metodo" data-tour-step="3" className="pb-0" containerClassName="border-t border-border/10 pt-20">
            <MotionWrapper className="text-center mb-16" preset="fade">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{method.title}</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    {method.subtitle}
                </p>
            </MotionWrapper>

            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step: any, idx: number) => (
                    <MotionWrapper key={idx} delay={idx * 0.1} preset="up">
                        <div className="relative group">
                            <div className="absolute -top-4 -left-4 text-7xl font-black text-accent/5 transition-colors group-hover:text-accent/10">
                                {step.step}
                            </div>
                            <GlassCard className="relative z-10 border-white/5 bg-white/[0.01]" interactive>
                                <h3 className="text-xl font-bold mb-4 pt-4">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
                            </GlassCard>
                        </div>
                    </MotionWrapper>
                ))}
            </div>
        </SectionShell>
    );
};
