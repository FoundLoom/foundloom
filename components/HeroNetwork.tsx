"use client";

import { useEffect, useRef } from "react";
import { useMotionAllowed } from "@/lib/useMotionAllowed";

/**
 * Hero backdrop: a slow field of connected points, with small lime pulses
 * travelling along the connections. People, and the links between them.
 *
 * Drawn on one canvas so it costs a single layer however many points there
 * are. Things it does to stay cheap and polite:
 *   - the number of points scales with the area, and is capped;
 *   - the pixel ratio is capped at 2;
 *   - it stops drawing when the hero is off screen or the tab is hidden;
 *   - under reduced motion it draws one still frame and never animates.
 * The canvas ignores the pointer, so the copy and buttons above it stay
 * fully interactive. Without JavaScript the hero simply shows its grid.
 */

type Node = { x: number; y: number; vx: number; vy: number; r: number; lime: boolean };
type Pulse = { a: number; b: number; t: number; speed: number };

const LINK_DISTANCE = 170;
const LIME = "221, 255, 70";
const NEUTRAL = "214, 220, 224";

export default function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionAllowed = useMotionAllowed();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let frame = 0;
    let last = 0;
    let onScreen = true;

    const seed = () => {
      const count = Math.round(
        Math.min(96, Math.max(26, (width * height) / 15000)),
      );
      nodes = Array.from({ length: count }, () => {
        const lime = Math.random() < 0.16;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.24,
          vy: (Math.random() - 0.5) * 0.24,
          r: lime ? 2.1 : 1.1 + Math.random() * 0.7,
          lime,
        };
      });
      pulses = Array.from({ length: Math.round(count / 7) }, () => newPulse());
    };

    /** A pulse on a random pair of points that are currently linked. */
    function newPulse(): Pulse {
      for (let attempt = 0; attempt < 24; attempt++) {
        const a = Math.floor(Math.random() * nodes.length);
        const b = Math.floor(Math.random() * nodes.length);
        if (a === b) continue;
        const dx = nodes[a].x - nodes[b].x;
        const dy = nodes[a].y - nodes[b].y;
        if (dx * dx + dy * dy < LINK_DISTANCE * LINK_DISTANCE) {
          return { a, b, t: 0, speed: 0.35 + Math.random() * 0.4 };
        }
      }
      return { a: 0, b: 0, t: 1, speed: 1 };
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      seed();
      draw(0);
    };

    /** Advance by `dt` seconds (0 for a still frame) and paint. */
    function draw(dt: number) {
      context!.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx * dt * 60;
        node.y += node.vy * dt * 60;
        if (node.x < -20) node.x = width + 20;
        else if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        else if (node.y > height + 20) node.y = -20;
      }

      context!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > LINK_DISTANCE) continue;
          const strength = 1 - distance / LINK_DISTANCE;
          const tone = nodes[i].lime || nodes[j].lime ? LIME : NEUTRAL;
          context!.strokeStyle = `rgba(${tone}, ${strength * 0.3})`;
          context!.beginPath();
          context!.moveTo(nodes[i].x, nodes[i].y);
          context!.lineTo(nodes[j].x, nodes[j].y);
          context!.stroke();
        }
      }

      for (const node of nodes) {
        context!.fillStyle = node.lime
          ? `rgba(${LIME}, 0.9)`
          : `rgba(${NEUTRAL}, 0.55)`;
        context!.beginPath();
        context!.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        context!.fill();
      }

      for (let p = 0; p < pulses.length; p++) {
        const pulse = pulses[p];
        pulse.t += pulse.speed * dt;
        const from = nodes[pulse.a];
        const to = nodes[pulse.b];
        if (pulse.t >= 1 || !from || !to) {
          pulses[p] = newPulse();
          continue;
        }
        const x = from.x + (to.x - from.x) * pulse.t;
        const y = from.y + (to.y - from.y) * pulse.t;
        const tail = Math.max(0, pulse.t - 0.22);
        const tx = from.x + (to.x - from.x) * tail;
        const ty = from.y + (to.y - from.y) * tail;
        /* Fade in and out at the ends so pulses never pop. */
        const alpha = Math.sin(pulse.t * Math.PI);

        const trail = context!.createLinearGradient(tx, ty, x, y);
        trail.addColorStop(0, `rgba(${LIME}, 0)`);
        trail.addColorStop(1, `rgba(${LIME}, ${alpha * 0.75})`);
        context!.strokeStyle = trail;
        context!.lineWidth = 1.5;
        context!.beginPath();
        context!.moveTo(tx, ty);
        context!.lineTo(x, y);
        context!.stroke();

        context!.fillStyle = `rgba(${LIME}, ${alpha})`;
        context!.beginPath();
        context!.arc(x, y, 2, 0, Math.PI * 2);
        context!.fill();
        context!.lineWidth = 1;
      }
    }

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      draw(dt);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (motionAllowed && onScreen && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    };

    resize();
    start();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      start();
    });
    visibility.observe(canvas);

    document.addEventListener("visibilitychange", start);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
  }, [motionAllowed]);

  return <canvas ref={canvasRef} className="hero-network" aria-hidden="true" />;
}
