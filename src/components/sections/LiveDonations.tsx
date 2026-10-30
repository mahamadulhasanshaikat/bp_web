'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Heart,
  ShieldCheck,
  Server,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Copy,
  Check,
  X
} from 'lucide-react';

interface Backer {
  id: string;
  name: string;
  amount: number;
  message: string;
  created_at: string;
  channel: 'bKash' | 'Nagad';
}

export function LiveDonationFeed() {
  const [backers, setBackers] = useState<Backer[]>([]);
  const [totalFund, setTotalFund] = useState(0);
  const goalFund = 15000;

  // ফর্মের স্টেট
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState<number | string>(500);
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState<'bKash' | 'Nagad'>('bKash');
  const [trxId, setTrxId] = useState('');

  // মডাল ও প্রসেসিং স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);

  const presetAmounts = [100, 300, 500, 1000, 2000];
  const progressPercent = Math.min(100, Math.round((totalFund / goalFund) * 100));

  // 1. Supabase থেকে ডেটা ফেচ ও রিয়েলটাইম লিসেনার
  useEffect(() => {
    fetchApprovedDonations();

    // Supabase Realtime Listener (community_supporters টেবিল)
    const channelListener = supabase
      .channel('realtime:community_supporters')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'community_supporters' },
        () => {
          fetchApprovedDonations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelListener);
    };
  }, []);

  const fetchApprovedDonations = async () => {
    const { data, error } = await supabase
      .from('community_supporters')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const supporters = data as unknown as Backer[];
      setBackers(supporters);
      
      // reduce টাইপ এরর ফিক্স করা হয়েছে
      const sum = supporters.reduce((acc: number, curr: any) => acc + Number(curr.amount || 0), 0);
      setTotalFund(sum);
    }
  };

  const copyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  // 2. মডাল ওপেন
  const handleOpenPaymentModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!Number(amount) || Number(amount) <= 0) return;
    setIsModalOpen(true);
  };

  // 3. TrxID সাবমিট করে Supabase-এ 'pending' হিসেবে জমা দেওয়া
  const handleConfirmTrx = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId.trim()) return;

    setIsSubmitting(true);
    
    // ts(2322) ইনসার্ট অবজেক্ট টাইপ এরর ফিক্স করা হয়েছে
    const { error } = await (supabase.from('community_supporters') as any).insert([
      {
        name: donorName.trim() ? donorName : 'Anonymous Supporter',
        amount: Number(amount),
        message: message.trim() ? message : 'Supported Blood Point network',
        channel: channel,
        trx_id: trxId.trim(),
        status: 'pending'
      }
    ]);

    setIsSubmitting(false);

    if (!error) {
      setIsSubmittedSuccess(true);
      setTimeout(() => {
        setIsSubmittedSuccess(false);
        setIsModalOpen(false);
        setTrxId('');
        setDonorName('');
        setMessage('');
      }, 3500);
    } else {
      alert('ত্রুটি: TrxID টি আগে ব্যবহার করা হয়েছে অথবা ডাটাবেজে সমস্যা হয়েছে।');
    }
  };

  const accountNumber = channel === 'bKash' ? '01XXXXXXXXX' : '01XXXXXXXXX';

  return (
    <section id="supporters" className="py-20 bg-[#FDFDFE] relative overflow-hidden border-t border-slate-100">
      
      {/* ব্যাকগ্রাউন্ড অ্যাম্বিয়েন্ট গ্লো */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-rose-100/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ================= সেকশন হেডার ================= */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-rose-50/80 border border-rose-200/60 px-4 py-1.5 rounded-full text-xs font-bold text-red-700 mb-4 shadow-2xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Real-Time Community Telemetry • সরাসরি অনুদান ও স্বচ্ছতা
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            100% Non-Profit. Powered by You.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            রক্তদাতাদের তাৎক্ষণিক এসএমএস অ্যালার্ট ও সার্ভার চালু রাখতে আপনার যেকোনো অনুদান সরাসরি প্ল্যাটফর্মে যুক্ত হয়।
          </p>
        </div>

        {/* ================= মূল গ্রিড ================= */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* বাম পাশ: ডোনেশন কার্ড */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-4xl p-6 sm:p-8 shadow-xl shadow-slate-200/40 relative">
            <div className="flex items-center justify-between pb-5 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 block">Direct Contribution</span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">সরাসরি অনুদান দিন</h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-500/20">
                <Heart className="w-5 h-5 fill-white" />
              </div>
            </div>

            <form onSubmit={handleOpenPaymentModal} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Amount (টাকার পরিমাণ)
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className={`py-2 text-xs font-black rounded-xl border transition-all ${
                        amount === preset
                          ? 'bg-red-600 text-white border-red-600 shadow-xs'
                          : 'bg-[#FDFDFE] text-slate-700 border-slate-200 hover:border-red-300'
                      }`}
                    >
                      ৳{preset}
                    </button>
                  ))}
                </div>
                <div className="mt-2.5 relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">৳</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Custom Amount"
                    className="w-full bg-[#FDFDFE] border border-slate-200 rounded-xl pl-8 pr-3.5 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:border-red-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Name (নাম - ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Anonymous (খালি রাখলে বেনামী থাকবে)"
                  className="w-full bg-[#FDFDFE] border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Cheer Message (উৎসাহমূলক বার্তা)
                </label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Keep up the great work!"
                  className="w-full bg-[#FDFDFE] border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Pay Via (পেমেন্ট মেথড)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setChannel('bKash')}
                    className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                      channel === 'bKash'
                        ? 'border-pink-500 bg-pink-50/60 text-pink-700 ring-2 ring-pink-500/20'
                        : 'border-slate-200 bg-[#FDFDFE] text-slate-600 hover:border-pink-200'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-600" />
                    bKash Personal
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel('Nagad')}
                    className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                      channel === 'Nagad'
                        ? 'border-orange-500 bg-orange-50/60 text-orange-700 ring-2 ring-orange-500/20'
                        : 'border-slate-200 bg-[#FDFDFE] text-slate-600 hover:border-orange-200'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-600" />
                    Nagad Personal
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm py-3.5 rounded-2xl shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Proceed to Pay ৳{amount || 0}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Zero Service Charge • 100% Free Setup</span>
              </div>
            </form>
          </div>

          {/* ডান পাশ: সার্ভার গোল ও Supabase লাইভ ফিড */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-7 shadow-lg shadow-slate-200/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-red-600" />
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      Monthly Infrastructure Goal
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Firebase Cloud Database, Geolocation & SMS OTP Gateway Cost
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-2xl font-black text-slate-900">৳{totalFund.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 font-semibold block">Target: ৳{goalFund.toLocaleString()}</span>
                </div>
              </div>

              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                <div
                  className="h-full bg-linear-to-r from-red-600 via-rose-500 to-red-500 rounded-full transition-all duration-700 shadow-2xs"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span className="text-red-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> {progressPercent}% Funded
                </span>
                <span>{backers.length} Community Donors Verified</span>
              </div>
            </div>

            {/* লাইভ ফিড */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  Live Synced Contributions
                </h4>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Realtime Powered
                </span>
              </div>

              <div className="space-y-2.5 max-h-90 overflow-y-auto pr-1">
                {backers.length === 0 ? (
                  <div className="bg-white border border-slate-200/70 rounded-2xl p-8 text-center text-slate-400 text-xs">
                    এখনো কোনো অনুদান ভেরিফাই করা হয়নি। প্রথম ব্যাকর হিসেবে অংশ নিন!
                  </div>
                ) : (
                  backers.map((backer) => (
                    <div
                      key={backer.id}
                      className="bg-white hover:bg-slate-50/80 border border-slate-200/70 rounded-2xl p-4 flex items-center justify-between transition-all hover:border-red-300 shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center font-black text-xs text-slate-800">
                          {backer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-sm text-slate-900">{backer.name}</h5>
                            <span className="text-[10px] text-slate-400 font-medium">Verified</span>
                          </div>
                          <p className="text-xs text-slate-500 italic mt-0.5 line-clamp-1">
                            &ldquo;{backer.message}&rdquo;
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-base font-black text-red-600">৳{backer.amount}</span>
                        <span className={`block text-[9px] font-bold uppercase tracking-wider ${
                          backer.channel === 'bKash' ? 'text-pink-600' : 'text-orange-600'
                        }`}>
                          via {backer.channel}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                100% Transparency Guaranteed
              </span>
              <span>All rights reserved • Blood Point</span>
            </div>

          </div>

        </div>

      </div>

      {/* ================= পেমেন্ট ও TrxID মডাল ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 text-red-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Heart className="w-3.5 h-3.5 fill-red-600" /> Complete Donation
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Send Money via {channel}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                নিচের নম্বরে <b>৳{amount}</b> Send Money করুন এবং ফিরতি এসএমএসের TrxID বসান।
              </p>
            </div>

            {/* অ্যাকাউন্ট নম্বর বক্স */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  {channel} Personal Number
                </span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {accountNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyNumber(accountNumber)}
                className="flex items-center gap-1.5 text-xs bg-white hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 transition-all font-semibold"
              >
                {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedNumber ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {isSubmittedSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  আপনার TrxID সফলভাবে জমা হয়েছে! অ্যাডমিন ভেরিফাই করলেই সাইটে লাইভ দেখা যাবে। ধন্যবাদ!
                </span>
              </div>
            ) : (
              <form onSubmit={handleConfirmTrx} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Transaction ID (TrxID)
                  </label>
                  <input
                    type="text"
                    required
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="e.g. BL928XK92"
                    className="w-full bg-[#FDFDFE] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-mono uppercase text-slate-900 focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3 rounded-xl shadow-md shadow-red-600/20 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Verifying...' : 'Confirm Submission'}
                </button>
              </form>
            )}

            <p className="text-[11px] text-center text-slate-400">
              ভুল TrxID দিলে তা স্বয়ংক্রিয়ভাবে বাতিল হয়ে যাবে।
            </p>
          </div>
        </div>
      )}

    </section>
  );
}

export default LiveDonationFeed;