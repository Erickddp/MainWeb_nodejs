import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { TourProvider } from "@/components/tour/TourContext";
import { TourOverlay } from "@/components/tour/TourOverlay";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "EVORIX",
  description: "EVORIX",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
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
      </body>
    </html>
  );
}

