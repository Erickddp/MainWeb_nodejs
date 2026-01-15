import { isAuthenticated } from "@/lib/auth";
import { ReactNode } from "react";
import { PanelSidebar } from "@/components/admin/PanelSidebar";

export default async function PanelLayout({ children }: { children: ReactNode }) {
    const auth = await isAuthenticated();

    return (
        <div className="min-h-screen bg-[#020202] text-white flex">
            {auth && <PanelSidebar />}
            <main className="flex-1 overflow-y-auto">
                <div className="w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
