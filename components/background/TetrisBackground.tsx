"use client";

import { useEffect, useRef, useState } from "react";

interface TetrisBackgroundProps {
  className?: string;
  base?: number;
  squareColor?: string;
  speed?: number;
}

export default function TetrisBackground({
  className = "",
  base = 15,
  squareColor = "#00C16A",
  speed = 2,
}: TetrisBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationFrameRef = useRef<number>();
  const blocksRef = useRef<Block[]>([]);

  interface Block {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    opacity: number;
    falling: boolean;
    fallSpeed: number;
  }

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Initialize blocks
    const initBlocks = () => {
      blocksRef.current = [];
      const cols = Math.floor(dimensions.width / base);
      const rows = Math.floor(dimensions.height / base);

      for (let i = 0; i < 20; i++) {
        blocksRef.current.push({
          x: Math.random() * cols * base,
          y: -Math.random() * dimensions.height,
          width: base,
          height: base,
          color: squareColor,
          opacity: 0.3 + Math.random() * 0.4,
          falling: true,
          fallSpeed: 0.5 + Math.random() * speed,
        });
      }
    };

    initBlocks();

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      blocksRef.current = blocksRef.current.filter((block) => {
        const blockRight = block.x + block.width;
        const blockBottom = block.y + block.height;
        return !(
          x >= block.x &&
          x <= blockRight &&
          y >= block.y &&
          y <= blockBottom
        );
      });

      // Add new blocks to maintain count
      const cols = Math.floor(dimensions.width / base);
      for (let i = 0; i < 3; i++) {
        blocksRef.current.push({
          x: Math.random() * cols * base,
          y: -base,
          width: base,
          height: base,
          color: squareColor,
          opacity: 0.3 + Math.random() * 0.4,
          falling: true,
          fallSpeed: 0.5 + Math.random() * speed,
        });
      }
    };

    canvas.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blocksRef.current.forEach((block) => {
        if (block.falling) {
          block.y += block.fallSpeed;

          if (block.y > canvas.height) {
            block.y = -block.height;
            block.x = Math.random() * Math.floor(canvas.width / base) * base;
          }
        }

        ctx.fillStyle = block.color;
        ctx.globalAlpha = block.opacity;
        ctx.fillRect(block.x, block.y, block.width, block.height);
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener("click", handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, base, squareColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: "auto" }}
    />
  );
}

