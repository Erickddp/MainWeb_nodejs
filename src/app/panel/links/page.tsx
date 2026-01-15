"use client";

import { useEffect, useState } from "react";
import { getContent, saveDraft } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, Globe, MessageCircle, Linkedin, Github } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";

export default function LinksEditorPage() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        getContent("links").then((d) => {
            setData(d);
            setIsLoading(false);
        });
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        const res = await saveDraft("links", data);
        if (res.success) alert("Links draft updated!");
        else alert(res.error || "Error saving content.");
        setIsSaving(false);
    };

    if (isLoading) return <div className="p-12 text-center opacity-40">Loading network connections...</div>;

    const linkFields = [
        { key: "whatsapp", label: "WhatsApp URL", icon: MessageCircle },
        { key: "linkedin", label: "LinkedIn URL", icon: Linkedin },
        { key: "github", label: "GitHub URL", icon: Github },
        { key: "portfolio", label: "Portfolio URL", icon: Globe },
    ];

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
                    <h1 className="text-4xl font-black tracking-tighter uppercase">LINKS & SOCIAL</h1>
                </div>
                <Button variant="glow" onClick={handleSave} disabled={isSaving} className="px-8 py-6 rounded-full">
                    <Save size={18} className="mr-2" />
                    {isSaving ? "SAVING..." : "COMMIT CHANGES"}
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                {linkFields.map((field) => (
                    <GlassCard key={field.key} className="p-6 border-white/5 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                <field.icon size={16} />
                            </div>
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{field.label}</label>
                        </div>
                        <input
                            type="text"
                            value={data[field.key]}
                            onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-accent/40 transition-all font-mono"
                        />
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
