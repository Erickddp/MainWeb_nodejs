"use client";

import { useContent } from "@/components/ContentProvider";
import { SectionShell } from "@/components/layout/SectionShell";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Facebook, Github, Linkedin, Globe, MessageCircle, LucideIcon } from "lucide-react";

export const Contact = () => {
    const { links } = useContent() as any;

    const contactItems = [
        {
            label: "WhatsApp",
            href: links.whatsapp,
            Icon: MessageCircle,
            // Brand Color: #25D366
            colorClass: "hover:border-[#25D366]/30 hover:bg-[#25D366]/10",
            iconClass: "group-hover:text-[#25D366]",
        },
        {
            label: "LinkedIn",
            href: links.linkedin,
            Icon: Linkedin,
            // Brand Color: #0A66C2
            colorClass: "hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/10",
            iconClass: "group-hover:text-[#0A66C2]",
        },
        {
            label: "Facebook",
            href: links.facebook || "#", // Fallback if not in content
            Icon: Facebook,
            // Brand Color: #1877F2
            colorClass: "hover:border-[#1877F2]/30 hover:bg-[#1877F2]/10",
            iconClass: "group-hover:text-[#1877F2]",
        },
        {
            label: "GitHub",
            href: links.github,
            Icon: Github,
            // Brand Color: #FFFFFF
            colorClass: "hover:border-[#FFFFFF]/30 hover:bg-[#FFFFFF]/10",
            iconClass: "group-hover:text-[#FFFFFF]",
        },
        {
            label: "Portfolio",
            href: links.portfolio,
            Icon: Globe,
            // Brand Color: #00E0FF
            colorClass: "hover:border-[#00E0FF]/30 hover:bg-[#00E0FF]/10",
            iconClass: "group-hover:text-[#00E0FF]",
        },
    ];

    return (
        <SectionShell id="contacto" data-tour="contact">
            <div className="grid md:grid-cols-2 gap-16 items-start">
                <MotionWrapper preset="up">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Hablemos de tu Sistema</h2>
                    <p className="text-muted-foreground text-lg mb-12">
                        ¿Tu negocio funciona, pero te exige demasiado?
                        Podemos ordenarlo.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {contactItems.map((item) => (
                            <ContactLink key={item.label} {...item} />
                        ))}
                    </div>
                </MotionWrapper>

                <MotionWrapper delay={0.2} preset="up">
                    <GlassCard className="p-10 border-white/5 bg-white/[0.01]" interactive>
                        <h3 className="text-xl font-bold mb-6">Envía un mensaje rápido</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nombre"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-accent/40 transition-all focus:bg-white/[0.08]"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-accent/40 transition-all focus:bg-white/[0.08]"
                            />
                            <textarea
                                placeholder="¿En qué podemos ayudarte?"
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-accent/40 transition-all focus:bg-white/[0.08]"
                            />
                            <Button variant="glow" className="w-full py-7 text-lg mt-4">Enviar Solicitud</Button>
                        </div>

                    </GlassCard>
                </MotionWrapper>
            </div>
            <div className="mt-24 text-center text-xs font-mono tracking-widest leading-loose opacity-50">
                © 2026 Eddp. TODOS LOS DERECHOS RESERVADOS.
                <br />
                <span className="block mt-2 text-accent/80">
                    BUILT BY EDDP IN THE AGENTIC AGE.
                </span>
            </div>

        </SectionShell>
    );
};

interface ContactLinkProps {
    href: string;
    label: string;
    Icon: LucideIcon;
    colorClass: string;
    iconClass: string;
}

const ContactLink = ({ href, label, Icon, colorClass, iconClass }: ContactLinkProps) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-transparent transition-all duration-300 ${colorClass}`}
    >
        <Icon className={`w-5 h-5 text-gray-400 transition-colors duration-300 ${iconClass}`} />
        <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors duration-300">{label}</span>
    </a>
);
