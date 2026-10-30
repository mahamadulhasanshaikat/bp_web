'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Droplet, Heart, ShieldCheck, Zap, Phone, Lock, Activity, Users, UserCheck, AreaChartIcon } from 'lucide-react';

export function HeroSection() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonors: 0,
    livesSaved: 0,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchRealtimeMetrics() {
      try {
        // ১. profiles টেবিল থেকে মোট ইউজারের আসল কাউন্ট
        const { count: profileCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // ২. profiles থেকে সক্রিয় ডোনারের আসল কাউন্ট (যাদের is_available true)
        const { count: activeDonorsCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('is_available', true);

        // ৩. profiles টেবিল থেকে Lives Saved বা মোট ডোনেশনের হিসাব (total_donations কলাম থেকে)
        const { data: profileData } = await supabase
          .from('profiles')
          .select('total_donations');

        let calculatedLivesSaved = 0;
        if (profileData && Array.isArray(profileData)) {
          calculatedLivesSaved = (profileData as Array<{ total_donations: number | null }>).reduce(
            (acc, curr) => acc + (curr.total_donations ? Number(curr.total_donations) : 0),
            0
          );
        }

        if (isMounted) {
          setStats({
            totalUsers: profileCount || 0,
            totalDonors: activeDonorsCount || 0,
            livesSaved: calculatedLivesSaved,
          });
        }
      } catch (err) {
        console.error('Failed to load database stats:', err);
      }
    }

    fetchRealtimeMetrics();

    // রিয়েل-টাইম লিসেনার (ডেটাবেসে পরিবর্তন হলে সাথে সাথে আপডেট হবে)
    const profileChannel = supabase
      .channel('hero_profiles_realtime_pure')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        () => { fetchRealtimeMetrics(); }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(profileChannel);
    };
  }, []);

  return (
    <div className="relative w-full bg-white text-slate-900 font-sans pt-20">

      {/* ================= HERO MAIN SECTION ================= */}
      <section className="relative min-h-140 lg:min-h-160 flex items-center bg-[#0b0d11] text-white overflow-hidden">

        {/* Full Width Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=2000&q=90"
            alt="Blood Donation"
            fill
            priority
            className="object-cover object-[center_15%]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0b0d11]/95 via-[#0b0d11]/60 to-[#0b0d11]/10 z-10" />
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-20 w-full">
          <div className="max-w-xl space-y-6">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500 drop-shadow-md">
              Together We Can
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white drop-shadow-lg">
              Save Lives <br />
              <span className="text-[#FF284D]">Through Blood</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-lg drop-shadow-md">
              International Blood connects blood donors with patients across the world. Be a hero. Donate blood, make a difference.
            </p>

            {/* 3 Badges */}
            <div className="flex items-center gap-6 pt-1">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-500 backdrop-blur-sm">
                  <Heart className="w-4 h-4 fill-red-500" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white leading-none drop-shadow-md">Verified</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">Donors</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-500 backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white leading-none drop-shadow-md">Safe &</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">Secure</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-500 backdrop-blur-sm">
                  <Zap className="w-4 h-4 fill-red-500" />
                </span>
                <div>
                  <p className="text-xs font-bold text-white leading-none drop-shadow-md">Fast</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">Support</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-6 pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-3 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-lg shadow-red-600/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Droplet className="w-3.5 h-3.5 text-white fill-white" />
                </span>
                <span>Every drop counts</span>
                {/* <ArrowRight className="w-4 h-4" /> */}
              </Link>

              <div className="font-serif italic leading-snug drop-shadow-md">
                <span className="text-white block font-bold text-base tracking-wide">
                  Be a donor
                </span>
                <span className="text-rose-400 text-sm font-semibold">
                  Be a hero
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Stats Card (Pure Database Real Data) */}
        <div className="hidden lg:flex absolute right-12 bottom-25 z-30 bg-white border border-slate-100 rounded-2xl py-3.5 px-5 shadow-2xl items-center divide-x divide-slate-100 text-slate-800">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-red-600">
              <Users className="w-4 h-4 fill-red-600" />
            </div>
            <div>
              <p className="text-base font-black text-slate-900 leading-none">
                {stats.totalUsers.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-500 font-semibold mt-1">Total Donors</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pl-8">
            <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-red-600">
              <UserCheck className="w-4 h-4 fill-red-600" />
            </div>
            <div>
              <p className="text-base font-black text-slate-900 leading-none">
                {stats.totalDonors.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-500 font-semibold mt-1">Active Donors</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pl-8">
            <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-red-600">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p className="text-base font-black text-slate-900 leading-none">
                {stats.livesSaved.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-500 font-semibold mt-1">Lives Saved</p>
            </div>
          </div>


          <div className="flex items-center gap-3 pl-8">
            <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-red-600">
              <AreaChartIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-base font-black text-slate-900 leading-none">
                {"64/64"}
              </p>
              <p className="text-[10px] text-slate-500 font-semibold mt-1">Districts Covered</p>
            </div>
          </div>

        </div>

        {/* Red Wave */}
        <div className="absolute -bottom-1 inset-x-0 z-20 pointer-events-none">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-16 sm:h-24 text-[#E01E37]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C360,95 560,15 920,55 C1180,85 1340,20 1440,45 L1440,100 L0,100 Z"
              fill="currentColor"
            />
          </svg>
        </div>

      </section>

      {/* ================= 4 BOTTOM CARDS ================= */}
      <div className="w-full bg-[#f8fafc] border-b border-slate-200/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

            <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl border border-slate-200/70 shadow-2xs hover:border-red-200 transition-all cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center font-bold text-base text-red-500">
                G
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">Sign in with GMail</p>
                <p className="text-[10px] text-slate-500 mt-1">Instant Access</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl border border-slate-200/70 shadow-2xs hover:border-red-200 transition-all cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-red-600">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">GMail Login</p>
                <p className="text-[10px] text-slate-500 mt-1">OTP Verification</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl border border-slate-200/70 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-red-600">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">Secure & Trusted</p>
                <p className="text-[10px] text-slate-500 mt-1">Your data is safe</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl border border-slate-200/70 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-red-600">
                <Zap className="w-4 h-4 fill-red-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">Real-time Support</p>
                <p className="text-[10px] text-slate-500 mt-1">24/7 Service</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default HeroSection;