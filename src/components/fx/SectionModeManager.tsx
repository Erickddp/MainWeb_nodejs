"use client";

import { useEffect, useRef } from "react";
import { ParticleMode } from "@/lib/particles/types";

interface SectionModeManagerProps {
    onModeChange: (mode: ParticleMode) => void;
}

const SECTION_TO_MODE: Record<string, ParticleMode> = {
    "inicio": "hero_index",
    "problema": "free",
    "metodo": "free",
    "servicios": "free",
    "ecosistema": "apps",
    "herramientas": "apps",
    "referencias": "free",
    "sobre-mi": "evorixGhost",
    "reconocimientos": "free",
    "contacto": "free",
};

export const SectionModeManager = ({ onModeChange }: SectionModeManagerProps) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const hasTriggeredGhost = useRef(false);

    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");

        observer.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    const id = entry.target.id;
                    let mode = SECTION_TO_MODE[id];

                    if (mode === "evorixGhost") {
                        const hasTriggered = sessionStorage.getItem("evorix-ghost-triggered");
                        if (hasTriggered) {
                            mode = "free";
                        } else {
                            sessionStorage.setItem("evorix-ghost-triggered", "true");
                            // Revert after 8 seconds of formation
                            setTimeout(() => {
                                onModeChange("free");
                            }, 8000);
                        }
                    }

                    if (mode) {
                        onModeChange(mode);
                    }
                }
            });
        }, {
            threshold: [0.3, 0.5, 0.8],
            rootMargin: "-10% 0px -10% 0px"
        });

        sections.forEach((section) => {
            observer.current?.observe(section);
        });

        return () => {
            observer.current?.disconnect();
        };
    }, [onModeChange]);

    return null; // Side-effect only component
};
