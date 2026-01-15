"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getContent, saveDraft } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { MoveUp, MoveDown, Eye, Save, AlertCircle, Zap } from "lucide-react";
import { useTour } from "@/components/tour/TourContext";

export default function OverviewPage() {
    const [config, setConfig] = useState<{ sectionOrder: string[] } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const loadConfig = async () => {
            const data = await getContent("config");
            setConfig(data || { sectionOrder: [] });
            setIsLoading(false);
        };
        loadConfig();
    }, []);

    const moveSection = (index: number, direction: 'up' | 'down') => {
        if (!config) return;
        const newOrder = [...config.sectionOrder];
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        if (newIndex < 0 || newIndex >= newOrder.length) return;

        [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
        setConfig({ ...config, sectionOrder: newOrder });
    };

    const handleSave = async () => {
        if (!config) return;
        setIsSaving(true);
        const result = await saveDraft("config", config);
        if (result.success) {
            alert("Configuration saved successfully!");
        } else {
            alert((result as any).error || "Failed to save configuration.");
        }
        setIsSaving(false);
    };

    const handlePublish = async () => {
        if (!confirm("Are you sure you want to PUBLISH all drafts to the live site?")) return;
        setIsSaving(true);
        const { publishAll } = await import("@/lib/admin-actions");
        const res = await publishAll();
        if (res.success) alert("SYSTEM PUBLISHED: Changes are now live.");
        else alert((res as any).error || (res as any).message || "Publish failed.");
        setIsSaving(false);
    };

    if (isLoading) return <div className="p-12 text-center opacity-50">Loading ecosystem configuration...</div>;

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter">OVERVIEW</h1>
                    <p className="text-muted-foreground mt-2">Manage your core system structure and section order.</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/?preview=true" target="_blank">
                        <Button variant="outline" className="px-8 py-6 rounded-full border-white/10">
                            <Eye size={18} className="mr-2" />
                            PREVIEW DRAFT
                        </Button>
                    </Link>
                    <Button variant="outline" onClick={handlePublish} disabled={isSaving} className="px-8 py-6 rounded-full border-accent/20 text-accent hover:bg-accent/10">
                        <Zap size={18} className="mr-2" />
                        PUBLISH LIVE
                    </Button>
                    <Button variant="glow" onClick={handleSave} disabled={isSaving} className="px-8 py-6 rounded-full">
                        <Save size={18} className="mr-2" />
                        {isSaving ? "SYNCING..." : "SAVE DRAFT"}
                    </Button>
                </div>
            </header>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <MoveUp size={20} className="text-accent" />
                        Section Lifecycle Order
                    </h2>
                    <div className="space-y-2">
                        {config?.sectionOrder.map((section, idx) => (
                            <div
                                key={section}
                                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl group hover:border-accent/40 transition-all"
                            >
                                <div className="h-10 w-10 flex items-center justify-center bg-white/5 rounded-xl font-mono text-xs opacity-40">
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                <div className="flex-1 font-bold uppercase tracking-widest text-sm">
                                    {section}
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => moveSection(idx, 'up')}
                                        disabled={idx === 0}
                                        className="p-2 hover:bg-white/10 rounded-lg disabled:opacity-20"
                                    >
                                        <MoveUp size={16} />
                                    </button>
                                    <button
                                        onClick={() => moveSection(idx, 'down')}
                                        disabled={idx === config.sectionOrder.length - 1}
                                        className="p-2 hover:bg-white/10 rounded-lg disabled:opacity-20"
                                    >
                                        <MoveDown size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <GlassCard className="p-6 border-accent/20 bg-accent/5">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Eye size={18} className="text-accent" />
                            Live System Status
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-muted-foreground">Active Sections</span>
                                <span className="font-mono text-accent">{config?.sectionOrder.length}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-muted-foreground">Environment</span>
                                <span className="font-mono">{process.env.NODE_ENV}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Demo Mode</span>
                                <span className="font-mono">{String(process.env.NEXT_PUBLIC_IS_DEMO_MODE || 'false')}</span>
                            </div>
                        </div>
                    </GlassCard>

                    <div className="p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 text-yellow-500/80 text-xs leading-relaxed">
                        <AlertCircle size={16} className="mb-2" />
                        <strong>DANGER ZONE:</strong> Reordering sections affects the narrative flow and anchor navigation. Ensure the sequence logic remains valid for the Guided Tour.
                    </div>
                </div>
            </section>
        </div>
    );
}
