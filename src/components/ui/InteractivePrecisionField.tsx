'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface InteractivePrecisionFieldProps {
  theme?: 'light' | 'dark';
  className?: string;
}

interface FieldParticle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  accent: boolean;
  phase: number;
}

const INTERACTION_RADIUS = 175;
const SPRING_STIFFNESS = 0.045;
const DAMPING = 0.84;
const PUSH_FORCE = 2.6;

export function InteractivePrecisionField({
  theme = 'light',
  className,
}: InteractivePrecisionFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let width = 0;
    let height = 0;
    let particles: FieldParticle[] = [];
    let animationId = 0;

    const pointer = { x: -9999, y: -9999, active: false };

    const buildParticles = () => {
      const spacing = width < 640 ? 54 : 46;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const next: FieldParticle[] = [];

      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const jitterX = (((r * 31 + c * 17) % 11) - 5) * 2.1;
          const jitterY = (((r * 19 + c * 29) % 11) - 5) * 2.1;
          const ox = c * spacing + jitterX;
          const oy = r * spacing + jitterY;
          next.push({
            originX: ox,
            originY: oy,
            x: ox,
            y: oy,
            vx: 0,
            vy: 0,
            radius: (r + c) % 5 === 0 ? 1.85 : 1.25,
            accent: (r * 7 + c * 13) % 9 === 0,
            phase: (r * 0.5 + c * 0.35) % (Math.PI * 2),
          });
        }
      }
      particles = next;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= -60 && x <= rect.width + 60 && y >= -60 && y <= rect.height + 60) {
        pointer.x = x;
        pointer.y = y;
        pointer.active = true;
      } else {
        pointer.active = false;
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const t = time * 0.0007;
      const activeNodes: Array<{ p: FieldParticle; intensity: number }> = [];

      // Subtle radial pointer glow
      if (pointer.active && !prefersReducedMotion) {
        const grad = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          INTERACTION_RADIUS * 1.15,
        );
        if (theme === 'dark') {
          grad.addColorStop(0, 'rgba(30, 58, 95, 0.22)');
          grad.addColorStop(0.55, 'rgba(158, 28, 40, 0.08)');
          grad.addColorStop(1, 'rgba(14, 19, 29, 0)');
        } else {
          grad.addColorStop(0, 'rgba(30, 58, 95, 0.07)');
          grad.addColorStop(0.55, 'rgba(15, 20, 30, 0.03)');
          grad.addColorStop(1, 'rgba(244, 243, 239, 0)');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const driftX = prefersReducedMotion ? 0 : Math.cos(t + p.phase) * 2.2;
        const driftY = prefersReducedMotion ? 0 : Math.sin(t * 0.9 + p.phase) * 2.2;
        const targetX = p.originX + driftX;
        const targetY = p.originY + driftY;

        let intensity = 0;

        if (pointer.active && !prefersReducedMotion) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);

          if (dist < INTERACTION_RADIUS && dist > 0.001) {
            intensity = 1 - dist / INTERACTION_RADIUS;
            const force = intensity * intensity * PUSH_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Spring back to drifting origin
        p.vx += (targetX - p.x) * SPRING_STIFFNESS;
        p.vy += (targetY - p.y) * SPRING_STIFFNESS;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        if (intensity > 0.18) {
          activeNodes.push({ p, intensity });
        }

        // Draw particle
        const r = p.radius + intensity * 1.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);

        if (theme === 'dark') {
          ctx.fillStyle =
            p.accent && intensity > 0.15
              ? `rgba(180, 35, 48, ${0.32 + intensity * 0.55})`
              : `rgba(203, 213, 225, ${0.12 + intensity * 0.48})`;
        } else {
          ctx.fillStyle =
            p.accent && intensity > 0.15
              ? `rgba(158, 28, 40, ${0.24 + intensity * 0.52})`
              : `rgba(30, 58, 95, ${0.12 + intensity * 0.42})`;
        }
        ctx.fill();
      }

      // Draw whisper-fine geometric connections only inside cursor aura
      if (activeNodes.length > 1 && !prefersReducedMotion) {
        ctx.lineWidth = 0.75;
        for (let i = 0; i < activeNodes.length; i += 1) {
          for (let j = i + 1; j < activeNodes.length; j += 1) {
            const a = activeNodes[i];
            const b = activeNodes[j];
            const d = Math.hypot(a.p.x - b.p.x, a.p.y - b.p.y);
            if (d < 78) {
              const alpha = (1 - d / 78) * Math.min(a.intensity, b.intensity) * 0.42;
              ctx.beginPath();
              ctx.moveTo(a.p.x, a.p.y);
              ctx.lineTo(b.p.x, b.p.y);
              ctx.strokeStyle =
                theme === 'dark'
                  ? `rgba(248, 113, 113, ${alpha})`
                  : `rgba(11, 45, 91, ${alpha})`;
              ctx.stroke();
            }
          }
        }
      }

      if (!prefersReducedMotion) {
        animationId = window.requestAnimationFrame(drawFrame);
      }
    };

    animationId = window.requestAnimationFrame(drawFrame);

    return () => {
      window.cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  );
}
