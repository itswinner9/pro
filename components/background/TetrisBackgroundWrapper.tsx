"use client";

import { useState, useEffect } from "react";
import TetrisBackground from "./TetrisBackground";

interface TetrisBackgroundWrapperProps {
  children: React.ReactNode;
  className?: string;
  squareColor?: string;
  base?: number;
  speed?: number;
}

export default function TetrisBackgroundWrapper({
  children,
  className = "",
  squareColor = "#1e3a8a",
  base = 15,
  speed = 2,
}: TetrisBackgroundWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${className}`}>
      {mounted && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <TetrisBackground
            squareColor={squareColor}
            base={base}
            speed={speed}
            className="opacity-20 md:opacity-30 [mask-image:radial-gradient(closest-side,currentColor,transparent)]"
          />
        </div>
      )}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

