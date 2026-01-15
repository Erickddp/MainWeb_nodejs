"use client";

import { useContent } from "@/components/ContentProvider";
import { Hero } from "@/sections/Hero";
import { Problem } from "@/sections/Problem";
import { Method } from "@/sections/Method";
import { Services } from "@/sections/Services";
import { Systems } from "@/sections/Systems";
import { Tools } from "@/sections/Tools";
import { Testimonials } from "@/sections/Testimonials";
import { About } from "@/sections/About";
import { Cta } from "@/sections/Cta";
import { Contact } from "@/sections/Contact";

export const PageBuilder = () => {
    const { config } = useContent();

    const sectionMap: Record<string, React.FC> = {
        hero: Hero,
        problem: Problem,
        method: Method,
        services: Services,
        systems: Systems,
        tools: Tools,
        testimonials: Testimonials,
        about: About,
        cta: Cta,
        contact: Contact,
    };

    return (
        <>
            {config.sectionOrder.map((sectionKey) => {
                const SectionComponent = sectionMap[sectionKey];
                if (!SectionComponent) return null;
                return <SectionComponent key={sectionKey} />;
            })}
        </>
    );
};
