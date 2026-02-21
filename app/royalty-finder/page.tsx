"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface SearchResult {
  id: string;
  name: string;
  role: string;
  matchCount: number;
  confidence: 'high' | 'medium' | 'low';
}

interface TrackResult {
  id: string;
  title: string;
  artist: string;
  isrc?: string;
  estimatedAmount: number;
  confidence: 'high' | 'medium' | 'low';
  source: string;
  platform?: string;
}

export default function RoyaltyFinderPage() {
  const [searchType, setSearchType] = useState<'artist' | 'writer'>('artist');
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [trackResults, setTrackResults] = useState<TrackResult[]>([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    setSearchResults([]);
    
    // Simulate API call
    setTimeout(() => {
      // Mock results based on search query
      const mockResults: SearchResult[] = [];
      
      if (searchQuery.toLowerCase().includes('metro') || searchQuery.toLowerCase().includes('boomin')) {
        mockResults.push({
          id: 'metro-1',
          name: 'Metro Boomin',
          role: 'Producer',
          matchCount: 847,
          confidence: 'high'
        });
      }
      
      if (searchQuery.toLowerCase().includes('future')) {
        mockResults.push({
          id: 'future-1',
          name: 'Future',
          role: 'Artist',
          matchCount: 1234,
          confidence: 'high'
        });
      }
      
      if (searchQuery.toLowerCase().includes('sza')) {
        mockResults.push({
          id: 'sza-1',
          name: 'SZA',
          role: 'Artist',
          matchCount: 892,
          confidence: 'high'
        });
      }
      
      if (searchQuery.toLowerCase().includes('weeknd')) {
        mockResults.push({
          id: 'weeknd-1',
          name: 'The Weeknd',
          role: 'Artist',
          matchCount: 2103,
          confidence: 'high'
        });
      }
      
      // If no specific matches, show generic
      if (mockResults.length === 0) {
        mockResults.push({
          id: 'generic-1',
          name: searchQuery,
          role: searchType === 'artist' ? 'Artist' : 'Writer',
          matchCount: 0,
          confidence: 'low'
        });
      }
      
      setSearchResults(mockResults);
      setSearching(false);
    }, 1500);
  };

  const handleSelectResult = (result: SearchResult) => {
    setSelectedResult(result);
    setSearching(true);
    
    // Simulate fetching track results
    setTimeout(() => {
      const mockTracks: TrackResult[] = [
        {
          id: 'track-1',
          title: 'DRIP TOO HARD',
          artist: result.name,
          isrc: 'US-XYZ-25-00123',
          estimatedAmount: 3450,
          confidence: 'high',
          source: 'ASCAP',
          platform: 'Streaming'
        },
        {
          id: 'track-2',
          title: 'STREET RUNNER',
          artist: result.name,
          isrc: 'US-XYZ-25-00124',
          estimatedAmount: 2800,
          confidence: 'medium',
          source: 'BMI',
          platform: 'Sync Licensing'
        },
        {
          id: 'track-3',
          title: 'LATE NIGHT VIBES',
          artist: result.name,
          isrc: 'US-XYZ-25-00125',
          estimatedAmount: 4200,
          confidence: 'high',
          source: 'SOCAN',
          platform: 'Performance Royalties'
        },
        {
          id: 'track-4',
          title: 'MIDNIGHT DRIVE',
          artist: result.name,
          estimatedAmount: 1900,
          confidence: 'low',
          source: 'PRS',
          platform: 'Mechanical'
        }
      ];
      
      setTrackResults(mockTracks);
      setSearching(false);
      setShowEmailModal(true);
    }, 2000);
  };

  const handleEmailSubmit = async () => {
    if (!email.includes('@')) return;
    
    setEmailSent(true);
    setTimeout(() => {
      setShowEmailModal(false);
      setEmailSent(false);
      setEmail('');
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalEstimated = trackResults.reduce((sum, track) => sum + track.estimatedAmount, 0);

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold neon-cyan mb-4">Find Missing Royalties</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
            Hunt down unclaimed bags from streams, syncs, performances & playlists. Scan major PROs (ASCAP, BMI, SOCAN, PRS) for gaps — especially in hip hop collabs, features, & R&B hooks.
          </p>
          <p className="mt-4 text-lg text-purple-300 font-medium">Free basic search • Real-time estimates • Upgrade for full recovery & on-chain proof</p>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-900/50 p-8 md:p-12">
          {/* Search Type Toggle */}
          <div className="flex space-x-4 mb-10">
            <button 
              onClick={() => setSearchType('artist')}
              className={`flex-1 py-5 rounded-2xl font-semibold flex items-center justify-center space-x-3 transition-all ${
                searchType === 'artist' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/40 transform hover:scale-105' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
              </svg>
              <span>Search by Artist / Group</span>
            </button>
            <button 
              onClick={() => setSearchType('writer')}
              className={`flex-1 py-5 rounded-2xl font-semibold flex items-center justify-center space-x-3 transition-all ${
                searchType === 'writer' 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/40 transform hover:scale-105' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Search by Writer / Producer</span>
            </button>
          </div>

          {/* Search Form */}
          <div className="relative mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-5 top-1/2 transform -translate-y-1/2 h-8 w-8 text-purple-400">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={`Enter ${searchType} name (e.g., Future, Metro Boomin, SZA, The Weeknd)`} 
              className="w-full pl-16 pr-6 py-6 text-xl bg-gray-800 border-2 border-purple-900/50 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-600 text-white placeholder-gray-400"
              disabled={searching}
            />
          </div>

          <button 
            onClick={handleSearch}
            disabled={!searchQuery.trim() || searching}
            className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-2xl hover:from-purple-500 hover:to-pink-500 shadow-2xl shadow-purple-900/50 transition transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-4">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            {searching ? 'Searching...' : 'Search for Missing Royalties'}
          </button>

          {/* Search Results */}
          {searchResults.length > 0 && !selectedResult && (
            <div className="mt-8 space-y-4">
              <h3 className="text-2xl font-bold neon-purple mb-4">Select a Match</h3>
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelectResult(result)}
                  className="w-full p-6 bg-gray-800/50 hover:bg-gray-800 rounded-2xl border border-purple-900/50 flex items-center justify-between transition group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-purple-900/50 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-purple-300">
                        {result.name.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <h4 className="text-xl font-bold text-white">{result.name}</h4>
                      <p className="text-purple-300">{result.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      result.confidence === 'high' ? 'bg-green-600/30 text-green-400' :
                      result.confidence === 'medium' ? 'bg-yellow-600/30 text-yellow-400' :
                      'bg-gray-600/30 text-gray-400'
                    }`}>
                      {result.confidence.toUpperCase()} CONFIDENCE
                    </span>
                    {result.matchCount > 0 && (
                      <p className="text-gray-400 mt-2">{result.matchCount} potential matches</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Loading State */}
          {searching && searchResults.length === 0 && (
            <div className="mt-8 text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mx-auto mb-6"></div>
              <p className="text-xl text-purple-300">Scanning PRO databases...</p>
              <p className="text-gray-400 mt-2">Checking ASCAP, BMI, SOCAN, PRS</p>
            </div>
          )}

          <p className="text-center mt-6 text-gray-400 text-lg">
            Free basic search (limited results) • Full catalog scan + detailed recovery in{' '}
            <Link href="/free-audit" className="text-purple-400 hover:text-purple-300 underline">
              Free Audit
            </Link>
          </p>
        </div>

        {/* Features / Benefits */}
        <div className="mt-20 grid md:grid-cols-3 gap-10">
          <div className="text-center bg-gray-900/40 rounded-2xl p-8 border border-purple-800/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-6">
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/>
            </svg>
            <h3 className="text-2xl font-bold neon-purple mb-4">Global PRO Coverage</h3>
            <p className="text-gray-300">Scans ASCAP, BMI, SOCAN, PRS & more — find unclaimed from viral TikToks to radio spins.</p>
          </div>
          <div className="text-center bg-gray-900/40 rounded-2xl p-8 border border-purple-800/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-6">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
            </svg>
            <h3 className="text-2xl font-bold neon-cyan mb-4">Real-Time Estimates</h3>
            <p className="text-gray-300">Instant insights on potential missing earnings — see where your streams/synchs fell through cracks.</p>
          </div>
          <div className="text-center bg-gray-900/40 rounded-2xl p-8 border border-purple-800/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-6">
              <line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <h3 className="text-2xl font-bold neon-purple mb-4">Claim Your Bag</h3>
            <p className="text-gray-300">Link to recovery tools — upgrade for crypto-verified claims & payment simulation.</p>
          </div>
        </div>

        {/* Upsell CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold neon-cyan mb-6">Ready to Recover What's Yours?</h2>
          <p className="text-xl text-gray-300 mb-8">Basic search shows gaps — full power (unlimited, monitoring, on-chain proof) in Royalty Accelerator.</p>
          <Link 
            href="/founding-member" 
            className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-6 px-12 rounded-full text-2xl shadow-2xl shadow-pink-900/50 transition transform hover:scale-105"
          >
            Join Accelerator – Limited Spots
          </Link>
        </div>
      </main>

      {/* Email Capture Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-3xl border-2 border-purple-500 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {!emailSent ? (
              <>
                <h3 className="text-3xl font-bold neon-cyan mb-4">
                  We Found <span className="text-green-400">{formatCurrency(totalEstimated)}</span> in Potential Royalties!
                </h3>
                
                {/* Results Preview */}
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                  {trackResults.map((track, index) => (
                    <div key={index} className="bg-gray-800/50 p-4 rounded-xl border border-purple-800/30">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-xl font-bold text-white">{track.title}</h4>
                          <p className="text-purple-300">{track.artist}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          track.confidence === 'high' ? 'bg-green-600/30 text-green-400' :
                          track.confidence === 'medium' ? 'bg-yellow-600/30 text-yellow-400' :
                          'bg-gray-600/30 text-gray-400'
                        }`}>
                          {track.confidence.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                        <div>
                          <p className="text-gray-400">Source</p>
                          <p className="text-white">{track.source}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Platform</p>
                          <p className="text-white">{track.platform}</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-green-400 mt-3 text-right">
                        {formatCurrency(track.estimatedAmount)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Email Input */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to see full results"
                  className="w-full px-6 py-4 mb-4 bg-gray-800 border-2 border-purple-900/50 rounded-2xl focus:outline-none focus:border-purple-500 text-white text-lg"
                />

                <button
                  onClick={handleEmailSubmit}
                  disabled={!email.includes('@')}
                  className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-xl hover:from-purple-500 hover:to-pink-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send My Results
                </button>

                <p className="text-center text-gray-400 mt-4">
                  We'll never spam you. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-600/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="text-green-400" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-green-400 mb-4">Check Your Inbox!</h3>
                <p className="text-xl text-gray-300">We've sent your royalty report to</p>
                <p className="text-xl text-purple-400 font-bold mt-2">{email}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}