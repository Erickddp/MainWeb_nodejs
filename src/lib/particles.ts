// Stub for particle engine configuration
export const particleConfig = {
    density: 100,
    speed: 1,
    color: "#ffffff",
    interactive: true
};

export class ParticleEngine {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    init() {
        console.log("Particle Engine Initialized");
    }

    animate() {
        // Animation loop stub
    }
}
