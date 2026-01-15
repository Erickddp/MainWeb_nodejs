"use client";

import { useEffect, useState } from "react";
import { useContent } from "@/components/ContentProvider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";
import { scrollToAnchor } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    // ✅ ADD: mobile menu state
    const [mobileOpen, setMobileOpen] = useState(false);

    const { config } = useContent();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ✅ ADD: lock body scroll when menu open
    useEffect(() => {
        if (!mobileOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [mobileOpen]);

    // ✅ ADD: close on Escape
    useEffect(() => {
        if (!mobileOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMobileOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [mobileOpen]);

    // ✅ ADD: helper to navigate + close
    const go = (anchor: string) => {
        setMobileOpen(false);
        setTimeout(() => scrollToAnchor(anchor), 10);
    };

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "py-4 bg-background/80 backdrop-blur-md border-b border-border/10"
                        : "py-6 bg-transparent"
                )}
            >
                <Container className="flex items-center justify-between">
                    <div
                        className="text-xl font-bold tracking-tighter cursor-pointer"
                        onClick={() => scrollToAnchor("inicio")}
                    >
                        EDDP
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        {config.nav.map((item) => (
                            <button
                                key={item.anchor}
                                onClick={() => scrollToAnchor(item.anchor)}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Button
                            variant="glow"
                            size="sm"
                            className="hidden sm:flex"
                            onClick={() => scrollToAnchor("contacto")}
                        >
                            Contacto
                        </Button>

                        {/* ✅ ADD: connect mobile button */}
                        <button
                            className="md:hidden p-2 text-foreground"
                            onClick={() => setMobileOpen((v) => !v)}
                            aria-label="Abrir menú"
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-nav"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="4" x2="20" y1="12" y2="12" />
                                <line x1="4" x2="20" y1="6" y2="6" />
                                <line x1="4" x2="20" y1="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </Container>
            </header>

            {/* ✅ ADD: Mobile overlay + drawer (moved OUTSIDE header for correct behavior everywhere) */}
            <div
                className={cn(
                    "md:hidden fixed inset-0 z-[200]",
                    mobileOpen ? "pointer-events-auto" : "pointer-events-none"
                )}
                aria-hidden={!mobileOpen}
            >
                {/* overlay (premium fade) */}
                <button
                    type="button"
                    aria-label="Cerrar menú"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-200",
                        "bg-black/30 backdrop-blur-sm",
                        mobileOpen ? "opacity-100" : "opacity-0"
                    )}
                />

                {/* panel (premium slide) */}
                <div
                    id="mobile-nav"
                    className={cn(
                        "absolute right-0 top-0 h-full w-[86vw] max-w-[380px]",
                        "bg-background/85 backdrop-blur-xl border-l border-border/20 shadow-2xl",
                        "p-6 pt-24",
                        "transition-transform duration-300 will-change-transform",
                        mobileOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    {/* close button (X) */}
                    <button
                        type="button"
                        aria-label="Cerrar"
                        onClick={() => setMobileOpen(false)}
                        className="absolute top-6 right-6 p-2 rounded-lg border border-border/30 bg-background/60 backdrop-blur hover:bg-accent/10 transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="M6 6 18 18" />
                        </svg>
                    </button>

                    <div className="flex flex-col gap-2">
                        {/* title small */}
                        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                            Navegación
                        </div>

                        {config.nav.map((item) => (
                            <button
                                key={item.anchor}
                                onClick={() => go(item.anchor)}
                                className={cn(
                                    "text-left text-base font-medium",
                                    "text-foreground/90 hover:text-foreground transition-colors",
                                    "py-3 px-3 rounded-xl hover:bg-accent/10"
                                )}
                            >
                                {item.label}
                            </button>
                        ))}


                    </div>
                </div>
            </div>
        </>
    );
};
