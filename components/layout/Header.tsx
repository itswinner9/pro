"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PHONE_NUMBER } from "@/lib/utils";
import { Menu, X, Phone } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-[100] pointer-events-none">
        <div className="fixed top-0 left-0 w-full px-4 pt-6 pointer-events-none">
          <nav
            className={`max-w-7xl mx-auto bg-white border border-slate-200 rounded-[2rem] px-6 lg:px-8 py-5 flex items-center justify-between pointer-events-auto transition-all duration-500 shadow-sm ${
              scrolled ? 'nav-scrolled' : ''
            }`}
            id="main-nav"
          >
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center h-10">
                <Image
                  src="/widelogo.png"
                  alt="PlusPro Services"
                  width={220}
                  height={40}
                  className="h-10 w-auto object-contain max-w-[220px]"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">
              <Link
                href="/#services"
                className="hover:text-[var(--primary-color)] transition-all duration-300 relative group py-1"
              >
                Our Services
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
              <Link
                href="/#why-choose"
                className="hover:text-[var(--primary-color)] transition-all duration-300 relative group py-1"
              >
                About Us
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
              <Link
                href="/blog"
                className="hover:text-[var(--primary-color)] transition-all duration-300 relative group py-1"
              >
                Blog
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
              <Link
                href="/#areas"
                className="hover:text-[var(--primary-color)] transition-all duration-300 relative group py-1"
              >
                Our Areas
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-[var(--primary-color)] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {/* Phone - Desktop */}
              <a
                href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
                className="hidden sm:flex items-center gap-2 border border-slate-200 text-slate-800 px-4 lg:px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden lg:inline">Call Now</span>
              </a>

              {/* CTA Button */}
              <Link
                href="/request-quote"
                className="bg-[var(--primary-color)] text-white px-4 lg:px-7 py-2.5 lg:py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-opacity-90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Quote
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-700" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-700" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
                  <img 
                    src="/widelogo.png" 
                    alt="PlusPro Services" 
                    className="h-8 w-auto object-contain max-w-[160px]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (!e.currentTarget.nextElementSibling) {
                        const textLogo = document.createElement('span');
                        textLogo.className = 'font-quantum text-xl font-bold text-[var(--primary-color)]';
                        textLogo.textContent = 'PlusPro';
                        e.currentTarget.parentElement?.appendChild(textLogo);
                      }
                    }}
                  />
                  <span className="font-quantum text-xl font-bold text-[var(--primary-color)] hidden" style={{display: 'none'}}>
                    PlusPro
                  </span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Services Section */}
              <div>
                <h3 className="text-xs font-bold text-[var(--accent-gold)] tracking-widest uppercase mb-4">Services</h3>
                <div className="space-y-3">
                  <Link
                    href="/book-service"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-[var(--primary-color)]">event_available</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Book Service</p>
                      <p className="text-sm text-slate-500">Schedule appointment</p>
                    </div>
                  </Link>
                  
                  <Link
                    href="/request-quote"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-600">description</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Get Quote</p>
                      <p className="text-sm text-slate-500">Free estimate</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Navigation Links */}
              <div>
                <h3 className="text-xs font-bold text-[var(--accent-gold)] tracking-widest uppercase mb-4">Navigation</h3>
                <div className="space-y-2">
                  <Link
                    href="/#services"
                    onClick={closeMobileMenu}
                    className="block px-3 py-2 text-slate-700 hover:text-[var(--primary-color)] transition-colors"
                  >
                    Our Services
                  </Link>
                  <Link
                    href="/#why-choose"
                    onClick={closeMobileMenu}
                    className="block px-3 py-2 text-slate-700 hover:text-[var(--primary-color)] transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/#areas"
                    onClick={closeMobileMenu}
                    className="block px-3 py-2 text-slate-700 hover:text-[var(--primary-color)] transition-colors"
                  >
                    Our Areas
                  </Link>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-xs font-bold text-[var(--accent-gold)] tracking-widest uppercase mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[var(--primary-color)] rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Call Us</p>
                      <p className="text-sm text-slate-500">{PHONE_NUMBER}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Call Button (Mobile Only) */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <a
          href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
          className="w-14 h-14 bg-[var(--primary-color)] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>
    </>
  );
}
