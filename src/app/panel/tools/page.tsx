"use client";

import { useEffect, useState } from "react";
import { getContent, saveDraft } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";

export default function ToolsEditorPage() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        getContent("tools").then((d) => {
            setData(d);
            setIsLoading(false);
        });
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        const res = await saveDraft("tools", data);
        if (res.success) alert("Tools draft updated!");
        else alert(res.error || "Error saving content.");
        setIsSaving(false);
    };

    const updateTool = (key: string, field: string, value: any) => {
        setData({
            ...data,
            [key]: { ...data[key], [field]: value }
        });
    };

    if (isLoading) return <div className="p-12 text-center opacity-40">Loading tools suite...</div>;

    const tools = ["evoapp", "evotools", "evolab"];

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
                    <h1 className="text-4xl font-black tracking-tighter uppercase">TOOLS</h1>
                </div>
                <Button variant="glow" onClick={handleSave} disabled={isSaving} className="px-8 py-6 rounded-full">
                    <Save size={18} className="mr-2" />
                    {isSaving ? "SAVING..." : "COMMIT CHANGES"}
                </Button>
            </header>

            <div className="grid grid-cols-1 gap-8">
                {tools.map((key) => {
                    const tool = data[key];
                    return (
                        <GlassCard key={key} className="p-8 border-white/5">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-xs font-mono bg-accent/20 text-accent px-2 py-1 rounded">SYSTEM_TOOL_{key.toUpperCase()}</span>
                                <h2 className="text-xl font-bold">{tool.title}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Display Title</label>
                                        <input
                                            type="text"
                                            value={tool.title}
                                            onChange={(e) => updateTool(key, "title", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 font-bold focus:outline-none focus:border-accent/40 transition-all font-sans"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                                        <textarea
                                            value={tool.desc}
                                            onChange={(e) => updateTool(key, "desc", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 min-h-[80px] text-sm text-muted-foreground focus:outline-none focus:border-accent/40 transition-all"
                                        />
                                    </div>
                                </div>

                                {key === "evoapp" && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex justify-between">
                                                Terminal Boot Sequence
                                                <span className="opacity-40">One line per entry</span>
                                            </label>
                                            <textarea
                                                value={tool.terminalLines?.join("\n")}
                                                onChange={(e) => updateTool(key, "terminalLines", e.target.value.split("\n"))}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 min-h-[160px] text-xs font-mono text-emerald-500 focus:outline-none focus:border-emerald-500/40 transition-all leading-relaxed"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </GlassCard>
                    );
                })}
            </div>
        </div>
    );
}
