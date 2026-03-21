import Logo from "@/components/Logo";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
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
              Loading
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
              Please wait...
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
