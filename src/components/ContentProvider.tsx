"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { SiteContent } from "@/lib/content.types";

const ContentContext = createContext<SiteContent | undefined>(undefined);

export const ContentProvider = ({ content, children }: { content: SiteContent, children: ReactNode }) => {
    return (
        <ContentContext.Provider value={content}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error("useContent must be used within a ContentProvider");
    }
    return context;
};
