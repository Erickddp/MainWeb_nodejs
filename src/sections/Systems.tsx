import { useContent } from "@/components/ContentProvider";
import { SectionShell } from "@/components/layout/SectionShell";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";

export const Systems = () => {
    const { hero } = useContent(); // placeholder if systems using hero text
    return (
        <SectionShell id="ecosistema" data-tour-step="5" className="bg-accent/[0.02]">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <MotionWrapper preset="up">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Un Ecosistema Integrado</h2>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                        No vemos la contabilidad, la tecnología y la estrategia como compartimentos estancos.
                        En EVORIX, los fusionamos en un ecosistema vivo que se retroalimenta.
                    </p>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="h-6 w-6 rounded bg-accent/20 flex items-center justify-center shrink-0 text-accent text-xs font-bold">1</div>
                            <div>
                                <h4 className="font-bold">Datos en tiempo real</h4>
                                <p className="text-sm text-muted-foreground">Tu contabilidad alimenta tu estrategia día a día sin intervención manual.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="h-6 w-6 rounded bg-accent/20 flex items-center justify-center shrink-0 text-accent text-xs font-bold">2</div>
                            <div>
                                <h4 className="font-bold">Estructura Modular</h4>
                                <p className="text-sm text-muted-foreground">Implementamos soluciones que crecen y se adaptan sin romper el sistema central.</p>
                            </div>
                        </div>
                    </div>
                </MotionWrapper>

                <MotionWrapper delay={0.2} preset="scale">
                    <GlassCard className="aspect-square flex items-center justify-center border-accent/20 overflow-hidden relative group" interactive>
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent group-hover:from-accent/10 transition-colors" />
                        <div className="relative text-center p-8">
                            <div className="text-9xl mb-6 grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 rotate-[30deg] group-hover:rotate-0">
                                ⚙️
                            </div>
                            <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-30 group-hover:opacity-60 transition-opacity">SISTEMA_OPERATIVO_V3.0</p>
                        </div>
                    </GlassCard>
                </MotionWrapper>
            </div>
        </SectionShell>
    );
};
