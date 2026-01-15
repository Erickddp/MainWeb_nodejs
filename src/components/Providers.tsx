"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { TourProvider } from "@/components/tour/TourContext";
import { TourOverlay } from "@/components/tour/TourOverlay";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <TourProvider>
                {children}
                <TourOverlay />
            </TourProvider>
        </ThemeProvider>
    );
}
