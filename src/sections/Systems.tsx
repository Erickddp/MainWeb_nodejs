import { useContent } from "@/components/ContentProvider";
import { SectionShell } from "@/components/layout/SectionShell";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import GearSystemNode from "@/components/systems/GearSystemNode";

export const Systems = () => {
    const { hero } = useContent(); // placeholder if systems using hero text
    return (
        <SectionShell id="ecosistema" className="bg-accent/[0.02]">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <MotionWrapper preset="up">



                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Un sistema integrado</h2>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                        Nada trabaja aislado. Todo se conecta para darte claridad sin esfuerzo
                    </p>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="h-6 w-6 rounded bg-accent/20 flex items-center justify-center shrink-0 text-accent text-xs font-bold">1</div>
                            <div>
                                <h4 className="font-bold">Datos en tiempo real</h4>
                                <p className="text-sm text-muted-foreground">Tu información lista, sin capturas dobles ni correcciones constantes.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="h-6 w-6 rounded bg-accent/20 flex items-center justify-center shrink-0 text-accent text-xs font-bold">2</div>
                            <div>
                                <h4 className="font-bold">Estructura Modular</h4>
                                <p className="text-sm text-muted-foreground">El sistema crece contigo, sin rehacerlo todo.</p>
                            </div>
                        </div>
                    </div>




                </MotionWrapper>

                <MotionWrapper delay={0.2} preset="scale">
                    <GlassCard className="aspect-square flex items-center justify-center border-accent/20 overflow-hidden relative group" interactive>
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent group-hover:from-accent/10 transition-colors" />
                        <div className="relative text-center p-8">
                            <div className="mb-6 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 w-full h-[320px] md:h-auto md:aspect-square flex items-center justify-center">
                                <GearSystemNode className="w-full h-full" />
                            </div>
                            <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-30 group-hover:opacity-60 transition-opacity">Construyendo sistema personalizado...</p>
                        </div>
                    </GlassCard>
                </MotionWrapper>
            </div>
        </SectionShell>
    );
};
