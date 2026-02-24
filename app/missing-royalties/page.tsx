"use client";

import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Page() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <>
      <Head>
        <title>TrapRoyalties Pro – Find Missing Royalties</title>
        <meta name="description" content="Find missing royalties across PROs like ASCAP, BMI, SOCAN, PRS and more." />
      </Head>

      <div className="min-h-screen gradient-bg">
        <Header />

        {/* NAVBAR */}
        <nav className="fixed w-full z-50 bg-black/70 backdrop-blur-md border-b border-purple-900/30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center space-x-3">
              <div className="text-3xl font-bold neon-purple">TrapRoyalties Pro</div>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-300 hover:text-purple-400 transition">Home</a>
              <a href="/free-audit" className="text-gray-300 hover:text-purple-400 transition">Free Audit</a>
              <a href="/split-verification" className="text-gray-300 hover:text-purple-400 transition">Split Verification</a>
              <a href="/find-missing" className="text-purple-400 font-medium">Find Missing Royalties</a>
              <a href="/accelerator" className="text-gray-300 hover:text-purple-400 transition">Accelerator</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a href="/signin" className="text-gray-300 hover:text-purple-400 transition">Sign In</a>
              <a href="/free-audit" className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-full font-semibold text-white transition">Start Free</a>
            </div>

            <button className="md:hidden p-2 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold neon-cyan mb-4">Find Missing Royalties</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
              Hunt down unclaimed bags from streams, syncs, performances & playlists. Scan major PROs (ASCAP, BMI, SOCAN, PRS) for gaps — especially in hip hop collabs, features, & R&B hooks.
            </p>
            <p className="mt-4 text-lg text-purple-300 font-medium">
              Free basic search • Real-time estimates • Upgrade for full recovery & on-chain proof
            </p>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-900/50 p-8 md:p-12">

            {/* SEARCH TYPE TOGGLE */}
            <div className="flex space-x-4 mb-10">
              <button className="flex-1 py-5 rounded-2xl font-semibold flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/40 transition transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
                <span>Search by Artist / Group</span>
              </button>

              <button className="flex-1 py-5 rounded-2xl font-semibold flex items-center justify-center space-x-3 bg-gray-800 text-gray-300 hover:bg-gray-700 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Search by Writer / Producer</span>
              </button>
            </div>

            {/* SEARCH INPUT */}
            <div className="relative mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="#a855f7" strokeWidth="2" className="absolute left-5 top-1/2 transform -translate-y-1/2 h-8 w-8">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>

              <input
                type="text"
                placeholder="Enter name (e.g., Future, Metro Boomin, SZA, The Weeknd)"
                className="w-full pl-16 pr-6 py-6 text-xl bg-gray-800 border-2 border-purple-900/50 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-600 text-white placeholder-gray-400"
              />
            </div>

            {/* SEARCH BUTTON */}
            <button className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-2xl hover:from-purple-500 hover:to-pink-500 shadow-2xl shadow-purple-900/50 transition transform hover:scale-105 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" className="mr-4">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Search for Missing Royalties
            </button>

            <p className="text-center mt-6 text-gray-400 text-lg">
              Free basic search (limited results) • Full catalog scan + detailed recovery in{" "}
              <a href="/free-audit" className="text-purple-400 hover:text-purple-300 underline">Free Audit</a>
            </p>
          </div>

          {/* FEATURES */}
          <div className="mt-20 grid md:grid-cols-3 gap-10">
            <div className="text-center bg-gray-900/40 rounded-2xl p-8 border border-purple-800/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="#a855f7" strokeWidth="2" className="mx-auto mb-6">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
              </svg>
              <h3 className="text-2xl font-bold neon-purple mb-4">Global PRO Coverage</h3>
              <p className="text-gray-300">Scans ASCAP, BMI, SOCAN, PRS & more — find unclaimed from viral TikToks to radio spins.</p>
            </div>

            <div className="text-center bg-gray-900/40 rounded-2xl p-8 border border-purple-800/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="#06b6d4" strokeWidth="2" className="mx-auto mb-6">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              <h3 className="text-2xl font-bold neon-cyan mb-4">Real-Time Estimates</h3>
              <p className="text-gray-300">Instant insights on potential missing earnings — see where your streams/synchs fell through cracks.</p>
            </div>

            <div className="text-center bg-gray-900/40 rounded-2xl p-8 border border-purple-800/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="#a855f7" strokeWidth="2" className="mx-auto mb-6">
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <h3 className="text-2xl font-bold neon-purple mb-4">Claim Your Bag</h3>
              <p className="text-gray-300">Link to recovery tools — upgrade for crypto-verified claims & payment simulation.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-4xl font-bold neon-cyan mb-6">Ready to Recover What's Yours?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Basic search shows gaps — full power (unlimited, monitoring, on-chain proof) in Royalty Accelerator.
            </p>
            <a
              href="/accelerator"
              className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-6 px-12 rounded-full text-2xl shadow-2xl shadow-pink-900/50 transition transform hover:scale-105"
            >
              Join Accelerator – Limited Spots
            </a>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="py-12 bg-black border-t border-purple-900/30 text-center text-gray-500">
          <p>© 2026 TrapRoyalties Pro. Built for the culture. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <a href="#" className="hover:text-purple-400">Privacy</a>
            <a href="#" className="hover:text-purple-400">Terms</a>
            <a href="#" className="hover:text-purple-400">Contact</a>
          </div>
        </footer>

        <Footer />
      </div>
    </>
  );
}
