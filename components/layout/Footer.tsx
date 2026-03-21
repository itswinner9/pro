import Link from "next/link";
import { PHONE_NUMBER, EMAIL, WHATSAPP_LINK } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--primary-color)] text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <div className="font-quantum font-bold text-2xl tracking-tighter mb-8">PLUSPRO</div>
            <p className="text-slate-400 text-sm font-normal leading-relaxed mb-8">
              Your premium partner for home repair and maintenance across the Lower Mainland. Quality craftsmanship, guaranteed.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5"
              >
                <span className="material-symbols-outlined text-sm">public</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5"
              >
                <span className="material-symbols-outlined text-sm">alternate_email</span>
              </a>
            </div>
          </div>
          <div>
            <h5 className="font-quantum text-[10px] font-bold mb-8 tracking-widest text-[var(--accent-gold)]">
              SERVICES
            </h5>
            <ul className="space-y-4 text-sm font-normal text-slate-300">
              <li>
                <Link href="/services/plumbing-repairs" className="hover:text-white transition-colors">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link href="/services/drain-cleaning" className="hover:text-white transition-colors">
                  Drain Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services/handyman-services" className="hover:text-white transition-colors">
                  Handyman
                </Link>
              </li>
              <li>
                <Link href="/services/emergency-repairs" className="hover:text-white transition-colors">
                  Emergency Repair
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-quantum text-[10px] font-bold mb-8 tracking-widest text-[var(--accent-gold)]">
              COMPANY
            </h5>
            <ul className="space-y-4 text-sm font-normal text-slate-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/areas" className="hover:text-white transition-colors">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Review Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-quantum text-[10px] font-bold mb-8 tracking-widest text-[var(--accent-gold)]">
              CONTACT
            </h5>
            <div className="space-y-6 text-sm font-normal text-slate-300">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">call</span>
                <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`} className="hover:text-white transition-colors">
                  {PHONE_NUMBER}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">sms</span>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">mail</span>
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">
                  {EMAIL}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-sm mt-1">location_on</span>
                <div itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="addressLocality">Vancouver</span>, <span itemProp="addressRegion">BC</span><br />
                  <span itemProp="addressRegion">Lower Mainland</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase font-quantum">
            © {currentYear} PLUSPRO SERVICES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Licensed · Bonded · Insured
            </span>
          </div>
        </div>
        <p className="text-center text-[10px] text-slate-500 mt-6 font-quantum">
          Fully developed by Saka
        </p>
      </div>
    </footer>
  );
}
