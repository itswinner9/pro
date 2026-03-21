"use client";

import Image from "next/image";
import { useState } from "react";

interface LogoProps {
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function Logo({ className = "", sizes, priority = false }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className={`font-quantum text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--primary-color)] ${className}`}>
        PlusPro
      </div>
    );
  }

  return (
    <div className={`relative w-56 sm:w-64 md:w-72 h-20 sm:h-24 md:h-28 flex items-center justify-center ${className}`} style={{ zIndex: 999 }}>
      <Image
        src="/logo.png"
        alt="PlusPro Services Logo"
        fill
        className="object-contain"
        priority={priority}
        sizes={sizes || "(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"}
        onError={() => setImageError(true)}
        style={{ position: 'absolute', zIndex: 1000 }}
      />
    </div>
  );
}

