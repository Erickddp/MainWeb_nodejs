"use client";

import { useContent } from "@/components/ContentProvider";
import { SectionShell } from "@/components/layout/SectionShell";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { Button } from "@/components/ui/button";
import { scrollToAnchor } from "@/lib/utils";

export const Cta = () => {
    const { cta } = useContent() as any;

    return (
        <SectionShell className="bg-white text-black py-0 md:py-0 overflow-hidden" containerClassName="max-w-none px-0">
            <MotionWrapper className="text-center py-24 md:py-40 bg-white" preset="fade">
                <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic">
                    {cta.title}
                </h2>
                <p className="text-xl md:text-2xl opacity-60 mb-12 max-w-3xl mx-auto font-medium">
                    {cta.subtitle}
                </p>
                <Button
                    size="lg"
                    variant="glow"
                    className="bg-black text-white hover:bg-black/90 px-12 py-8 text-xl rounded-full"
                    onClick={() => scrollToAnchor("contacto")}
                >
                    {cta.ctaLabel}
                </Button>
            </MotionWrapper>
        </SectionShell>
    );
};
