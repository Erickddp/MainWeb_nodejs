"use client";

import { useContent } from "@/components/ContentProvider";
import { SectionShell } from "@/components/layout/SectionShell";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Terminal } from "@/components/ui/Terminal";
import { cn } from "@/lib/utils";

export const Tools = () => {
    const { tools } = useContent() as any;
    const { evoapp = { terminalLines: [] }, evotools = {}, evolab = {} } = tools || {};

    return (
        <SectionShell id="herramientas" data-tour-step="tools">
            <MotionWrapper className="text-center mb-16" preset="fade">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Herramientas Propias</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Evosys: El motor que impulsa cada decisión con precisión quirúrgica.
                </p>
            </MotionWrapper>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* EVOAPP - Signature Element */}
                <div className="lg:col-span-8">
                    <MotionWrapper preset="up">
                        <GlassCard className="h-full border-accent/30 bg-accent/[0.02] p-8 md:p-12 overflow-hidden flex flex-col md:flex-row gap-8 items-center" interactive>
                            <div className="flex-1 space-y-6">
                                <div>
                                    <span className="inline-block px-2 py-1 rounded bg-accent/20 text-accent text-[10px] font-bold mb-4 tracking-widest uppercase">
                                        {evoapp.statusLabel}
                                    </span>
                                    <h3 className="text-3xl font-bold mb-4">{evoapp.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {evoapp.desc}
                                    </p>
                                </div>
                                <Button
                                    variant="glow"
                                    className="px-8"
                                >
                                    {evoapp.ctaLabel}
                                </Button>
                            </div>
                            <div className="w-full md:w-1/2">
                                <Terminal lines={evoapp.terminalLines || []} className="shadow-accent/20" />
                            </div>
                        </GlassCard>
                    </MotionWrapper>
                </div>

                {/* Other Tools */}
                <div className="lg:col-span-4 grid gap-8">
                    <ToolMiniCard tool={evotools} index={1} />
                    <ToolMiniCard tool={evolab} index={2} />
                </div>
            </div>
        </SectionShell>
    );
};

const ToolMiniCard = ({ tool, index }: { tool: any; index: number }) => (
    <MotionWrapper preset="scale" delay={index * 0.1}>
        <GlassCard className="h-full p-6 flex flex-col justify-between" interactive>
            <div className="space-y-4">
                <h4 className="text-xl font-bold">{tool.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {tool.desc}
                </p>
            </div>
            <Button
                variant="outline"
                size="sm"
                className="mt-6 w-fit"
            >
                {tool.ctaLabel}
            </Button>
        </GlassCard>
    </MotionWrapper>
);
