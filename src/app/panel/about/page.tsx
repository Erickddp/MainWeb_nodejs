"use client";

import { useEffect, useState } from "react";
import { getContent, saveDraft } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function AboutEditorPage() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        getContent("about").then((d) => {
            setData(d);
            setIsLoading(false);
        });
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        const res = await saveDraft("about", data);
        if (res.success) alert("About draft updated!");
        else alert(res.error || "Error saving content.");
        setIsSaving(false);
    };

    const updateParagraph = (idx: number, value: string) => {
        const newPars = [...data.paragraphs];
        newPars[idx] = value;
        setData({ ...data, paragraphs: newPars });
    };

    if (isLoading) return <div className="p-12 text-center opacity-40">Loading founder story...</div>;

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
                    <h1 className="text-4xl font-black tracking-tighter uppercase">ABOUT FOUNDER</h1>
                </div>
                <Button variant="glow" onClick={handleSave} disabled={isSaving} className="px-8 py-6 rounded-full">
                    <Save size={18} className="mr-2" />
                    {isSaving ? "SAVING..." : "COMMIT CHANGES"}
                </Button>
            </header>

            <div className="grid grid-cols-1 gap-8 max-w-4xl">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xl font-bold focus:outline-none focus:border-accent/40 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Lead Text</label>
                        <textarea
                            value={data.lead}
                            onChange={(e) => setData({ ...data, lead: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-[80px] text-accent font-bold focus:outline-none focus:border-accent/40 transition-all font-sans"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">Story Paragraphs</label>
                        {data.paragraphs.map((p: string, idx: number) => (
                            <textarea
                                key={idx}
                                value={p}
                                onChange={(e) => updateParagraph(idx, e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-[100px] text-sm text-muted-foreground focus:outline-none focus:border-accent/40 transition-all leading-relaxed"
                            />
                        ))}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Signature Line</label>
                        <input
                            type="text"
                            value={data.signatureLine}
                            onChange={(e) => setData({ ...data, signatureLine: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-lg font-serif italic focus:outline-none focus:border-accent/40 transition-all"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
