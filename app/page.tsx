import Link from "next/link";
import { SERVICES, LOCATIONS } from "@/lib/types";
import { PHONE_NUMBER } from "@/lib/utils";
import RotatingCityText from "@/components/RotatingCityText";

const serviceIcons: Record<string, string> = {
  'drain-cleaning': 'water_damage',
  'plumbing-repairs': 'plumbing',
  'bathroom-repairs': 'bathtub',
  'tile-installation': 'grid_view',
  'handyman-services': 'construction',
  'emergency-repairs': 'emergency_home',
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 px-6 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-1/2 -z-10"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="font-quantum text-[10px] tracking-[0.5em] text-[var(--accent-gold)] mb-8 block font-bold">
            The Gold Standard in Repair
          </span>
          <h1 className="font-quantum text-4xl md:text-7xl font-bold leading-[1.2] text-slate-900 mb-8">
            Professional <br className="hidden md:block" /> Home Repair in <br className="hidden md:block" />
            <span className="text-[var(--primary-color)]">
              <RotatingCityText />
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 font-medium mb-12 leading-relaxed">
            Fast, reliable, and affordable service for your home. Experience premium craftsmanship tailored to your local needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/book-service"
              className="bg-[var(--primary-color)] text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-[0.2em] w-full sm:w-auto hover:shadow-2xl hover:scale-105 transition-all"
            >
              Get Free Quote
            </Link>
            <a
              href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
              className="border border-slate-200 bg-white text-slate-900 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-[0.2em] w-full sm:w-auto hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">call</span>
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 bg-[var(--bg-off-white)]" id="services">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-quantum text-3xl md:text-4xl font-bold mb-6 text-[var(--primary-color)]">
              Our Services
            </h2>
            <div className="w-20 h-1 bg-[var(--accent-gold)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => {
              const isEmergency = service.id === 'emergency-repairs';
              return (
                <div
                  key={service.id}
                  className={`luxury-card bg-white p-10 rounded-[24px] flex flex-col items-start shadow-sm border ${
                    isEmergency
                      ? 'border-[var(--accent-gold)]/30'
                      : 'border-slate-100'
                  }`}
                >
                  <div
                    className={`mb-8 w-16 h-16 ${
                      isEmergency ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-[var(--primary-color)]'
                    } rounded-2xl flex items-center justify-center`}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {serviceIcons[service.id] || 'build'}
                    </span>
                  </div>
                  <h3 className="font-quantum text-lg font-bold mb-4">{service.title}</h3>
                  <p className="text-slate-500 font-normal text-sm mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={service.slug}
                    className={`mt-auto ${
                      isEmergency ? 'text-red-600' : 'text-[var(--primary-color)]'
                    } text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 hover:gap-4 transition-all`}
                  >
                    {isEmergency ? 'Call Immediately' : 'Learn More'}{' '}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p className="font-quantum text-[10px] tracking-[0.4em] text-[var(--accent-gold)] mb-4">
              The Process
            </p>
            <h2 className="font-quantum text-3xl md:text-4xl font-bold text-[var(--primary-color)]">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {[
              {
                icon: 'category',
                title: '1. Choose Service',
                description: 'Select from our premium range of repair solutions.',
              },
              {
                icon: 'event_available',
                title: '2. Book/Quote',
                description: 'Get an instant quote or book your preferred slot.',
              },
              {
                icon: 'support_agent',
                title: '3. We Contact You',
                description: 'Our concierge confirms your project details.',
              },
              {
                icon: 'task_alt',
                title: '4. Job Done',
                description: 'Project completed to our gold-standard quality.',
                active: true,
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div
                  className={`w-20 h-20 rounded-full border-2 ${
                    step.active
                      ? 'border-[var(--primary-color)] bg-[var(--primary-color)] text-white shadow-lg'
                      : 'border-slate-100 bg-white group-hover:border-[var(--primary-color)] transition-colors'
                  } flex items-center justify-center mb-8 relative z-10`}
                >
                  <span
                    className={`material-symbols-outlined text-3xl ${
                      step.active ? '' : 'text-slate-400 group-hover:text-[var(--primary-color)]'
                    }`}
                  >
                    {step.icon}
                  </span>
                </div>
                <h4 className="font-quantum text-xs font-bold mb-4 tracking-widest">{step.title}</h4>
                <p className="text-sm text-slate-500 font-normal">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 px-6 bg-[var(--primary-color)] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 text-center">
            {[
              { icon: 'location_on', title: 'Local', desc: 'BC Expertise' },
              { icon: 'bolt', title: 'Fast Response', desc: 'Same Day Service' },
              { icon: 'payments', title: 'Fair Pricing', desc: 'Upfront Quotes' },
              { icon: 'verified', title: 'Skilled', desc: 'Certified Pros' },
              { icon: 'shield_with_heart', title: 'Insured', desc: 'Total Peace of Mind' },
            ].map((item, index) => (
              <div key={index} className="space-y-4">
                <span className="material-symbols-outlined text-4xl text-[var(--accent-gold)]">
                  {item.icon}
                </span>
                <h4 className="font-quantum text-[10px] tracking-widest font-bold">{item.title}</h4>
                <p className="text-slate-400 text-[11px] uppercase font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="py-0 px-6 bg-white" id="booking">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row shadow-2xl rounded-[3rem] overflow-hidden -mt-20 relative z-20">
          <Link
            href="/book-service"
            className="flex-1 bg-white p-12 lg:p-20 flex flex-col justify-center items-start border-r border-slate-100 hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <span className="text-[var(--accent-gold)] font-bold text-[10px] tracking-[0.3em] uppercase mb-4 font-quantum">
              Direct Booking
            </span>
            <h2 className="font-quantum text-3xl font-bold text-slate-900 mb-6">BOOK SERVICE</h2>
            <p className="text-slate-500 mb-8 max-w-sm font-normal">
              Schedule a technician immediately for your home repair needs.
            </p>
            <div className="flex items-center gap-4 text-slate-400 group-hover:text-[var(--primary-color)] transition-colors">
              <span className="material-symbols-outlined text-4xl">calendar_month</span>
              <span className="text-xs font-bold uppercase tracking-widest">Check Availability</span>
            </div>
          </Link>
          <Link
            href="/request-quote"
            className="flex-1 bg-slate-900 text-white p-12 lg:p-20 flex flex-col justify-center items-start hover:bg-slate-800 transition-colors group cursor-pointer"
          >
            <span className="text-[var(--accent-gold)] font-bold text-[10px] tracking-[0.3em] uppercase mb-4 font-quantum">
              Estimate Your Project
            </span>
            <h2 className="font-quantum text-3xl font-bold mb-6">GET FREE QUOTE</h2>
            <p className="text-slate-400 mb-8 max-w-sm font-normal">
              Receive a personalized estimate.{' '}
              <span className="text-white font-bold italic underline underline-offset-4">
                Upload photos
              </span>{' '}
              of the issue for a faster response.
            </p>
            <div className="flex items-center gap-4 text-slate-600 group-hover:text-[var(--accent-gold)] transition-colors">
              <span className="material-symbols-outlined text-4xl">add_a_photo</span>
              <span className="text-xs font-bold uppercase tracking-widest">Start Request</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-32 px-6" id="areas">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-quantum text-2xl font-bold mb-4 text-[var(--primary-color)]">
                Lower Mainland Coverage
              </h2>
              <p className="text-slate-500 font-normal">
                Strategic local hubs for rapid response times across the region.
              </p>
            </div>
            <div className="h-px bg-slate-200 flex-1 hidden md:block mx-12 mb-4"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {LOCATIONS.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="group p-6 bg-white border border-slate-100 rounded-2xl text-center hover:border-[var(--primary-color)] hover:shadow-md transition-all"
              >
                <span className="block text-[10px] font-bold tracking-widest group-hover:text-[var(--primary-color)] transition-colors font-quantum">
                  {location.name.toUpperCase()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-quantum text-4xl md:text-5xl font-bold mb-12 text-[var(--primary-color)]">
            Need help today?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/book-service"
              className="bg-[var(--primary-color)] text-white px-12 py-5 rounded-full text-sm font-bold uppercase tracking-[0.2em] w-full sm:w-auto hover:shadow-2xl transition-all"
            >
              Get Free Quote
            </Link>
            <a
              href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
              className="bg-white border border-slate-200 text-slate-900 px-12 py-5 rounded-full text-sm font-bold uppercase tracking-[0.2em] w-full sm:w-auto hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">call</span>
              Call {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
