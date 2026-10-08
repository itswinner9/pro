import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | PlusPro Services",
  description: "Privacy policy for PlusPro Services. How we collect, use, and protect your information when you use our home maintenance, plumbing, and handyman services in Lower Mainland BC.",
  robots: "index, follow",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-off-white)] pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[var(--primary-color)] hover:underline text-sm font-semibold mb-8 inline-block">
          ← Back to Home
        </Link>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-6 uppercase tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-600 mb-12">Last updated: {new Date().toLocaleDateString("en-CA")}</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
          <section>
            <h2 className="font-heading text-xl font-bold text-slate-900 mt-8 mb-4">Information We Collect</h2>
            <p>
              PlusPro Services (&quot;we&quot;, &quot;us&quot;) may collect information you provide when requesting a quote, booking a service, or contacting us—including your name, phone number, email address, property address, and details about your repair or plumbing needs.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold text-slate-900 mt-8 mb-4">How We Use Your Information</h2>
            <p>
              We use your information to provide handyman, plumbing, drain cleaning, and repair services in the Lower Mainland (Vancouver, Surrey, Burnaby, and surrounding areas), to send estimates and confirmations, and to improve our services. We do not sell your personal information to third parties.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold text-slate-900 mt-8 mb-4">Contact Us</h2>
            <p>
              For questions about this privacy policy or your data, please contact us at{" "}
              <Link href="/contact" className="text-[var(--primary-color)] hover:underline">our contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
