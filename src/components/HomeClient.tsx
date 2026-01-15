"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { PageBuilder } from "@/components/PageBuilder";
import { ParticleBackground } from "@/components/fx/ParticleBackground";
import { SectionModeManager } from "@/components/fx/SectionModeManager";
import { ParticleMode } from "@/lib/particles/types";

export const HomeClient = () => {
    const [particleMode, setParticleMode] = useState<ParticleMode>("hero_index");

    return (
        <div className="relative min-h-screen font-sans selection:bg-accent selection:text-accent-foreground">
            <SectionModeManager onModeChange={setParticleMode} />
            <ParticleBackground mode={particleMode} />
            <Header />
            <main className="relative z-10">
                <PageBuilder />
            </main>
        </div>
    );
};
