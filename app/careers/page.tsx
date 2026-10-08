"use client";

import Link from "next/link";
import { CAREERS_EMAIL } from "@/lib/utils";

export default function CareersPage() {
  const subject = "Handyman Job Application - PlusPro";
  const body =
    "Hi PlusPro team,\n\n" +
    "My name is ____.\n" +
    "I have ____ years of handyman/trades experience.\n" +
    "I have basic tools and can travel across the Lower Mainland.\n\n" +
    "A few things I specialize in:\n" +
    "- ____\n" +
    "- ____\n\n" +
    "Phone: ____\n\n" +
    "Thanks,\n" +
    "____\n";

  const mailtoHref = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <div className="min-h-screen bg-[var(--bg-off-white)] pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-accent-gold/20 rounded-full text-[10px] font-bold tracking-widest text-slate-700 mb-6">
            Join Our Team
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-6 uppercase tracking-tight">
            Careers at PlusPro
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We’re hiring handymen with 5+ years experience. Must have basic tools and
            can travel across the Lower Mainland. Send your resume to services@pluspro.ca
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[24px] shadow-sm border border-slate-100">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6 uppercase tracking-tight">
                Handyman – Lower Mainland BC
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                PlusPro Services provides professional home repair, plumbing, drain
                cleaning, and handyman services across Vancouver, Surrey, Burnaby,
                Richmond, and the Lower Mainland. We’re expanding our team and
                looking for reliable pros who can handle a variety of home repairs.
              </p>

              <h3 className="font-heading text-lg font-bold text-slate-900 mb-3 uppercase tracking-tight">
                Requirements
              </h3>
              <ul className="space-y-2 text-slate-600 mb-6">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[var(--primary-color)] text-[20px] mt-0.5 flex-shrink-0">
                    check_circle
                  </span>
                  At least 5 years of handyman or trades experience
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[var(--primary-color)] text-[20px] mt-0.5 flex-shrink-0">
                    check_circle
                  </span>
                  Basic tools (drill, saw, hand tools)
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[var(--primary-color)] text-[20px] mt-0.5 flex-shrink-0">
                    check_circle
                  </span>
                  Reliable vehicle for getting to job sites
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[var(--primary-color)] text-[20px] mt-0.5 flex-shrink-0">
                    check_circle
                  </span>
                  Licensed/insured preferred
                </li>
              </ul>

              <h3 className="font-heading text-lg font-bold text-slate-900 mb-3 uppercase tracking-tight">
                What We Offer
              </h3>
              <p className="text-slate-600 mb-0">
                Competitive pay, steady work across the Lower Mainland, and a
                professional team environment. We value reliability, quality, and
                customer service.
              </p>
            </div>
          </div>

          <div>
            <div className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100 sticky top-28">
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-4 uppercase tracking-tight">
                Apply by Email
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Send your resume to services@pluspro.ca. Include a short note about
                your experience and that you have basic tools.
              </p>

              <a
                href={mailtoHref}
                className="inline-flex items-center justify-center w-full bg-[var(--primary-color)] text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-all"
              >
                Send Resume to {CAREERS_EMAIL}
              </a>

              <div className="mt-5 space-y-2 text-slate-600 text-sm">
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[var(--primary-color)]">check_circle</span>
                  5+ years handyman/trades experience
                </p>
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[var(--primary-color)]">build</span>
                  Basic tools (drill, saw, hand tools)
                </p>
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[var(--primary-color)]">description</span>
                  Resume (PDF/DOC)
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href="/"
                  className="text-[var(--primary-color)] font-semibold hover:underline text-sm"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
