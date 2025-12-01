import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export const KineticBallsAnimation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const themeRef = useRef(resolvedTheme);

    // Update theme ref when theme changes, without triggering re-init
    useEffect(() => {
        themeRef.current = resolvedTheme;
    }, [resolvedTheme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // --- Configuration ---
        const config = {
            count: 10,
            speed: 0.8,
            friction: 0.995,
            minVelocity: 1.5
        };

        // --- Color System ---
        const BASE_COLORS = [
            { r: 245, g: 137, b: 129 }, // #f58981
            { r: 255, g: 213, b: 79 },  // #ffd54f
            { r: 81, g: 187, b: 122 }   // #51bb7a
        ];

        function lerp(start: number, end: number, t: number) {
            return start * (1 - t) + end * t;
        }

        function getRandomBlendedColor() {
            const idx1 = Math.floor(Math.random() * BASE_COLORS.length);
            let idx2 = Math.floor(Math.random() * BASE_COLORS.length);
            while (idx1 === idx2) idx2 = Math.floor(Math.random() * BASE_COLORS.length);

            const c1 = BASE_COLORS[idx1];
            const c2 = BASE_COLORS[idx2];
            const mix = Math.random();

            const r = Math.round(lerp(c1.r, c2.r, mix));
            const g = Math.round(lerp(c1.g, c2.g, mix));
            const b = Math.round(lerp(c1.b, c2.b, mix));

            return `rgb(${r},${g},${b})`;
        }

        // --- Physics Setup ---
        let width = 0;
        let height = 0;
        const particles: Particle[] = [];
        const mouse = { x: -1000, y: -1000, active: false };

        function resize() {
            if (!container || !canvas) return;
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width;
            canvas.height = height;
        }

        class Particle {
            radius: number;
            x: number;
            y: number;
            vx: number;
            vy: number;
            color: string;

            constructor() {
                // Reduced radius: 10 to 22
                this.radius = 10 + Math.random() * 12;
                this.x = Math.random() * (width - 100) + 50;
                this.y = Math.random() * (height - 100) + 50;

                const startSpeed = 5;
                const angle = Math.random() * Math.PI * 2;
                this.vx = Math.cos(angle) * startSpeed;
                this.vy = Math.sin(angle) * startSpeed;

                this.color = getRandomBlendedColor();
            }

            update() {
                // 0. Wall Repulsion (Push away from edges)
                const margin = 50;
                const repulsion = 0.2;

                if (this.x < margin) this.vx += repulsion;
                if (this.x > width - margin) this.vx -= repulsion;
                if (this.y < margin) this.vy += repulsion;
                if (this.y > height - margin) this.vy -= repulsion;

                // 1. Physics Movement
                this.x += this.vx * config.speed;
                this.y += this.vy * config.speed;

                // 2. Wall Collisions
                const padding = this.radius;

                if (this.x > width - padding) {
                    this.x = width - padding;
                    this.vx *= -1;
                } else if (this.x < padding) {
                    this.x = padding;
                    this.vx *= -1;
                }

                if (this.y > height - padding) {
                    this.y = height - padding;
                    this.vy *= -1;
                } else if (this.y < padding) {
                    this.y = padding;
                    this.vy *= -1;
                }

                // 3. Mouse Interaction
                if (mouse.active) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = 180;

                    if (dist < minDist) {
                        const angle = Math.atan2(dy, dx);
                        const force = (minDist - dist) / minDist;

                        this.vx += Math.cos(angle) * force * 1.5;
                        this.vy += Math.sin(angle) * force * 1.5;
                    }
                }

                // 4. Friction & Speed Control
                this.vx *= config.friction;
                this.vy *= config.friction;

                const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

                if (currentSpeed < config.minVelocity && currentSpeed > 0) {
                    const scale = config.minVelocity / currentSpeed;
                    this.vx *= scale;
                    this.vy *= scale;
                } else if (currentSpeed === 0) {
                    this.vx = (Math.random() - 0.5);
                    this.vy = (Math.random() - 0.5);
                }

                const maxSpeed = 8;
                if (currentSpeed > maxSpeed) {
                    const scale = maxSpeed / currentSpeed;
                    this.vx *= scale;
                    this.vy *= scale;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.closePath();

                const gradient = ctx.createRadialGradient(
                    this.x - this.radius * 0.3,
                    this.y - this.radius * 0.3,
                    this.radius * 0.1,
                    this.x,
                    this.y,
                    this.radius
                );

                function adjustColor(rgbStr: string, amount: number) {
                    const parts = rgbStr.match(/\d+/g)?.map(Number);
                    if (!parts) return rgbStr;
                    const r = Math.max(0, Math.min(255, parts[0] + amount));
                    const g = Math.max(0, Math.min(255, parts[1] + amount));
                    const b = Math.max(0, Math.min(255, parts[2] + amount));
                    return `rgb(${r},${g},${b})`;
                }

                const currentTheme = themeRef.current;

                if (currentTheme === 'light') {
                    // Light Mode: White -> Light Color -> Dark Color -> Light Color
                    gradient.addColorStop(0, adjustColor(this.color, 100));   // White/Bright center
                    gradient.addColorStop(0.2, adjustColor(this.color, 50));  // Light color
                    gradient.addColorStop(0.6, adjustColor(this.color, 10));  // Faded/Whitish ring (was -20)
                    gradient.addColorStop(1, adjustColor(this.color, 50));    // Light color edge
                } else {
                    // Dark Mode: Bright center -> Color -> Dark edge (Default)
                    gradient.addColorStop(0, adjustColor(this.color, 100)); // White/Bright center
                    gradient.addColorStop(0.3, this.color);                 // Base color
                    gradient.addColorStop(1, adjustColor(this.color, -50)); // Dark color edge
                }

                ctx.fillStyle = gradient;
                ctx.fill();

                ctx.strokeStyle = currentTheme === 'light' ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        function resolveCollisions() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];

                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = p1.radius + p2.radius;

                    if (dist < minDist) {
                        const angle = Math.atan2(dy, dx);
                        const overlap = minDist - dist;

                        const moveX = (Math.cos(angle) * overlap) / 2;
                        const moveY = (Math.sin(angle) * overlap) / 2;
                        p1.x -= moveX;
                        p1.y -= moveY;
                        p2.x += moveX;
                        p2.y += moveY;

                        const nx = dx / dist;
                        const ny = dy / dist;

                        const dot = (p1.vx - p2.vx) * nx + (p1.vy - p2.vy) * ny;
                        p1.vx = p1.vx - dot * nx;
                        p1.vy = p1.vy - dot * ny;
                        p2.vx = p2.vx + dot * nx;
                        p2.vy = p2.vy + dot * ny;
                    }
                }
            }
        }

        function init() {
            particles.length = 0;
            for (let i = 0; i < config.count; i++) {
                particles.push(new Particle());
            }
        }

        let animationId: number;
        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => p.update());
            resolveCollisions();
            particles.forEach(p => p.draw());

            animationId = requestAnimationFrame(animate);
        }

        // Event Listeners
        const handleMouseMove = (e: MouseEvent) => {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        const handleClick = () => {
            particles.forEach(p => {
                const angle = Math.random() * Math.PI * 2;
                const force = 10;
                p.vx = Math.cos(angle) * force;
                p.vy = Math.sin(angle) * force;
            });
        };

        window.addEventListener('resize', resize);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('click', handleClick);

        // Initial setup
        resize();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseleave', handleMouseLeave);
                container.removeEventListener('click', handleClick);
            }
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full relative overflow-hidden">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
};
