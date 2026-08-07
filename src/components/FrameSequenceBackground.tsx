"use client";
import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 240;
const FRAME_PAD = 3;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export default function FrameSequenceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastRenderTimeRef = useRef<number>(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = [];

    const prefix = typeof window !== "undefined" && window.location.pathname.startsWith("/FlowForgeAI")
      ? "/FlowForgeAI"
      : "";

    // Preload and cache all 240 sequential frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(FRAME_PAD, "0");
      img.src = `${prefix}/bg-frames/ezgif-frame-${frameNum}.jpg`;

      // When the first frame is ready, trigger immediate first render
      if (i === 1) {
        img.onload = () => {
          if (!isCancelled) {
            setHasStarted(true);
          }
        };
      }

      images.push(img);
    }

    imagesRef.current = images;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Handle High-DPI Upscaling & Crisp Rendering
    const handleResize = () => {
      if (!canvas || !ctx) return;
      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = (timestamp: number) => {
      animationFrameIdRef.current = requestAnimationFrame(render);

      const elapsed = timestamp - lastRenderTimeRef.current;
      if (elapsed < FRAME_INTERVAL) return;

      lastRenderTimeRef.current = timestamp - (elapsed % FRAME_INTERVAL);

      const frameIdx = currentFrameRef.current;
      const img = imagesRef.current[frameIdx];

      if (img && img.complete && img.naturalWidth > 0) {
        const width = canvas.width;
        const height = canvas.height;

        // Centered cover aspect ratio
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = width / height;

        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawHeight = width / imgRatio;
          offsetY = (height - drawHeight) / 2;
        } else {
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      // Continuous loop through 0 -> 239 -> 0
      currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
    };

    animationFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      isCancelled = true;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="frame-sequence-bg-container" aria-hidden="true">
      <canvas ref={canvasRef} className="frame-sequence-canvas" />
      {/* High clarity readability overlay for foreground text */}
      <div className="frame-sequence-overlay" />
    </div>
  );
}
