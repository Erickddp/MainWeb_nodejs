"use client";

import { useEffect, useState } from "react";
import { getContent, saveDraft } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";

export default function ServicesEditorPage() {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        getContent("services").then((d) => {
            setData(d || []);
            setIsLoading(false);
        });
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        const res = await saveDraft("services", data);
        if (res.success) alert("Services draft updated!");
        else alert(res.error || "Error saving content.");
        setIsSaving(false);
    };

    const updateService = (index: number, field: string, value: any) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        setData(newData);
    };

    const removeService = (index: number) => {
        if (confirm("Delete this service?")) {
            setData(data.filter((_, i) => i !== index));
        }
    };

    const addService = () => {
        setData([...data, {
            id: "new-service-" + Date.now(),
            title: "New Service",
            intro: "Short description...",
            bullets: ["Feature 1"],
            idealFor: "Businesses who...",
            priceLabel: "Contact for pricing",
            ctaLabel: "EXPLORAR",
            ctaHref: "#contacto"
        }]);
    };

    if (isLoading) return <div className="p-12 text-center opacity-40">Loading services matrix...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <div className="flex items-center gap-4 text-muted-foreground mb-4">
                        <Link href="/panel" className="hover:text-white transition-colors">
                            <ArrowLeft size={16} />
                        </Link>
                        <span className="text-[10px] uppercase tracking-widest font-bold">Content Editor</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase">SERVICES</h1>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={addService} className="rounded-full border-white/10">
                        <Plus size={18} className="mr-2" /> ADD SERVICE
                    </Button>
                    <Button variant="glow" onClick={handleSave} disabled={isSaving} className="px-8 py-6 rounded-full">
                        <Save size={18} className="mr-2" />
                        {isSaving ? "SAVING..." : "COMMIT CHANGES"}
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {data.map((service, idx) => (
                    <GlassCard key={service.id} className="p-8 border-white/5 relative group">
                        <button
                            onClick={() => removeService(idx)}
                            className="absolute top-8 right-8 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 size={18} />
                        </button>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Service Title</label>
                                    <input
                                        type="text"
                                        value={service.title}
                                        onChange={(e) => updateService(idx, "title", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 font-bold focus:outline-none focus:border-accent/40 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Intro Copy</label>
                                    <textarea
                                        value={service.intro}
                                        onChange={(e) => updateService(idx, "intro", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 min-h-[80px] text-sm text-muted-foreground focus:outline-none focus:border-accent/40 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ideal For</label>
                                    <input
                                        type="text"
                                        value={service.idealFor}
                                        onChange={(e) => updateService(idx, "idealFor", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-accent/40 transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Price Label</label>
                                        <input
                                            type="text"
                                            value={service.priceLabel}
                                            onChange={(e) => updateService(idx, "priceLabel", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-accent/40 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Identifier (ID)</label>
                                        <input
                                            type="text"
                                            value={service.id}
                                            disabled
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm opacity-50 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
