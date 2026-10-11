import React from 'react';
import { Navbar } from '@/components/marketing/Navbar';
import { Hero } from '@/components/marketing/Hero';
import { FeatureCards } from '@/components/marketing/FeatureCards';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { FriendSection } from '@/components/marketing/FriendSection';
import { ClosingCta } from '@/components/marketing/ClosingCta';
import { Footer } from '@/components/marketing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0914] text-[#f5f3f9] selection:bg-purple-500/30 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureCards />
        <HowItWorks />
        <FriendSection />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
