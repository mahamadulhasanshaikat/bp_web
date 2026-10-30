import { Globe, Mail, Code2, Award, HeartHandshake, Eye, ExternalLink } from 'lucide-react';

export function Vision() {
  return (
    <section id="vision" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-950 text-white rounded-[36px] p-8 sm:p-14 shadow-2xl relative overflow-hidden border border-slate-800">
        
        {/* ব্যাকগ্রাউন্ড অ্যারোমা গ্লো */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* বাম পাশ: মিশন ও রূপকল্প */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-bold text-red-400 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              Our Commitment • আমাদের প্রতিশ্রুতি
            </div>

            {/* মিশন */}
            <div className="bg-white/3 p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-red-400 shrink-0" />
                <h3 className="text-base font-bold text-red-400">Our Mission • আমাদের লক্ষ্য</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                To bridge the communication gap between voluntary blood donors and emergency patients in seconds through intelligent geolocation, zero data commercialization, and verified donor tracking.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pt-1 border-t border-white/5 font-medium">
                জরুরি রক্তের প্রয়োজনে রোগী ও রক্তদাতার মধ্যকার যোগাযোগের দূরত্ব দূর করা। সম্পূর্ণ বিনামূল্যে ও নিরাপদ প্রযুক্তির মাধ্যমে সঠিক সময়ে সঠিক রক্তদাতাকে খুঁজে দেওয়াই আমাদের মূল লক্ষ্য।
              </p>
            </div>

            {/* ভিশন */}
            <div className="bg-white/3 p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-red-400 shrink-0" />
                <h3 className="text-base font-bold text-red-400">Our Vision • আমাদের রূপকল্প</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                A nationwide healthcare future where no human life is lost due to the lack or delay of emergency blood supply across 64 districts in Bangladesh.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pt-1 border-t border-white/5 font-medium">
                বাংলাদেশের ৬৪টি জেলার কোনো হাসপাতালেই যেন রক্তের অভাবে বা খুঁজতে গিয়ে দেরির কারণে একটি মূল্যবান প্রাণও ঝরে না যায়—এমন একটি সচেতন ও মানবিক বাংলাদেশ গড়ে তোলা।
              </p>
            </div>
          </div>

          {/* ডান পাশ: চ্যানেল ও মেটা কার্ড (সম্পূর্ণ ইংরেজি ও ক্লিকেবল লিংক) */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Channels & Meta</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Official Information & Contact</p>
            </div>

            <div className="space-y-3.5">
              {/* অফিশিয়াল পোর্টাল লিংক */}
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <Code2 className="w-4 h-4 text-red-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Official Portal</span>
                  <a
                    href="https://bloodpoint.pages.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-red-400 underline decoration-white/30 hover:decoration-red-400 transition-all inline-flex items-center gap-1.5"
                  >
                    <span>Blood Point</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* ইমেইল সাপোর্ট লিংক */}
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Email Support</span>
                  <a
                    href="mailto:mhstechlab@gmail.com"
                    className="font-semibold text-white hover:text-red-400 underline decoration-white/30 hover:decoration-red-400 transition-all inline-flex items-center gap-1.5"
                  >
                    <span>contact@mhstechlab.com</span>
                  </a>
                </div>
              </div>

              {/* MHS Tech Labs লিংক */}
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <Code2 className="w-4 h-4 text-red-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px]">Engineered & Maintained By</span>
                  <a
                    href="https://mhstechlab.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-red-400 underline decoration-white/30 hover:decoration-red-400 transition-all inline-flex items-center gap-1.5"
                  >
                    <span>MHS Tech Lab</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>Version 1.0.5 (Production)</span>
              <span className="text-emerald-400 font-semibold">• 100% Non-Profit</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Vision;