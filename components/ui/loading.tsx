"use client";

import { useEffect, useState } from "react";
import { Loader2, Wrench, Home, Phone, CheckCircle } from "lucide-react";
import Logo from "@/components/Logo";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export function LoadingSpinner({ size = "md", text, className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-[var(--primary-color)]`} />
      {text && <span className="text-sm text-slate-600">{text}</span>}
    </div>
  );
}

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = "Loading..." }: PageLoadingProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-1/2 -z-10"></div>
      
      <div className="relative z-10 text-center">
        <div className="luxury-card bg-white p-8 sm:p-12 rounded-[24px] shadow-lg border border-slate-100 max-w-md mx-auto">
          {/* Logo - Prominent and Visible */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <Logo priority />
            </div>
            <span className="font-quantum text-[10px] tracking-[0.5em] text-[var(--accent-gold)] block font-bold uppercase">
              PLUSPRO
            </span>
          </div>

          {/* Loading Animation */}
          <div className="mb-6">
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-[var(--primary-color)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-[var(--accent-gold)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <p className="text-slate-600 font-medium text-sm sm:text-base">
              {message}{dots}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-gold)] h-full rounded-full animate-pulse" 
                 style={{ width: '60%', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FormLoadingProps {
  message?: string;
}

export function FormLoading({ message = "Processing..." }: FormLoadingProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="luxury-card bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 max-w-sm mx-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-color)]" />
          </div>
          <p className="text-slate-700 font-medium mb-2">{message}</p>
          <p className="text-sm text-slate-500">Please wait a moment...</p>
        </div>
      </div>
    </div>
  );
}

interface ButtonLoadingProps {
  children: React.ReactNode;
  loading: boolean;
  className?: string;
}

export function ButtonLoading({ children, loading, className = "" }: ButtonLoadingProps) {
  return (
    <button 
      className={`relative ${className}`}
      disabled={loading}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      )}
      <span className={loading ? "opacity-0" : ""}>
        {children}
      </span>
    </button>
  );
}

interface SkeletonProps {
  className?: string;
  lines?: number;
}

export function Skeleton({ className = "", lines = 3 }: SkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="h-4 bg-slate-100 rounded animate-pulse"
          style={{ 
            width: `${Math.random() * 40 + 60}%`,
            animationDelay: `${i * 100}ms`
          }}
        ></div>
      ))}
    </div>
  );
}

interface CardSkeletonProps {
  count?: number;
}

export function CardSkeleton({ count = 3 }: CardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="luxury-card bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-slate-100 rounded-xl mb-4"></div>
            <div className="h-6 bg-slate-100 rounded mb-3 w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-100 rounded"></div>
              <div className="h-4 bg-slate-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Quick loading dots for inline use
export function LoadingDots() {
  return (
    <div className="inline-flex gap-1">
      <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
}

// Service loading animation
export function ServiceLoading() {
  const services = [
    { icon: Home, color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Wrench, color: "text-green-600", bg: "bg-green-50" },
    { icon: Phone, color: "text-purple-600", bg: "bg-purple-50" },
    { icon: CheckCircle, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="flex justify-center gap-4">
      {services.map((service, i) => {
        const Icon = service.icon;
        return (
          <div 
            key={i}
            className={`w-12 h-12 ${service.bg} rounded-xl flex items-center justify-center animate-pulse`}
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <Icon className={`w-6 h-6 ${service.color}`} />
          </div>
        );
      })}
    </div>
  );
}
