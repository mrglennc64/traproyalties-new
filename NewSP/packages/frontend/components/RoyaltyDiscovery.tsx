"use client";

import { useState } from "react";
import {
  Search,
  Music,
  User,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Calendar,
  Shield,
  Loader2,
  Download,
  Mail,
  X,
} from "lucide-react";

interface DiscoveryResult {
  // ...existing code...
                <p className="text-gray-600 mb-4">
                  Enter your email and our team will help you recover your missing royalties.
                </p>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  onClick={handleSendEmail}
                  disabled={!email}
                >
                  Send
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
                <p className="text-green-700 font-semibold mb-2">Email sent!</p>
                <p className="text-gray-600 text-sm">We'll be in touch soon.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import {
  Search,
  Music,
  User,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Calendar,
  Shield,
  Loader2,
  Download,
  Mail,
  X,
} from "lucide-react";

interface DiscoveryResult {
  id: string;
  trackName: string;
  artistName: string;
  isrc?: string;
  source: string;
  estimatedAmount: number;
  confidence: "high" | "medium" | "low";
  dateFound: string;
}

export default function RoyaltyDiscovery() {
  const [searchType, setSearchType] = useState<"artist" | "writer">("artist");
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<DiscoveryResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSearch = async () => {
    setSearching(true);
    setTimeout(() => {
      setResults([
        {
          id: "1",
          trackName: "Lost in the Sound",
          artistName: "DJ Example",
          isrc: "US-AAA-99-00001",
          source: "Soundcharts",
          estimatedAmount: 1200,
          confidence: "high",
          dateFound: "2026-02-19",
        },
        {
          id: "2",
          trackName: "Night Drive",
          artistName: "Synthwave",
          isrc: "US-AAA-99-00002",
          source: "Soundcharts",
          estimatedAmount: 800,
          confidence: "medium",
          dateFound: "2026-02-18",
        },
      ]);
      setShowResults(true);
      setSearching(false);
    }, 1500);
  };

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => {
      setShowEmailModal(false);
      setEmailSent(false);
      setEmail("");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-2 flex items-center">
        <Search className="h-6 w-6 mr-2 text-blue-600" />
        Royalty Discovery
      </h2>
      <p className="text-gray-600 mb-6">
        Instantly find missing royalties for your catalog. Search by artist or writer name.
      </p>
      <div className="flex mb-4 gap-2">
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            searchType === "artist"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setSearchType("artist")}
        >
          Artist
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            searchType === "writer"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setSearchType("writer")}
        >
          Writer
        </button>
      </div>
      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder={`Enter ${searchType} name...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          onClick={handleSearch}
          disabled={searching || !query}
        >
          {searching ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Search"
          )}
        </button>
      </div>
      {showResults && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Music className="h-5 w-5 mr-2 text-purple-600" />
            Results
          </h3>
          {results.length === 0 ? (
            <p className="text-gray-500">No missing royalties found for this {searchType}.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {results.map((result) => (
                <li key={result.id} className="py-4 flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        {result.trackName}
                      </span>
                      <span className="text-gray-500 text-sm">by {result.artistName}</span>
                      {result.isrc && (
                        <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                          ISRC: {result.isrc}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-blue-600 font-medium">
                        ${result.estimatedAmount.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">estimated</span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          result.confidence === "high"
                            ? "bg-green-100 text-green-800"
                            : result.confidence === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {result.confidence.charAt(0).toUpperCase() + result.confidence.slice(1)} confidence
                      </span>
                      <span className="text-xs text-gray-400 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {result.dateFound}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                      <Shield className="h-4 w-4 mr-1 text-blue-500" />
                      {result.source}
                    </span>
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors flex items-center gap-1"
                      onClick={() => setShowEmailModal(true)}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Claim
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full relative">
            <button
              // ...existing code...
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={searchType === 'artist' 
            ? "Enter your artist name or Spotify URL"
            : "Enter your first and last legal name"
          }
          className="w-full pl-14 pr-12 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        {searching && (
          <Loader2 className="absolute right-4 top-4 h-6 w-6 animate-spin text-purple-600" />
        )}
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={!query.trim() || searching}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium text-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all mb-4"
      >
        {searching ? 'Searching databases...' : 'Find Missing Royalties'}
      </button>

      {/* Helper Text */}
      <p className="text-sm text-gray-500 text-center">
        If you're both an artist and writer, select the role where you earn more royalties.
        We'll account for both when you sign up.
      </p>

      {/* Results Section */}
      {showResults && results.length > 0 && (
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="text-xl font-semibold text-green-800">
                  We found {results.length} potential missing payments!
                </h3>
                <p className="text-green-700">
                  Total estimated: ${totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">{result.trackName}</h4>
                    <p className="text-gray-600">{result.artistName}</p>
                    {result.isrc && (
                      <p className="text-xs text-gray-400 font-mono mt-1">ISRC: {result.isrc}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">
                      ${result.estimatedAmount.toLocaleString()}
                    </p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getConfidenceColor(result.confidence)}`}>
                      {result.confidence} confidence
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {result.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Email Capture Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            {!emailSent ? (
              <>
                <h3 className="text-2xl font-bold mb-2">
                  We found <span className="text-purple-600">${totalAmount.toLocaleString()}</span> in royalties!
                </h3>
                <p className="text-gray-600 mb-6">
                  Enter your email to see the full breakdown and claim instructions.
                </p>

                <div className="bg-purple-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-purple-800 mb-2">Preview of what you'll get:</p>
                  <ul className="space-y-2">
                    {results.slice(0, 3).map((result) => (
                      <li key={result.id} className="text-sm flex justify-between">
                        <span>{result.trackName}</span>
                        <span className="font-medium">${result.estimatedAmount.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
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
                  className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed mb-3 flex items-center justify-center space-x-2"
                >
                  <Mail className="h-5 w-5" />
                  <span>Send me my results</span>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We'll never share your email. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Check your inbox!</h3>
                <p className="text-gray-600 mb-4">
                  We've sent your royalty report to {email}
                </p>
                <button
                  onClick={() => {
                    setShowEmailModal(false);
                    setEmailSent(false);
                    setEmail('');
                  }}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RoyaltyDiscovery() {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<DiscoveryResult | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const startScan = async () => {
    setScanning(true);
    setTimeout(() => {
      setResults({
        totalMissing: 3500000,
        issues: [
          {
            type: 'MISSING_REGISTRATION',
            track: 'Summer Nights',
            artist: 'Kendrick Lamar',
            issue: 'Not registered with ASCAP',
            severity: 'HIGH',
            amount: 1245000,
            fix: 'Register with ASCAP immediately',
          },
          {
            type: 'MISSING_REGISTRATION',
            track: 'Midnight Drive',
            artist: 'Jay Rock',
            issue: 'Not registered with BMI',
            severity: 'HIGH',
            amount: 890000,
            fix: 'Register with BMI',
          },
          {
            type: 'SPLIT_MISMATCH',
            track: 'West Coast',
            artist: 'Schoolboy Q',
            issue: 'Producer missing 15% split',
            severity: 'HIGH',
            amount: 580000,
            fix: 'Add producer to split sheet',
          },
          {
            type: 'METADATA_ERROR',
            track: 'Unforgettable',
            artist: 'SZA',
            issue: 'Missing ISRC code',
            severity: 'MEDIUM',
            amount: 425000,
            fix: 'Add ISRC code',
          },
          {
            type: 'TERRITORY_GAP',
            track: 'Humble',
            artist: 'Kendrick Lamar',
            issue: 'EU territory not registered',
            severity: 'MEDIUM',
            amount: 360000,
            fix: 'Register in EU territories',
          },
        ],
      });
      setScanning(false);
    }, 3000);
  };

  const categories = [
    { id: 'all', name: 'All Issues', count: results?.issues.length || 0 },
    { id: 'HIGH', name: 'High Priority', count: results?.issues.filter(i => i.severity === 'HIGH').length || 0 },
    { id: 'MEDIUM', name: 'Medium', count: results?.issues.filter(i => i.severity === 'MEDIUM').length || 0 },
    { id: 'LOW', name: 'Low', count: results?.issues.filter(i => i.severity === 'LOW').length || 0 },
  ];

  const filteredIssues = results?.issues.filter(
    i => selectedCategory === 'all' || i.severity === selectedCategory
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            <Search className="h-5 w-5 text-purple-600 mr-2" />
            Royalty Discovery Engine
          </h2>
          {!results && !scanning && (
            <button
              onClick={startScan}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Scan Catalog for Missing Royalties
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Automated audit of registrations, metadata, and splits
        </p>
      </div>

      {scanning && (
        <div className="py-12 text-center">
          <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium">Scanning your catalog...</p>
          <p className="text-sm text-gray-500 mt-2">Checking registrations with ASCAP, BMI, PRS, and more</p>
          <div className="max-w-md mx-auto mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Analyzing 247 tracks across 12 platforms</p>
          </div>
        </div>
      )}

      {results && (
        <>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mb-6 text-white">
            <p className="text-sm font-medium mb-1">Total Missing Royalties Identified</p>
            <p className="text-4xl font-bold">${(results.totalMissing / 1000000).toFixed(1)}M</p>
            <p className="text-sm mt-2 opacity-90">Across {results.issues.length} issues in your catalog</p>
          </div>
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredIssues?.map((issue, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3">
                    {issue.severity === 'HIGH' ? (
                      <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    ) : issue.severity === 'MEDIUM' ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          issue.severity === 'HIGH' ? 'bg-red-100 text-red-600' :
                          issue.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {issue.severity}
                        </span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                          {issue.type.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="font-medium mt-2">{issue.track} - {issue.artist}</p>
                      <p className="text-sm text-gray-600 mt-1">{issue.issue}</p>
                      <p className="text-sm font-semibold text-purple-600 mt-2">
                        Estimated missing: ${issue.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-gray-500">Suggested fix:</p>
                  <button className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center">
                    {issue.fix}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h3 className="text-sm font-medium text-purple-800 mb-2">Ready to fix</h3>
            <p className="text-xs text-purple-700 mb-3">
              We've identified {results.issues.length} specific issues that are blocking your royalties.
            </p>
            <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
              Fix All Issues (Estimated recovery: ${results.totalMissing.toLocaleString()})
            </button>
          </div>
        </>
      )}
      {!results && !scanning && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600 mb-2" />
            <p className="text-sm font-medium">Registration Audit</p>
            <p className="text-xs text-gray-600">Check PRO registrations</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <Music className="h-6 w-6 text-green-600 mb-2" />
            <p className="text-sm font-medium">Metadata Check</p>
            <p className="text-xs text-gray-600">Validate ISRC/ISWC</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <Users className="h-6 w-6 text-purple-600 mb-2" />
            <p className="text-sm font-medium">Split Validation</p>
            <p className="text-xs text-gray-600">100% rule enforcement</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <Globe className="h-6 w-6 text-yellow-600 mb-2" />
            <p className="text-sm font-medium">Territory Gaps</p>
            <p className="text-xs text-gray-600">Find missing regions</p>
          </div>
        </div>
      )}
    </div>
  );
}
"use client";

// ...existing code...
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
            "use client";

            import { useState } from 'react';
import { useState } from 'react';
              Search,
              AlertTriangle,
              CheckCircle,
              XCircle,
              DollarSign,
              Music,
              Users,
              Globe,
              FileText,
              ArrowRight,
              Loader2
            } from 'lucide-react';
            import { DiscoveryResult } from '../services/royaltyDiscovery';

            export default function RoyaltyDiscovery() {
export default function RoyaltyDiscovery() {
              const [results, setResults] = useState<DiscoveryResult | null>(null);
              const [selectedCategory, setSelectedCategory] = useState<string>('all');

              const startScan = async () => {
                setScanning(true);
                // Simulate scanning process
                setTimeout(() => {
                  setResults({
                    totalMissing: 3500000,
                    issues: [
                      {
                        type: 'MISSING_REGISTRATION',
                        track: 'Summer Nights',
                        artist: 'Kendrick Lamar',
                        issue: 'Not registered with ASCAP',
                        severity: 'HIGH',
                        amount: 1245000,
                        fix: 'Register with ASCAP immediately',
                      },
                      {
                        type: 'MISSING_REGISTRATION',
                        track: 'Midnight Drive',
                        artist: 'Jay Rock',
                        issue: 'Not registered with BMI',
                        severity: 'HIGH',
                        amount: 890000,
                        fix: 'Register with BMI',
                      },
                      {
                        type: 'SPLIT_MISMATCH',
                        track: 'West Coast',
                        artist: 'Schoolboy Q',
                        issue: 'Producer missing 15% split',
                        severity: 'HIGH',
                        amount: 580000,
                        fix: 'Add producer to split sheet',
                      },
                      {
                        type: 'METADATA_ERROR',
                        track: 'Unforgettable',
                        artist: 'SZA',
                        issue: 'Missing ISRC code',
                        severity: 'MEDIUM',
                        amount: 425000,
                        fix: 'Add ISRC code',
                      },
                      {
                        type: 'TERRITORY_GAP',
                        track: 'Humble',
                        artist: 'Kendrick Lamar',
                        issue: 'EU territory not registered',
                        severity: 'MEDIUM',
                        amount: 360000,
                        fix: 'Register in EU territories',
                      },
                    ],
                  });
                  setScanning(false);
                }, 3000);
              };

              const categories = [
                { id: 'all', name: 'All Issues', count: results?.issues.length || 0 },
                { id: 'HIGH', name: 'High Priority', count: results?.issues.filter(i => i.severity === 'HIGH').length || 0 },
                { id: 'MEDIUM', name: 'Medium', count: results?.issues.filter(i => i.severity === 'MEDIUM').length || 0 },
                { id: 'LOW', name: 'Low', count: results?.issues.filter(i => i.severity === 'LOW').length || 0 },
              ];

              const filteredIssues = results?.issues.filter(
                i => selectedCategory === 'all' || i.severity === selectedCategory
              );

              return (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  {/* Header with Mogul-style stats */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold flex items-center">
                        <Search className="h-5 w-5 text-purple-600 mr-2" />
                        Royalty Discovery Engine
                      </h2>
                      {!results && !scanning && (
                        <button
                          onClick={startScan}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Scan Catalog for Missing Royalties
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Automated audit of registrations, metadata, and splits
                    </p>
                  </div>

                  {scanning && (
                    <div className="py-12 text-center">
                      <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
                      <p className="text-lg font-medium">Scanning your catalog...</p>
                      <p className="text-sm text-gray-500 mt-2">Checking registrations with ASCAP, BMI, PRS, and more</p>
                      <div className="max-w-md mx-auto mt-6">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Analyzing 247 tracks across 12 platforms</p>
                      </div>
                    </div>
                  )}

                  {results && (
                    <>
                      {/* Total Found Banner - Like Mogul's $3.5M */}
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mb-6 text-white">
                        <p className="text-sm font-medium mb-1">Total Missing Royalties Identified</p>
                        <p className="text-4xl font-bold">${(results.totalMissing / 1000000).toFixed(1)}M</p>
                        <p className="text-sm mt-2 opacity-90">Across {results.issues.length} issues in your catalog</p>
                      </div>

                      {/* Category Tabs */}
                      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                        {categories.map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                              selectedCategory === cat.id
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {cat.name} ({cat.count})
                          </button>
                        ))}
                      </div>

                      {/* Issues List */}
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {filteredIssues?.map((issue, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-start space-x-3">
                                {issue.severity === 'HIGH' ? (
                                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                ) : issue.severity === 'MEDIUM' ? (
                                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                      issue.severity === 'HIGH' ? 'bg-red-100 text-red-600' :
                                      issue.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-600' :
                                      'bg-blue-100 text-blue-600'
                                    }`}>
                                      {issue.severity}
                                    </span>
                                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                                      {issue.type.replace('_', ' ')}
                                    </span>
                                  </div>
                                  <p className="font-medium mt-2">{issue.track} - {issue.artist}</p>
                                  <p className="text-sm text-gray-600 mt-1">{issue.issue}</p>
                                  <p className="text-sm font-semibold text-purple-600 mt-2">
                                    Estimated missing: ${issue.amount.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <p className="text-xs text-gray-500">Suggested fix:</p>
                              <button className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center">
                                {issue.fix}
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Actionable Output - Like Mogul's "clear list of what needs to be fixed" */}
                      <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <h3 className="text-sm font-medium text-purple-800 mb-2">Ready to fix</h3>
                        <p className="text-xs text-purple-700 mb-3">
                          We've identified {results.issues.length} specific issues that are blocking your royalties.
                        </p>
                        <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
                          Fix All Issues (Estimated recovery: ${results.totalMissing.toLocaleString()})
                        </button>
                      </div>
                    </>
                  )}

                  {/* Stats Grid - Like Mogul's features */}
                  {!results && !scanning && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <FileText className="h-6 w-6 text-blue-600 mb-2" />
                        <p className="text-sm font-medium">Registration Audit</p>
                        <p className="text-xs text-gray-600">Check PRO registrations</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <Music className="h-6 w-6 text-green-600 mb-2" />
                        <p className="text-sm font-medium">Metadata Check</p>
                        <p className="text-xs text-gray-600">Validate ISRC/ISWC</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <Users className="h-6 w-6 text-purple-600 mb-2" />
                        <p className="text-sm font-medium">Split Validation</p>
                        <p className="text-xs text-gray-600">100% rule enforcement</p>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <Globe className="h-6 w-6 text-yellow-600 mb-2" />
                        <p className="text-sm font-medium">Territory Gaps</p>
                        <p className="text-xs text-gray-600">Find missing regions</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Automated audit of registrations, metadata, and splits
        </p>
      </div>

      {scanning && (
        <div className="py-12 text-center">
          <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium">Scanning your catalog...</p>
          <p className="text-sm text-gray-500 mt-2">Checking registrations with ASCAP, BMI, PRS, and more</p>
          <div className="max-w-md mx-auto mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Analyzing 247 tracks across 12 platforms</p>
          </div>
        </div>
      )}

      {results && (
        <>
          {/* Total Found Banner - Like Mogul's $3.5M */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mb-6 text-white">
            <p className="text-sm font-medium mb-1">Total Missing Royalties Identified</p>
            <p className="text-4xl font-bold">${(results.totalMissing / 1000000).toFixed(1)}M</p>
            <p className="text-sm mt-2 opacity-90">Across {results.issues.length} issues in your catalog</p>
          </div>

          {/* Category Tabs */}
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Issues List */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredIssues?.map((issue, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3">
                    {issue.severity === 'HIGH' ? (
                      <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    ) : issue.severity === 'MEDIUM' ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          issue.severity === 'HIGH' ? 'bg-red-100 text-red-600' :
                          issue.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {issue.severity}
                        </span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                          {issue.type.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="font-medium mt-2">{issue.track} - {issue.artist}</p>
                      <p className="text-sm text-gray-600 mt-1">{issue.issue}</p>
                      <p className="text-sm font-semibold text-purple-600 mt-2">
                        Estimated missing: ${issue.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-gray-500">Suggested fix:</p>
                  <button className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center">
                    {issue.fix}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Actionable Output - Like Mogul's "clear list of what needs to be fixed" */}
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h3 className="text-sm font-medium text-purple-800 mb-2">Ready to fix</h3>
            <p className="text-xs text-purple-700 mb-3">
              We've identified {results.issues.length} specific issues that are blocking your royalties.
            </p>
            <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
              Fix All Issues (Estimated recovery: ${results.totalMissing.toLocaleString()})
            </button>
          </div>
        </>
      )}

      {/* Stats Grid - Like Mogul's features */}
      {!results && !scanning && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600 mb-2" />
            <p className="text-sm font-medium">Registration Audit</p>
            <p className="text-xs text-gray-600">Check PRO registrations</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <Music className="h-6 w-6 text-green-600 mb-2" />
            <p className="text-sm font-medium">Metadata Check</p>
            <p className="text-xs text-gray-600">Validate ISRC/ISWC</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <Users className="h-6 w-6 text-purple-600 mb-2" />
            <p className="text-sm font-medium">Split Validation</p>
            <p className="text-xs text-gray-600">100% rule enforcement</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <Globe className="h-6 w-6 text-yellow-600 mb-2" />
            <p className="text-sm font-medium">Territory Gaps</p>
            <p className="text-xs text-gray-600">Find missing regions</p>
          </div>
        </div>
      )}
    </div>
  );
}
