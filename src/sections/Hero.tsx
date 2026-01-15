"use client";

import { useContent } from "@/components/ContentProvider";
import { SectionShell } from "@/components/layout/SectionShell";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { scrollToAnchor } from "@/lib/utils";
import { useTour } from "@/components/tour/TourContext";
import { Play } from "lucide-react";

export const Hero = () => {
    const { hero } = useContent();
    const { startTour } = useTour();

    return (
        <SectionShell
            id="inicio"
            data-tour="hero"
            className="min-h-screen flex items-center pt-24 md:pt-40"
        >
            <MotionWrapper className="max-w-3xl" preset="up" immediate>
                <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 dark:from-white dark:to-white/40">
                    {hero.title}
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
                    {hero.subtitle}
                </p>

                <div className="flex flex-wrap gap-4 items-center">
                    <Button
                        size="lg"
                        className="px-8 py-7 text-lg rounded-full"
                        onClick={() => scrollToAnchor("servicios")}
                    >
                        {hero.primaryCtaLabel}
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="px-8 py-7 text-lg rounded-full border border-border hover:bg-accent/10"
                        onClick={() => scrollToAnchor("contacto")}
                    >
                        {hero.secondaryCtaLabel}
                    </Button>

                    <button
                        type="button"
                        onClick={() => {
                            console.log("CLICK TOUR");
                            startTour();
                        }}
                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent hover:text-accent/80 transition-colors ml-2 relative z-10"
                    >
                        <span className="h-10 w-10 rounded-full border border-accent/30 flex items-center justify-center bg-accent/5">
                            <Play size={14} fill="currentColor" />
                        </span>
                        Ver recorrido guiado
                    </button>

                </div>
            </MotionWrapper>
        </SectionShell>
    );
};
