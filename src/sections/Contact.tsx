"use client";

import { useContent } from "@/components/ContentProvider";
import { SectionShell } from "@/components/layout/SectionShell";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";

export const Contact = () => {
    const { links } = useContent() as any;

    return (
        <SectionShell id="contacto" data-tour="contact">
            <div className="grid md:grid-cols-2 gap-16 items-start">
                <MotionWrapper preset="up">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Hablemos de tu Sistema</h2>
                    <p className="text-muted-foreground text-lg mb-12">
                        ¿Listo para evolucionar? Conecta con nosotros a través de cualquiera de estos canales o
                        síguenos para ver nuestras últimas innovaciones.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <ContactLink href={links.whatsapp} label="WhatsApp" icon="💬" />
                        <ContactLink href={links.linkedin} label="LinkedIn" icon="🔗" />
                        <ContactLink href={links.github} label="GitHub" icon="💻" />
                        <ContactLink href={links.portfolio} label="Portfolio" icon="🌐" />
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

                        {/* Footer (mismo contenido, solo movido para que quede debajo del formulario) */}
                        <div className="mt-20 text-xs font-mono opacity-50 tracking-widest leading-loose">
                            © 2026 EVORIX. TODOS LOS DERECHOS RESERVADOS. <br />
                            <span className="text-accent">BUILT BY EVORIX IN THE AGENTIC AGE.</span>
                        </div>
                    </GlassCard>
                </MotionWrapper>
            </div>
        </SectionShell>
    );
};

const ContactLink = ({ href, label, icon }: { href: string; label: string; icon: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 p-4 rounded-xl border border-border/10 hover:border-accent/30 hover:bg-accent/5 transition-all"
    >
        <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{icon}</span>
        <span className="text-sm font-bold">{label}</span>
    </a>
);
