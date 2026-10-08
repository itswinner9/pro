"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PHONE_NUMBER, PHONE_DIGITS } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#services", label: "Our Services" },
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/#areas", label: "Our Areas" },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[100] px-4 pt-6 pointer-events-none">
        <nav
          className={`max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2rem] px-8 py-5 flex items-center justify-between pointer-events-auto transition-all duration-500 shadow-sm ${
            scrolled ? "nav-scrolled" : ""
          }`}
          id="main-nav"
        >
          <Link href="/" className="flex items-center flex-shrink-0 h-10">
            <Image src="/widelogo.png" alt="PlusPro Services" width={180} height={40} className="h-10 w-auto object-contain" priority />
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[var(--primary-color)] transition-all duration-300 relative group py-1"
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${PHONE_DIGITS}`}
              className="hidden sm:flex items-center gap-2 border border-slate-200 text-slate-800 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all duration-300"
            >
              <span className="material-symbols-outlined text-sm">call</span>
              Call Now
            </a>
            <Link
              href="/#booking"
              className="bg-[var(--primary-color)] text-white px-7 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
            </button>
          </div>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="h-10">
                  <Image src="/widelogo.png" alt="PlusPro Services" width={160} height={36} className="h-9 w-auto object-contain" />
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-quantum text-[10px] font-bold tracking-widest text-[var(--accent-gold)] mb-4">NAVIGATION</h3>
                <div className="space-y-2">
                  <Link href="/#services" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-[var(--primary-color)] transition-colors">Our Services</Link>
                  <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-[var(--primary-color)] transition-colors">About Us</Link>
                  <Link href="/careers" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-[var(--primary-color)] transition-colors">Careers</Link>
                  <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-[var(--primary-color)] transition-colors">Blog</Link>
                  <Link href="/#areas" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-[var(--primary-color)] transition-colors">Our Areas</Link>
                  <Link href="/#booking" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-[var(--primary-color)] transition-colors">Book / Quote</Link>
                </div>
              </div>
              <div>
                <h3 className="font-quantum text-[10px] font-bold tracking-widest text-[var(--accent-gold)] mb-4">QUICK ACTIONS</h3>
                <Link href="/book-service" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-[var(--primary-color)]">event_available</span>
                  <span className="font-semibold text-slate-900">Book Service</span>
                </Link>
                <Link href="/request-quote" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-[var(--primary-color)]">description</span>
                  <span className="font-semibold text-slate-900">Get Quote</span>
                </Link>
                <a href={`tel:${PHONE_DIGITS}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className="material-symbols-outlined text-[var(--primary-color)]">call</span>
                  <span className="font-semibold text-slate-900">Call {PHONE_NUMBER}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <a href={`tel:${PHONE_DIGITS}`} className="w-14 h-14 bg-[var(--primary-color)] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-2xl">call</span>
        </a>
      </div>
    </>
  );
}
