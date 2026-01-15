export type ParticleMode = "hero_index" | "free" | "apps" | "evorixGhost";

export interface Particle {
    x: number;
    y: number;
    targetX?: number;
    targetY?: number;
    originX: number;
    originY: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    isGhost?: boolean;
}

export const MODE_CONFIGS: Record<ParticleMode, {
    count: number;
    speed: number;
    drift: number;
    attraction: number;
    grid: boolean;
}> = {
    hero_index: {
        count: 80,
        speed: 0.4,
        drift: 0.2,
        attraction: 0.02,
        grid: false
    },
    free: {
        count: 150,
        speed: 0.6,
        drift: 0.5,
        attraction: 0,
        grid: false
    },
    apps: {
        count: 120,
        speed: 0.8,
        drift: 0.1,
        attraction: 0,
        grid: true
    },
    evorixGhost: {
        count: 400, // Higher for text resolution
        speed: 1.2,
        drift: 0,
        attraction: 0,
        grid: false
    }
};
