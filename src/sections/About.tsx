"use client";

import { useContent } from "@/components/ContentProvider";
import { SectionShell } from "@/components/layout/SectionShell";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";

export const About = () => {
    const { about } = useContent() as any;
    const { paragraphs = [], achievements = [] } = about || {};

    return (
        <div data-tour-step="about">
            <SectionShell id="sobre-mi">
                <div className="grid md:grid-cols-5 gap-16">
                    <div className="md:col-span-3">
                        <MotionWrapper preset="up">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">{about.title}</h2>
                            <p className="text-xl font-medium mb-8 text-accent">
                                {about.lead}
                            </p>
                            <div className="space-y-6 text-muted-foreground leading-relaxed">
                                {paragraphs.map((p: any, idx: number) => (
                                    <p key={idx}>{p}</p>
                                ))}
                            </div>
                            <p className="mt-8 font-serif text-2xl border-l-[3px] border-accent pl-6 py-2 bg-accent/5 rounded-r-lg">
                                {about.signatureLine}
                            </p>
                        </MotionWrapper>
                    </div>

                    <div className="md:col-span-2">
                        <MotionWrapper delay={0.2} preset="scale" className="h-full">
                            <GlassCard className="h-full border-white/10 flex flex-col justify-center items-center p-12 text-center bg-white/[0.02]" interactive>
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 mb-8 flex items-center justify-center text-5xl shadow-2xl shadow-accent/20">
                                    🚀
                                </div>
                                <p className="text-[10px] font-mono tracking-widest opacity-40 mb-2 uppercase">Founder_Verification_OK</p>
                                <h4 className="font-bold text-lg">Evolución Garantizada</h4>
                                <div className="mt-6 h-px w-12 bg-accent/30" />
                            </GlassCard>
                        </MotionWrapper>
                    </div>
                </div>
            </SectionShell>

            <SectionShell id="reconocimientos" className="py-0 overflow-hidden" containerClassName="max-w-none px-0">
                <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/5">
                    {achievements.map((item: any, idx: number) => (
                        <MotionWrapper key={idx} delay={idx * 0.1} preset="fade" className="py-16 md:py-24 text-center border-b md:border-b-0 md:border-r last:border-0 border-white/5 group hover:bg-white/[0.02] transition-colors">
                            <div className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-white group-hover:text-accent transition-colors duration-500">
                                {item.value}
                            </div>
                            <div className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground group-hover:text-white transition-colors duration-500">
                                {item.label}
                            </div>
                        </MotionWrapper>
                    ))}
                </div>
            </SectionShell>
        </div>
    );
};
