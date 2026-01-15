"use client";

import { useContent } from "@/components/ContentProvider";
import { SectionShell } from "@/components/layout/SectionShell";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";

export const Problem = () => {
    const { problem } = useContent() as any;
    const { bullets = [] } = problem || {};

    return (
        <SectionShell id="problema" data-tour-step="problem">
            <MotionWrapper className="max-w-4xl mx-auto text-center" preset="up">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">
                    {problem.title}
                </h2>
                <p className="text-xl text-muted-foreground mb-16 italic">
                    {problem.subtitle}
                </p>

                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    {bullets.map((bullet: any, idx: number) => (
                        <div key={idx} className="space-y-4 flex flex-col items-center md:items-start">
                            <div className="text-4xl text-accent p-3 bg-accent/10 rounded-2xl w-fit mx-auto md:mx-0">
                                <span className="sr-only">Icon</span>
                                {/* Icon placeholder logic from Phase 2 */}
                                💼
                            </div>
                            <h3 className="text-xl font-bold">{bullet.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {bullet.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </MotionWrapper>
        </SectionShell>
    );
};
