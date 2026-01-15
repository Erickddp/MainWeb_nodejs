"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";

export interface TourStep {
    target: string; // The data-tour ID
    title: string;
    content: string;
}

const TOUR_STEPS: TourStep[] = [
    { target: "hero", title: "Bienvenido a EVORIX", content: "Donde la contabilidad convencional evoluciona a sistemas inteligentes. Comienza tu transformación aquí." },
    { target: "problem", title: "El Problema", content: "La contabilidad tradicional es lenta y reactiva. Identificamos los cuellos de botella que frenan tu crecimiento." },
    { target: "services", title: "Nuestras Soluciones", content: "Desde automatización fiscal hasta estrategia financiera. Servicios diseñados para la era digital." },
    { target: "tools", title: "Tecnología Propia", content: "Conoce Evosys y nuestras herramientas exclusivas. Potencia real bajo tu control." },
    { target: "testimonials", title: "Casos de Éxito", content: "Empresas que ya han evolucionado con nosotros. Resultados reales y medibles." },
    { target: "contact", title: "Contacta", content: "¿Listo para dar el siguiente paso? Hablemos de cómo integrar EVORIX en tu negocio." }
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
