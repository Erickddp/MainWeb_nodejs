"use client";

import { useEffect, useState } from "react";
import { getContent, saveDraft } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HeroEditorPage() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        getContent("hero").then((d) => {
            setData(d);
            setIsLoading(false);
        });
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        const res = await saveDraft("hero", data);
        if (res.success) alert("Hero draft updated!");
        else alert(res.error || "Error saving hero content.");
        setIsSaving(false);
    };

    if (isLoading) return <div className="p-12 text-center opacity-40">Loading hero sequence...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <div className="flex items-center gap-4 text-muted-foreground mb-4">
                        <Link href="/panel" className="hover:text-white transition-colors">
                            <ArrowLeft size={16} />
                        </Link>
                        <span className="text-[10px] uppercase tracking-widest font-bold">Content Editor</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter">HERO SECTION</h1>
                </div>
                <Button variant="glow" onClick={handleSave} disabled={isSaving} className="px-8 py-6 rounded-full">
                    <Save size={18} className="mr-2" />
                    {isSaving ? "SAVING..." : "COMMIT CHANGES"}
                </Button>
            </header>

            <div className="grid grid-cols-1 gap-8 max-w-3xl">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                        <textarea
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-[100px] text-xl font-bold focus:outline-none focus:border-accent/40 transition-all font-sans"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Subtitle</label>
                        <textarea
                            value={data.subtitle}
                            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-[120px] text-muted-foreground focus:outline-none focus:border-accent/40 transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Primary CTA Label</label>
                            <input
                                type="text"
                                value={data.primaryCtaLabel}
                                onChange={(e) => setData({ ...data, primaryCtaLabel: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-accent/40 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Secondary CTA Label</label>
                            <input
                                type="text"
                                value={data.secondaryCtaLabel}
                                onChange={(e) => setData({ ...data, secondaryCtaLabel: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-accent/40 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
