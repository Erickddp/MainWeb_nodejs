"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";

export interface TourStep {
    target: string; // The data-tour ID
    title: string;
    content: string;
}











const TOUR_STEPS: TourStep[] = [
    {
        target: "hero",
        title: "Empecemos por lo importante",
        content: "Aquí no se trata de trabajar más. Se trata de que tu sistema deje de estorbarte."
    },
    {
        target: "problem",
        title: "Esto suele pasar",
        content: "Si repites tareas, corriges lo mismo cada mes o todo depende de una persona, no es normal. Es desorden."
    },
    {
        target: "workflow",
        title: "Así trabajo contigo",
        content: "Primero observo cómo trabajas en realidad. Sin suposiciones. Sin juicios."
    },
    {
        target: "services",
        title: "Qué puedo ordenar",
        content: "Desde lo fiscal hasta lo operativo. Orden, claridad y menos desgaste en el día a día."
    },
    {
        target: "system",
        title: "Todo conectado",
        content: "Cuando la información se ordena, las decisiones dejan de ser complicadas."
    },
    {
        target: "tools",
        title: "Herramientas propias",
        content: "Uso herramientas hechas para resolver problemas reales, no soluciones genéricas."
    },
    {
        target: "testimonials",
        title: "Lo que cambia",
        content: "Menos presión. Más claridad. Más tranquilidad."
    },
    {
        target: "about",
        title: "Quién está detrás",
        content: "Vengo de la contabilidad tradicional. Por eso sé exactamente dónde se rompe un negocio."
    },
    {
        target: "contact",
        title: "Si esto te hizo sentido",
        content: "Podemos ordenar tu sistema sin complicarte ni cambiarlo todo. Hablemos."
    }
];






















interface TourContextProps {
    isTourActive: boolean;
    currentStepIndex: number;
    steps: TourStep[];
    startTour: () => void;
    endTour: () => void;
    nextStep: () => void;
    prevStep: () => void;
}

const TourContext = createContext<TourContextProps | undefined>(undefined);

export const TourProvider = ({ children }: { children: ReactNode }) => {
    const [isTourActive, setIsTourActive] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);

    const startTour = () => {
        setIsTourActive(true);
        setCurrentStepIndex(0);
        // Initial scroll happens in Overlay effect
    };

    const endTour = () => {
        setIsTourActive(false);
        setCurrentStepIndex(-1);
        document.body.style.overflow = ""; // Safety reset
    };

    const nextStep = () => {
        if (currentStepIndex < TOUR_STEPS.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            endTour();
        }
    };

    const prevStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        }
    };

    const value = useMemo(() => ({
        isTourActive,
        currentStepIndex,
        steps: TOUR_STEPS,
        startTour,
        endTour,
        nextStep,
        prevStep
    }), [isTourActive, currentStepIndex]);

    return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};

export const useTour = () => {
    const context = useContext(TourContext);
    if (!context) throw new Error("useTour must be used within a TourProvider");
    return context;
};
