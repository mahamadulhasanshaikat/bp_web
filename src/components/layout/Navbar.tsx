'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Droplet, Globe, Download } from 'lucide-react';
import DownloadModal from '../sections/DownloadModal';

export function Navbar() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* ================= লোগো অংশ ================= */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-md shadow-red-600/20">
              <Droplet className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-[22px] font-black tracking-tight leading-none">
                <span className="text-slate-900">BLOOD</span>
                <span className="text-red-600">POINT</span>
              </div>
              <span className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1.5 leading-none">
                Give Blood - Save Life
              </span>
            </div>
          </Link>

          {/* ================= মাঝের নেভিগেশন লিংক ================= */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-bold text-slate-600">
            <Link href="#architecture" className="hover:text-red-600 transition-colors">Architecture</Link>
            <Link href="#vision" className="hover:text-red-600 transition-colors">Vision</Link>
          </nav>

          {/* ================= ডানপাশের বাটনসমূহ ================= */}
          <div className="flex items-center gap-4">
            
            {/* ভাষা সিলেক্টর */}
            <button 
              type="button" 
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-full hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>English</span>
            </button>

            {/* Download APK বাটন */}
            <button
              type="button"
              onClick={() => setIsDownloadOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-red-600/25 active:translate-y-0 cursor-pointer"
            >
              <Download className="w-4 h-4 text-white/90" />
              <span>Download APK (Beta)</span>
            </button>
            
          </div>

        </div>
      </header>

      {/* টেস্টিং পপ-আপ মডাল (header এর বাইরে রাখা হয়েছে যাতে পুরো স্ক্রিনের মাঝখানে আসে) */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </>
  );
}

export default Navbar;