"use client";

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

export interface TourStep {
    id: string;
    title: string;
    content: string;
    target: string; // CSS selector OR data-tour value
}

const TOUR_STEPS: TourStep[] = [
    {
        id: "hero",
        title: "Bienvenido a EVORIX",
        content:
            "Aquí comienza tu evolución digital. Nuestra propuesta de valor se centra en resultados tangibles.",
        target: "hero",
    },
    {
        id: "problem",
        title: "Identificamos el Caos",
        content: "Entendemos los cuellos de botella que frenan tu crecimiento.",
        target: "problem",
    },
    {
        id: "services",
        title: "Servicios Estratégicos",
        content: "Explora nuestras soluciones modulares diseñadas para escalar.",
        target: "services",
    },
    {
        id: "tools",
        title: "Tecnología Propia",
        content:
            "EVOAPP es nuestra terminal de control centralizada. Gestión en tiempo real.",
        target: "tools",
    },
    {
        id: "testimonials",
        title: "Casos de Éxito",
        content: "La confianza de líderes que ya transformaron sus sistemas.",
        target: "testimonials",
    },
    {
        id: "contact",
        title: "Paso Final",
        content: "¿Listo para empezar? Conéctanos directamente vía WhatsApp.",
        target: "contact",
    },
];

interface TourContextType {
    currentStepIndex: number;
    steps: TourStep[];
    isTourActive: boolean;
    startTour: () => void;
    endTour: () => void;
    nextStep: () => void;
    prevStep: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider = ({ children }: { children: ReactNode }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);
    const [isTourActive, setIsTourActive] = useState(false);

    // IMPORTANT: must always hard-reset to step 0 so the button "always works"
    const startTour = React.useCallback(() => {
        setIsTourActive(true);
        setCurrentStepIndex(0);
        // Overflow is handled by TourOverlay
    }, []);

    const endTour = React.useCallback(() => {
        setIsTourActive(false);
        setCurrentStepIndex(-1);
        sessionStorage.setItem("evorix-tour-completed", "true");
    }, []);

    const nextStep = React.useCallback(() => {
        setCurrentStepIndex((prev) => {
            if (prev < TOUR_STEPS.length - 1) return prev + 1;
            endTour();
            return -1;
        });
    }, [endTour]);

    const prevStep = React.useCallback(() => {
        setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }, []);

    useEffect(() => {
        if (!isTourActive || currentStepIndex < 0) return;

        const step = TOUR_STEPS[currentStepIndex];

        // ✅ Match TourOverlay logic:
        // - If target looks like CSS selector (. # [) use it directly
        // - Otherwise assume [data-tour="..."]
        const selector = /^([.#[])/.test(step.target)
            ? step.target
            : `[data-tour="${step.target}"]`;

        const element = document.querySelector(selector);

        if (element) {
            element.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "auto"
                    : "smooth",
                block: "center",
            });
        }
    }, [currentStepIndex, isTourActive]);

    const value = React.useMemo(
        () => ({
            currentStepIndex,
            steps: TOUR_STEPS,
            isTourActive,
            startTour,
            endTour,
            nextStep,
            prevStep,
        }),
        [currentStepIndex, isTourActive, startTour, endTour, nextStep, prevStep]
    );

    return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};

export const useTour = () => {
    const context = useContext(TourContext);
    if (context === undefined) {
        throw new Error("useTour must be used within a TourProvider");
    }
    return context;
};
