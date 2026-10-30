import Link from 'next/link';
import { Droplets, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-100 bg-white/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">

        {/* Top Brand & Links Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">

          {/* Logo & Platform Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#E52D27] to-[#B31217] rounded-xl flex items-center justify-center text-white shadow-md shadow-red-500/20">
              <Droplets className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xl font-black tracking-tight text-slate-950">
                  Blood<span className="text-red-600">Point</span>
                </span>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Non-Profit
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Connecting Voluntary Blood Donors Across Bangladesh.
              </p>
            </div>
          </div>

          {/* Version Badge & Developer Credits */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Version Badge */}
            <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Version: <strong>v1.0.5 (Production)</strong></span>
            </div>

            {/* MHS Tech Labs Outbound Link */}
            <a
              href="https://mhstechlab.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-white px-3.5 py-1 rounded-full text-xs font-bold transition shadow-sm hover:shadow group"
            >
              <span>Built by <strong>MHS Tech Lab</strong></span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom Legal & Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>© {currentYear} MHS Tech Labs. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-0.5 animate-pulse" />
            <span>to save human lives.</span>
          </p>

          <div className="flex items-center gap-6 font-semibold">
            <Link
              href="/privacy-policy"
              className="hover:text-red-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/terms"
              className="hover:text-red-600 transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-slate-300">•</span>
            <a
              href="mailto:contact@bloodpoint.org"
              className="hover:text-red-600 transition-colors"
            >
              Security Desk
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}