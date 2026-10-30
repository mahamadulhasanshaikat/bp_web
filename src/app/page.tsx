import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LiveStats } from '@/components/sections/LiveStats';
import { Architecture } from '@/components/sections/Architecture';
import { Vision } from '@/components/sections/Vision';
import HeroSection from '@/components/sections/HeroSection';

export const metadata: Metadata = {
  title: 'Blood Point | Instant Voluntary Blood Donation Platform',
  description:
    'Save lives in seconds. Real-time emergency blood requests and voluntary donor matching across Bangladesh. Download on Google Play Store.',
  openGraph: {
    title: 'Blood Point Platform',
    description: 'Instant voluntary blood donation network in Bangladesh.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FDFDFE] text-slate-900 selection:bg-red-500 selection:text-white">
      <Navbar />
      <HeroSection />
      <Architecture />
      <Vision />
      <Footer />
    </main>
  );
}