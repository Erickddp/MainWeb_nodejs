"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Zap,
    Wrench,
    MessageSquare,
    User,
    Link as LinkIcon,
    Settings,
    Eye,
    LogOut
} from "lucide-react";

const NAV_ITEMS = [
    { label: "Overview", href: "/panel", icon: LayoutDashboard },
    { label: "Hero", href: "/panel/hero", icon: Zap },
    { label: "Services", href: "/panel/services", icon: MessageSquare },
    { label: "Tools", href: "/panel/tools", icon: Wrench },
    { label: "Testimonials", href: "/panel/testimonials", icon: User },
    { label: "About", href: "/panel/about", icon: User },
    { label: "Links", href: "/panel/links", icon: LinkIcon },
    { label: "Site Config", href: "/panel/config", icon: Settings },
];

export const PanelSidebar = () => {
    const pathname = usePathname();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/panel/login";
    };

    return (
        <aside className="w-64 border-r border-white/5 bg-[#050505] flex flex-col">
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-2 font-black tracking-tighter text-xl">
                    <span className="text-accent">EVO</span>RIX
                    <span className="text-[10px] bg-accent/20 text-accent px-1 rounded ml-2">ADMIN</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-accent/10 text-accent"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon size={18} className={cn(isActive ? "text-accent" : "text-muted-foreground group-hover:text-white")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5 space-y-2">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white bg-white/5 hover:bg-white/10 transition-all"
                >
                    <Eye size={18} />
                    View Live Site
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};
