"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);

  // Handler for Start Free Audit button
  const handleStartAudit = () => {
    setIsLoading(true);
    // Navigate to audit page
    window.location.href = '/free-audit';
  };

  // Handler for Join Accelerator button
  const handleJoinAccelerator = () => {
    setIsLoading(true);
    // Navigate to founding member page
    window.location.href = '/founding-member';
  };

  // Handler for Apply Now button
  const handleApplyNow = () => {
    setIsLoading(true);
    window.location.href = '/founding-member';
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      <main>
        {/* Hero Section */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#a855f7_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#06b6d4_0%,transparent_50%)]"></div>
          </div>
          
          <div className="container mx-auto px-6 py-24 md:py-32 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-cyan">
              Get Your Bag<br/>From Every Stream,<br/>Sync, & Performance
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Stop leaving money on the table. TrapRoyalties Pro scans PROs, verifies splits with crypto proofs, and recovers your royalties — built for hip hop & R&B creators who hustle.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button 
                onClick={handleStartAudit}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-5 px-10 rounded-full text-xl shadow-lg shadow-purple-900/50 transition transform hover:scale-105 disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Start Free Catalog Audit'}
              </button>
              <button 
                onClick={handleJoinAccelerator}
                disabled={isLoading}
                className="border-2 border-purple-500 text-purple-400 hover:bg-purple-900/30 font-bold py-5 px-10 rounded-full text-xl transition disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Join Royalty Accelerator (50 Spots Left)'}
              </button>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section id="features" className="py-24 container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16 neon-purple">Why TrapRoyalties Pro?</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-purple-900/50 hover:border-purple-500 transition">
              <h3 className="text-2xl font-bold mb-4 neon-cyan">PRO Scanner + Gap Finder</h3>
              <p className="text-gray-300">Continuous monitoring of ASCAP, BMI, SOCAN, PRS. Find unclaimed tracks from viral TikToks, playlists, sync deals — get paid what's yours.</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-purple-900/50 hover:border-purple-500 transition">
              <h3 className="text-2xl font-bold mb-4 neon-cyan">Crypto-Verified Splits</h3>
              <p className="text-gray-300">Enforce 100% accurate splits with blockchain proofs (Monad-powered). No more "he said/she said" on features, producers, or writers.</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-purple-900/50 hover:border-purple-500 transition">
              <h3 className="text-2xl font-bold mb-4 neon-cyan">Payment Simulator</h3>
              <p className="text-gray-300">Test royalty distributions before real money moves. See exactly how streams, syncs, and performances break down — fix issues early.</p>
            </div>
          </div>
        </section>

        {/* Demo Splits Section */}
        <section className="py-20 bg-black/60">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 neon-purple">Real Split Verification Examples</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/20 p-6 rounded-xl border border-purple-700/50">
                <h3 className="text-xl font-bold mb-2">DRIP TOO HARD</h3>
                <p className="text-sm text-gray-400 mb-4">ISRC: US-XYZ-25-01234</p>
                <div className="text-3xl font-bold text-green-400">100% ✅ Verified</div>
                <p className="text-sm mt-2">All splits locked — producer, feature, writers confirmed.</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/20 p-6 rounded-xl border border-purple-700/50">
                <h3 className="text-xl font-bold mb-2">STREET RUNNER</h3>
                <p className="text-sm text-gray-400 mb-4">ISRC: US-XYZ-25-05678</p>
                <div className="text-3xl font-bold text-yellow-400">78% ⚠️ Gaps Found</div>
                <p className="text-sm mt-2">$4.2K unclaimed — missing BMI reg on hook writer.</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/20 p-6 rounded-xl border border-purple-700/50">
                <h3 className="text-xl font-bold mb-2">LATE NIGHT VIBES</h3>
                <p className="text-sm text-gray-400 mb-4">ISRC: US-XYZ-25-09876</p>
                <div className="text-3xl font-bold text-red-400">112% ❌ Over-Split</div>
                <p className="text-sm mt-2">Fix before payout — duplicate feature claims detected.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Accelerator CTA Section */}
        <section id="accelerator" className="py-24 container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8 neon-cyan">Royalty Accelerator Program</h2>
          <p className="text-2xl mb-6 text-gray-200">Lifetime 50% discount + priority onboarding + free advanced audits</p>
          <p className="text-xl mb-10 text-purple-300">Limited to 50 labels & 500 artists — spots filling fast.</p>
          
          <button 
            onClick={handleApplyNow}
            disabled={isLoading}
            className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-6 px-12 rounded-full text-2xl shadow-2xl shadow-pink-900/50 transition transform hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Apply Now – Only 50 Spots Left'}
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}