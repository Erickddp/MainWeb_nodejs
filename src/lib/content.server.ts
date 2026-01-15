import fs from "fs/promises";
import path from "path";
import { SiteContent } from "./content.types";

const CONTENT_DIR = path.join(process.cwd(), "src/content");
const DRAFTS_DIR = path.join(CONTENT_DIR, "drafts");

const DEFAULTS: any = {
    config: {
        sectionOrder: ["hero", "problem", "method", "services", "systems", "tools", "testimonials", "about", "cta", "contact"],
        nav: [
            { label: "Inicio", anchor: "inicio" },
            { label: "Servicios", anchor: "servicios" },
            { label: "Contacto", anchor: "contacto" }
        ]
    },
    hero: { title: "EVORIX", subtitle: "Advanced Agentic Coding", primaryCtaLabel: "EXPLORAR", secondaryCtaLabel: "CONTACTO" },
    services: [],
    tools: { evoapp: { title: "EVOAPP", desc: "System control", terminalLines: [] } },
    testimonials: [],
    about: { title: "About", lead: "Lead text", paragraphs: [], signatureLine: "" },
    links: { whatsapp: "", linkedin: "", github: "", portfolio: "" },
    problem: { title: "The Problem", subtitle: "Chaos in systems", bullets: [], closing: "" },
    method: { title: "The Method", subtitle: "Our approach", steps: [] },
    cta: { title: "Ready?", subtitle: "Get started", ctaLabel: "START" }
};

export async function getSiteContent(useDrafts = false): Promise<SiteContent> {
    const filenames = Object.keys(DEFAULTS);
    const content: any = {};

    for (const name of filenames) {
        const mainPath = path.join(CONTENT_DIR, `${name}.json`);
        const draftPath = path.join(DRAFTS_DIR, `${name}.json`);

        let raw: string | null = null;

        try {
            if (useDrafts) {
                try {
                    raw = await fs.readFile(draftPath, "utf-8");
                } catch (e) {
                    try {
                        raw = await fs.readFile(mainPath, "utf-8");
                    } catch (e2) { }
                }
            } else {
                try {
                    raw = await fs.readFile(mainPath, "utf-8");
                } catch (e) { }
            }

            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(DEFAULTS[name])) {
                    content[name] = Array.isArray(parsed) ? parsed : DEFAULTS[name];
                } else {
                    content[name] = { ...DEFAULTS[name], ...parsed };
                }
            } else {
                content[name] = DEFAULTS[name];
            }
        } catch (error) {
            console.error(`Error loading content for ${name}, using defaults.`, error);
            content[name] = DEFAULTS[name];
        }
    }

    return content as SiteContent;
}
