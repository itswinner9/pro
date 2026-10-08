import Link from "next/link";
import { PHONE_NUMBER, PHONE_DIGITS, EMAIL, WHATSAPP_NUMBER, SITE_URL } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--primary-color)] text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <div className="font-quantum font-bold text-2xl tracking-tighter mb-8">PlusPro Services</div>
            <p className="text-slate-400 text-sm font-normal leading-relaxed mb-8">
              Your premium partner for home repair and maintenance across the Lower Mainland. Quality craftsmanship,
              guaranteed.
            </p>
            <div className="flex gap-4">
              <a
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                aria-label="Website"
              >
                <span className="material-symbols-outlined text-sm">public</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                aria-label="Email"
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
                <Link href="/services/home-maintenance" className="hover:text-white transition-colors">
                  Home Maintenance
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
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/#areas" className="hover:text-white transition-colors">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Review Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
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
              <a href={`tel:${PHONE_DIGITS}`} className="flex items-center gap-3 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">call</span>
                {PHONE_NUMBER}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-sm">sms</span>
                WhatsApp
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">mail</span>
                {EMAIL}
              </a>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-sm mt-1">location_on</span>
                <span>Vancouver, BC<br />Lower Mainland</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase font-quantum">
              © {currentYear} PLUSPRO SERVICES. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[10px] text-slate-500 mt-1">Fully developed by Saka</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Licensed · Bonded · Insured
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
