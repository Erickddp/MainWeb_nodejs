"use client";

import { useEffect, useState } from "react";
import { getContent, saveDraft } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";

export default function ConfigEditorPage() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        getContent("config").then((d) => {
            setData(d);
            setIsLoading(false);
        });
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        const res = await saveDraft("config", data);
        if (res.success) alert("Site config draft updated!");
        else alert((res as any).error || "Error saving content.");
        setIsSaving(false);
    };

    const updateNavItem = (idx: number, field: string, value: string) => {
        const newNav = [...data.nav];
        newNav[idx] = { ...newNav[idx], [field]: value };
        setData({ ...data, nav: newNav });
    };

    if (isLoading) return <div className="p-12 text-center opacity-40">Loading site configuration...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <div className="flex items-center gap-4 text-muted-foreground mb-4">
                        <Link href="/panel" className="hover:text-white transition-colors">
                            <ArrowLeft size={16} />
                        </Link>
                        <span className="text-[10px] uppercase tracking-widest font-bold">System Config</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase">SITE SETTINGS</h1>
                </div>
                <Button variant="glow" onClick={handleSave} disabled={isSaving} className="px-8 py-6 rounded-full">
                    <Save size={18} className="mr-2" />
                    {isSaving ? "SAVING..." : "COMMIT CHANGES"}
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                <GlassCard className="p-8 border-white/5 space-y-6">
                    <h2 className="text-xl font-bold border-b border-white/5 pb-4">Navigation Menu</h2>
                    <div className="space-y-4">
                        {data.nav.map((item: any, idx: number) => (
                            <div key={idx} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 group">
                                <div className="flex-1 space-y-2">
                                    <label className="text-[10px] uppercase opacity-40">Label</label>
                                    <input
                                        type="text"
                                        value={item.label}
                                        onChange={(e) => updateNavItem(idx, "label", e.target.value)}
                                        className="w-full bg-transparent border-none p-0 focus:ring-0 font-bold"
                                    />
                                </div>
                                <div className="flex-1 space-y-2 text-right">
                                    <label className="text-[10px] uppercase opacity-40">Anchor</label>
                                    <input
                                        type="text"
                                        value={item.anchor}
                                        onChange={(e) => updateNavItem(idx, "anchor", e.target.value)}
                                        className="w-full bg-transparent border-none p-0 focus:ring-0 text-right opacity-60 font-mono"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <div className="space-y-6">
                    <GlassCard className="p-8 border-white/5">
                        <h2 className="text-xl font-bold mb-6">Global Metadata</h2>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl border border-white/5 bg-accent/5">
                                <p className="text-xs text-muted-foreground mb-1">Current Section Count</p>
                                <p className="font-mono text-accent text-lg">{data.sectionOrder.length}</p>
                            </div>
                            <p className="text-xs text-muted-foreground italic">
                                Note: Direct editing of section order is handled in the Overview page.
                            </p>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
