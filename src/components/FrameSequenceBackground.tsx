"use client";
import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 240;
const FRAME_PAD = 3;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
const INITIAL_PRELOAD_COUNT = 15; // Load initial 15 frames for instant playback
const BATCH_SIZE = 5; // Progressive batch size to avoid triggering GitHub Pages rate limit
const BATCH_DELAY_MS = 120; // Throttled batch interval

export default function FrameSequenceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastRenderTimeRef = useRef<number>(0);
  const [, setHasStarted] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = [];

    const prefix = typeof window !== "undefined" && window.location.pathname.startsWith("/FlowForgeAI")
      ? "/FlowForgeAI"
      : "";

    // Create 240 Image placeholders
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      images.push(img);
    }
    imagesRef.current = images;

    // Helper to load a specific frame
    const loadFrame = (index: number) => {
      if (index >= TOTAL_FRAMES || isCancelled) return;
      const img = imagesRef.current[index];
      if (img && !img.src) {
        const frameNum = String(index + 1).padStart(FRAME_PAD, "0");
        img.src = `${prefix}/bg-frames/ezgif-frame-${frameNum}.jpg`;
        if (index === 0) {
          img.onload = () => {
            if (!isCancelled) setHasStarted(true);
          };
        }
      }
    };

    // Step 1: Preload initial frames for instant start
    for (let i = 0; i < INITIAL_PRELOAD_COUNT; i++) {
      loadFrame(i);
    }

    // Step 2: Queue remaining frames in throttled batches to prevent GitHub Pages rate-limiting
    let currentBatchIndex = INITIAL_PRELOAD_COUNT;
    const batchInterval = setInterval(() => {
      if (isCancelled || currentBatchIndex >= TOTAL_FRAMES) {
        clearInterval(batchInterval);
        return;
      }
      for (let b = 0; b < BATCH_SIZE && currentBatchIndex < TOTAL_FRAMES; b++) {
        loadFrame(currentBatchIndex);
        currentBatchIndex++;
      }
    }, BATCH_DELAY_MS);

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

      // Fill fallback background gradient
      const grad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        100,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      grad.addColorStop(0, "#1e1b4b");
      grad.addColorStop(0.5, "#0f172a");
      grad.addColorStop(1, "#020617");
      ctx.fillStyle = grad;
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
      clearInterval(batchInterval);
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
