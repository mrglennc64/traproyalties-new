"use client";

import { useState } from 'react';
import { 
  Search, 
  Music, 
  User, 
  Loader2, 
  Mail, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  TrendingUp,
  Globe,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

interface Artist {
  uuid: string;
  name: string;
  image?: string;
  followers?: number;
}

interface RoyaltyEstimate {
  trackUuid: string;
  trackName: string;
  artistName: string;
  totalStreams: number;
  estimatedRoyalty: number;
  confidence: 'high' | 'medium' | 'low';
  platforms?: Record<string, number>;
}

// Mock data for artists
const mockArtists: Record<string, Artist[]> = {
  'kendrick': [
    { uuid: 'artist-123', name: 'Kendrick Lamar', image: '', followers: 15000000 }
  ],
  'jay': [
    { uuid: 'artist-456', name: 'Jay Rock', image: '', followers: 2000000 }
  ],
  'schoolboy': [
    { uuid: 'artist-789', name: 'Schoolboy Q', image: '', followers: 3500000 }
  ],
  'sza': [
    { uuid: 'artist-101', name: 'SZA', image: '', followers: 8500000 }
  ]
};

// Mock tracks by artist
const mockTracks: Record<string, any[]> = {
  'artist-123': [
    { uuid: 'track-1', title: 'HUMBLE.', isrc: 'USUM71703861' },
    { uuid: 'track-2', title: 'DNA.', isrc: 'USUM71703862' },
    { uuid: 'track-3', title: 'LOYALTY.', isrc: 'USUM71703863' }
  ],
  'artist-456': [
    { uuid: 'track-4', title: 'MIDNIGHT DRIVE', isrc: 'US-TDE-24-00123' },
    { uuid: 'track-5', title: 'VICE CITY', isrc: 'US-TDE-24-00124' }
  ],
  'artist-789': [
    { uuid: 'track-6', title: 'WEST COAST', isrc: 'US-TDE-24-00125' },
    { uuid: 'track-7', title: 'BLOW FOR BLOW', isrc: 'US-TDE-24-00126' }
  ],
  'artist-101': [
    { uuid: 'track-8', title: 'KILL BILL', isrc: 'USRC12300001' },
    { uuid: 'track-9', title: 'SNOOZE', isrc: 'USRC12300002' }
  ]
};

export default function RoyaltyFinderPage() {
  const [searchType, setSearchType] = useState<'artist' | 'writer'>('artist');
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<RoyaltyEstimate[]>([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSearch = () => {
    if (!query.trim() || query.length < 2) return;
    
    setSearching(true);
    setArtists([]);
    
    // Simulate API search
    setTimeout(() => {
      const searchResults: Artist[] = [];
      const lowerQuery = query.toLowerCase();
      
      if (lowerQuery.includes('kendrick')) {
        searchResults.push(...(mockArtists['kendrick'] || []));
      }
      if (lowerQuery.includes('jay') || lowerQuery.includes('rock')) {
        searchResults.push(...(mockArtists['jay'] || []));
      }
      if (lowerQuery.includes('schoolboy') || lowerQuery.includes('q')) {
        searchResults.push(...(mockArtists['schoolboy'] || []));
      }
      if (lowerQuery.includes('sza')) {
        searchResults.push(...(mockArtists['sza'] || []));
      }
      
      setArtists(searchResults);
      setSearching(false);
    }, 800);
  };

  const handleSelectArtist = (artist: Artist) => {
    setSelectedArtist(artist);
    setScanning(true);
    setArtists([]);
    setQuery(artist.name);
    
    // Simulate scanning catalog
    setTimeout(() => {
      const tracks = mockTracks[artist.uuid] || [
        { uuid: 'default-1', title: 'Popular Track 1' },
        { uuid: 'default-2', title: 'Popular Track 2' },
        { uuid: 'default-3', title: 'Popular Track 3' }
      ];
      
      const estimates: RoyaltyEstimate[] = tracks.map((track, index) => {
        const baseStreams = Math.floor(Math.random() * 5000000) + 1000000;
        const rate = 0.0035;
        
        let confidence: 'high' | 'medium' | 'low' = 'medium';
        if (baseStreams > 3000000) confidence = 'high';
        else if (baseStreams < 2000000) confidence = 'low';
        
        return {
          trackUuid: track.uuid,
          trackName: track.title,
          artistName: artist.name,
          totalStreams: baseStreams,
          estimatedRoyalty: Math.round(baseStreams * rate * 100) / 100,
          confidence,
          platforms: {
            spotify: Math.floor(baseStreams * 0.6),
            apple_music: Math.floor(baseStreams * 0.25),
            youtube: Math.floor(baseStreams * 0.1),
            tidal: Math.floor(baseStreams * 0.03),
            deezer: Math.floor(baseStreams * 0.02)
          }
        };
      });
      
      setResults(estimates);
      setScanning(false);
      setShowEmailModal(true);
    }, 1500);
  };

  const handleSendEmail = () => {
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

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const totalMissing = results.reduce((sum, r) => sum + r.estimatedRoyalty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="font-bold text-2xl text-purple-600">
                SoundProtocol
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/label" className="text-gray-600 hover:text-gray-900">Label Portal</Link>
              <Link href="/royalty-finder" className="text-purple-600 font-medium">Royalty Finder</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Missing <span className="text-purple-600">Royalties</span>
          </h1>
          <p className="text-xl text-gray-600">
            Search our database of 100M+ tracks to discover unclaimed earnings
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Tabs */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setSearchType('artist')}
              className={`flex-1 py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all ${
                searchType === 'artist'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Music className="h-5 w-5" />
              <span>Search by Artist</span>
            </button>
            <button
              onClick={() => setSearchType('writer')}
              className={`flex-1 py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all ${
                searchType === 'writer'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User className="h-5 w-5" />
              <span>Search by Writer</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={searchType === 'artist' 
                ? "Enter artist name (e.g., Kendrick Lamar, Jay Rock)"
                : "Enter writer name (e.g., John Doe)"
              }
              className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={!query.trim() || searching}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium text-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {searching ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Searching...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Search className="h-5 w-5 mr-2" />
                Search Royalties
              </span>
            )}
          </button>

          {/* Artist Results */}
          {artists.length > 0 && !selectedArtist && (
            <div className="mt-8 border-t border-gray-100 pt-8">
              <h3 className="text-lg font-semibold mb-4">Select an artist:</h3>
              <div className="space-y-3">
                {artists.map((artist) => (
                  <button
                    key={artist.uuid}
                    onClick={() => handleSelectArtist(artist)}
                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center space-x-4 transition-colors"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Music className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900">{artist.name}</p>
                      {artist.followers && (
                        <p className="text-sm text-gray-500">
                          {formatNumber(artist.followers)} followers
                        </p>
                      )}
                    </div>
                    <ArrowRight className="h-5 w-5 text-purple-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Scanning State */}
          {scanning && (
            <div className="mt-8 text-center py-12">
              <Loader2 className="h-16 w-16 animate-spin text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Scanning Royalty Databases</h3>
              <p className="text-gray-500">Checking {selectedArtist?.name}'s catalog across all platforms...</p>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Globe className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Global Coverage</h3>
            <p className="text-sm text-gray-500">100M+ tracks across all major platforms</p>
          </div>
          <div className="text-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Real-Time Data</h3>
            <p className="text-sm text-gray-500">Powered by Soundcharts API</p>
          </div>
          <div className="text-center">
            <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Instant Estimates</h3>
            <p className="text-sm text-gray-500">Get royalty estimates in seconds</p>
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {!emailSent ? (
              <>
                <h3 className="text-2xl font-bold mb-2">
                  We found <span className="text-purple-600">{formatCurrency(totalMissing)}</span>
                </h3>
                <p className="text-gray-600 mb-6">
                  Enter your email to see the detailed breakdown for {selectedArtist?.name}
                </p>

                {/* Results Preview */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 max-h-80 overflow-y-auto">
                  {results.map((result, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                      <div>
                        <p className="font-medium">{result.trackName}</p>
                        <p className="text-sm text-gray-500">
                          {result.confidence === 'high' && '✓ High confidence'}
                          {result.confidence === 'medium' && '⚠️ Medium confidence'}
                          {result.confidence === 'low' && '❓ Low confidence'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{formatCurrency(result.estimatedRoyalty)}</p>
                        <p className="text-xs text-gray-400">{formatNumber(result.totalStreams)} streams</p>
                      </div>
                    </div>
                  ))}
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                />

                <button
                  onClick={handleSendEmail}
                  disabled={!email.includes('@')}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                >
                  Send My Results
                </button>

                <button 
                  onClick={() => setShowEmailModal(false)}
                  className="w-full text-sm text-gray-500 hover:text-gray-700"
                >
                  No thanks, I'll check later
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Check Your Inbox!</h3>
                <p className="text-gray-600">
                  We've sent the royalty report to {email}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}