"use client";

import { useEffect, useState } from "react";
import { getContent, saveDraft } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, Plus, Trash2, User } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";

export default function TestimonialsEditorPage() {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        getContent("testimonials").then((d) => {
            setData(d || []);
            setIsLoading(false);
        });
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        const res = await saveDraft("testimonials", data);
        if (res.success) alert("Testimonials draft updated!");
        else alert(res.error || "Error saving content.");
        setIsSaving(false);
    };

    const updateItem = (index: number, field: string, value: any) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        setData(newData);
    };

    const removeItem = (index: number) => {
        if (confirm("Delete this testimonial?")) {
            setData(data.filter((_, i) => i !== index));
        }
    };

    const addItem = () => {
        setData([...data, {
            name: "New Client",
            role: "CEO at Company",
            quote: "This system transformed our workflow...",
            highlight: "Digital Transformation"
        }]);
    };

    if (isLoading) return <div className="p-12 text-center opacity-40">Loading references...</div>;

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
                    <h1 className="text-4xl font-black tracking-tighter uppercase">TESTIMONIALS</h1>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={addItem} className="rounded-full border-white/10">
                        <Plus size={18} className="mr-2" /> ADD ITEM
                    </Button>
                    <Button variant="glow" onClick={handleSave} disabled={isSaving} className="px-8 py-6 rounded-full">
                        <Save size={18} className="mr-2" />
                        {isSaving ? "SAVING..." : "COMMIT CHANGES"}
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data.map((item, idx) => (
                    <GlassCard key={idx} className="p-6 border-white/5 relative group">
                        <button
                            onClick={() => removeItem(idx)}
                            className="absolute top-6 right-6 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 size={16} />
                        </button>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-1 space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => updateItem(idx, "name", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm font-bold focus:outline-none focus:border-accent/40 transition-all font-sans"
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Role</label>
                                    <input
                                        type="text"
                                        value={item.role}
                                        onChange={(e) => updateItem(idx, "role", e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-accent/40 transition-all font-sans"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Highlight / Category</label>
                                <input
                                    type="text"
                                    value={item.highlight}
                                    onChange={(e) => updateItem(idx, "highlight", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-accent font-bold focus:outline-none focus:border-accent/40 transition-all font-sans"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">The Quote</label>
                                <textarea
                                    value={item.quote}
                                    onChange={(e) => updateItem(idx, "quote", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 min-h-[100px] text-sm text-muted-foreground focus:outline-none focus:border-accent/40 transition-all italic"
                                />
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
