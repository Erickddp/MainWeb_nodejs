"use client";

import { useContent } from "@/components/ContentProvider";
import { SectionShell } from "@/components/layout/SectionShell";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { SymptomIcon } from "@/components/systems/SymptomIcon";
import { ManualCaptureFlow } from "@/components/systems/ManualCaptureFlow";
import { RepeatedErrorsLoop } from "@/components/systems/RepeatedErrorsLoop";
import { ExtremeDependencyHub } from "@/components/systems/ExtremeDependencyHub";

export const Problem = () => {
    const { problem } = useContent() as any;
    const { bullets = [] } = problem || {};

    return (
        <SectionShell id="problema" data-tour="problem">
            <MotionWrapper className="max-w-4xl mx-auto text-center relative z-10" preset="up">
                {/* Title with Ghost Red Underglow */}
                <div className="relative inline-block mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,120,80,0.15)] relative z-10">
                        {problem.title}
                    </h2>
                    {/* Broken Underline */}
                    <svg className="absolute -bottom-4 left-0 w-full h-3" viewBox="0 0 200 6" preserveAspectRatio="none">
                        <path d="M 0 3 L 200 3" stroke="rgba(255, 140, 90, 0.4)" strokeWidth="2" strokeDasharray="10 15 5 20" strokeLinecap="round" />
                    </svg>
                </div>

                <p className="text-xl text-[hsl(var(--muted-foreground))] opacity-70 italic tracking-wide mb-16">
                    {problem.subtitle}
                </p>

                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    {bullets.map((bullet: any, idx: number) => (
                        <div
                            key={idx}
                            className="group space-y-4 flex flex-col items-center md:items-start p-6 rounded-3xl transition-colors duration-500
                                       bg-[rgba(255,120,80,0.03)] ring-1 ring-[rgba(255,140,90,0.15)] 
                                       hover:bg-[rgba(255,120,80,0.06)] hover:ring-[rgba(255,140,90,0.3)]
                                       hover:shadow-[0_0_25px_-10px_rgba(255,100,50,0.1)]"
                        >
                            <SymptomIcon tone="problem" className="group-hover:scale-110 transition-transform duration-300">
                                {bullet.title === "Captura Manual" && <ManualCaptureFlow />}
                                {bullet.title === "Errores Repetidos" && <RepeatedErrorsLoop />}
                                {bullet.title === "Dependencia Extrema" && <ExtremeDependencyHub />}
                            </SymptomIcon>
                            <h3 className="text-xl font-bold text-white/90 group-hover:text-white transition-colors">{bullet.title}</h3>
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
