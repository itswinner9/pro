"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PHONE_NUMBER } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] px-4 pt-6 pointer-events-none">
      <nav
        className={`max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2rem] px-8 py-5 flex items-center justify-between pointer-events-auto transition-all duration-500 shadow-sm ${
          scrolled ? 'nav-scrolled' : ''
        }`}
        id="main-nav"
      >
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <span className="font-quantum font-bold text-xl tracking-tighter text-[var(--primary-color)]">
              PLUSPRO
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">
          <Link
            href="#services"
            className="hover:text-[var(--primary-color)] transition-all duration-300 relative group py-1"
          >
            Services
            <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
          <Link
            href="#areas"
            className="hover:text-[var(--primary-color)] transition-all duration-300 relative group py-1"
          >
            Areas
            <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
          <Link
            href="#booking"
            className="hover:text-[var(--primary-color)] transition-all duration-300 relative group py-1"
          >
            Book / Quote
            <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
            className="hidden sm:flex items-center gap-2 border border-slate-200 text-slate-800 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all duration-300"
          >
            <span className="material-symbols-outlined text-sm">call</span>
            Call Now
          </a>
          <Link
            href="#booking"
            className="bg-[var(--primary-color)] text-white px-7 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Quote
          </Link>
        </div>
      </nav>
    </div>
  );
}
