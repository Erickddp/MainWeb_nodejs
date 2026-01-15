"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Lock } from "lucide-react";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // Using a simple fetch to an API route for login
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ password }),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                router.push("/panel");
                router.refresh();
            } else {
                setError("Contraseña incorrecta");
            }
        } catch (err) {
            setError("Error de conexión");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-sm relative z-10">
                <GlassCard className="p-8 border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="h-14 w-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                            <Lock size={22} className="text-accent" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">EDDP Panel</h1>
                        <p className="text-sm text-white/50">Credenciales de Administrador</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-center text-xl text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-mono tracking-widest"
                                required
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-xs text-destructive text-center">{error}</p>}
                        <Button
                            type="submit"
                            variant="glow"
                            className="w-full py-6 rounded-xl"
                            disabled={isLoading}
                        >
                            {isLoading ? "Validando..." : "Entrar al Sistema"}
                        </Button>
                    </form>
                </GlassCard>
            </div>
        </div>
    );
}
