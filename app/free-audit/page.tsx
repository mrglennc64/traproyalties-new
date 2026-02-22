"use client";

import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FreeAuditPage() {
  const [selectedRole, setSelectedRole] = useState<'label' | 'artist'>('label');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [scanResults, setScanResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelect = (role: 'label' | 'artist') => {
    setSelectedRole(role);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Check if it's a CSV file
      if (!selectedFile.name.endsWith('.csv')) {
        setError('Please upload a CSV file');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setError(null);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('role', selectedRole);

    try {
      const response = await fetch('/api/scan-catalog', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      
      if (response.ok) {
        const data = await response.json();
        setScanResults(data);
        setUploadProgress(100);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Upload failed');
        setUploadProgress(0);
      }
    } catch (err) {
      clearInterval(progressInterval);
      setError('Network error. Please try again.');
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleSampleClick = () => {
    // Create a sample CSV content
    const sampleContent = `ISRC,Title,Artist,Writers
US-XYZ-25-00123,DRIP TOO HARD,Gunna,Gunna, Wheezy
US-XYZ-25-00124,STREET RUNNER,Metro Boomin,Metro Boomin, Future
US-XYZ-25-00125,LATE NIGHT,SZA,SZA, Babyface`;

    // Create a file from the sample content
    const sampleFile = new File([sampleContent], 'sample-catalog.csv', { type: 'text/csv' });
    setFile(sampleFile);
    setError(null);
  };

  const resetUpload = () => {
    setFile(null);
    setScanResults(null);
    setUploadProgress(0);
    setError(null);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold neon-cyan mb-4">Free Catalog Audit</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Scan up to 10 tracks FREE — uncover missing royalties from streams, syncs, & performances. Built for hip hop & R&B hustlers.
          </p>
          <p className="mt-4 text-lg text-purple-300 font-medium">Limited free scan • Basic report • Upgrade for unlimited + advanced splits</p>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-900/50 p-8 md:p-12">
          {/* Role Toggle */}
          <div className="flex space-x-4 mb-10">
            <button 
              onClick={() => handleRoleSelect('label')}
              className={`flex-1 py-5 rounded-2xl font-semibold flex items-center justify-center space-x-3 transition-all ${
                selectedRole === 'label' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/40 transform hover:scale-105' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>I'm a Label / Crew</span>
            </button>
            <button 
              onClick={() => handleRoleSelect('artist')}
              className={`flex-1 py-5 rounded-2xl font-semibold flex items-center justify-center space-x-3 transition-all ${
                selectedRole === 'artist' 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/40 transform hover:scale-105' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
              </svg>
              <span>I'm an Artist / Producer</span>
            </button>
          </div>

          {/* Upload Zone */}
          {!scanResults ? (
            <div className="upload-zone rounded-2xl p-12 text-center mb-8 transition-all cursor-pointer border-2 border-dashed border-purple-600 bg-purple-900/5 hover:border-purple-400 hover:bg-purple-900/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-6">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
              </svg>
              <h3 className="text-2xl font-bold neon-purple mb-3">Drop Your Catalog Here</h3>
              <p className="text-gray-400 mb-6">CSV file with up to 10 tracks (ISRC, Title, Artist, Writers optional)</p>
              
              {file ? (
                <div className="space-y-4">
                  <div className="bg-purple-900/30 p-4 rounded-xl">
                    <p className="text-green-400 font-medium">Selected: {file.name}</p>
                    <p className="text-sm text-gray-400">Size: {(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  
                  {uploading ? (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-700 rounded-full h-4">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-purple-300">Scanning... {uploadProgress}%</p>
                    </div>
                  ) : (
                    <div className="flex space-x-4">
                      <button
                        onClick={handleUpload}
                        className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-900/50 transition transform hover:scale-105"
                      >
                        Start Audit
                      </button>
                      <button
                        onClick={resetUpload}
                        className="px-8 py-4 bg-gray-700 text-white rounded-full font-bold text-lg hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <input 
                    type="file" 
                    accept=".csv" 
                    className="hidden" 
                    id="file-upload"
                    onChange={handleFileChange}
                  />
                  <label 
                    htmlFor="file-upload" 
                    className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:from-purple-500 hover:to-pink-500 cursor-pointer shadow-lg shadow-purple-900/50 transition transform hover:scale-105"
                  >
                    Choose CSV File
                  </label>
                </>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-900/30 border border-red-600 rounded-xl">
                  <p className="text-red-400">{error}</p>
                </div>
              )}
            </div>
          ) : (
            // Results Section
            <div className="mb-8">
              <div className="bg-green-900/30 border border-green-600 rounded-2xl p-8 text-center mb-6">
                <h3 className="text-3xl font-bold text-green-400 mb-2">Audit Complete!</h3>
                <p className="text-xl text-gray-300">Found <span className="text-green-400 font-bold">${scanResults.estimatedMissing}</span> in potential unclaimed royalties</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-purple-900/30 rounded-xl p-6 text-center">
                  <p className="text-purple-300 mb-2">Tracks Scanned</p>
                  <p className="text-3xl font-bold text-white">{scanResults.tracksScanned}</p>
                </div>
                <div className="bg-yellow-900/30 rounded-xl p-6 text-center">
                  <p className="text-yellow-300 mb-2">Issues Found</p>
                  <p className="text-3xl font-bold text-white">{scanResults.issuesFound}</p>
                </div>
                <div className="bg-cyan-900/30 rounded-xl p-6 text-center">
                  <p className="text-cyan-300 mb-2">Missing PROs</p>
                  <p className="text-3xl font-bold text-white">{scanResults.missingPROs}</p>
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto mb-8">
                {scanResults.results?.map((result: any, index: number) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-purple-900/50">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-bold text-xl text-purple-300">{result.title}</span>
                          <span className="text-gray-400">• {result.artist}</span>
                        </div>
                        {result.isrc && (
                          <p className="text-sm text-gray-400 mb-2">ISRC: {result.isrc}</p>
                        )}
                        <p className="text-gray-300">{result.issue}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold inline-block ${
                          result.severity === 'high' ? 'bg-red-600/50 text-red-300' :
                          result.severity === 'medium' ? 'bg-yellow-600/50 text-yellow-300' :
                          'bg-blue-600/50 text-blue-300'
                        }`}>
                          {result.severity.toUpperCase()}
                        </span>
                        {result.estimatedAmount && (
                          <p className="text-xl font-bold text-green-400 mt-2">${result.estimatedAmount}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={resetUpload}
                  className="flex-1 py-4 bg-gray-700 text-white rounded-full font-bold text-lg hover:bg-gray-600 transition"
                >
                  Scan Another
                </button>
                <Link
                  href="/founding-member"
                  className="flex-1 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-bold text-lg hover:from-pink-500 hover:to-purple-500 text-center shadow-lg shadow-pink-900/50 transition transform hover:scale-105"
                >
                  Unlock Full Access
                </Link>
              </div>
            </div>
          )}

          {/* Sample Link */}
          {!file && !scanResults && (
            <p className="text-center text-gray-500 mb-10">
              Or <button onClick={handleSampleClick} className="text-purple-400 hover:text-purple-300 font-medium underline">try a sample trap catalog</button> to see results instantly
            </p>
          )}

          {/* Upsell Teaser */}
          <div className="text-center bg-purple-900/30 rounded-2xl p-8 border border-purple-700/50">
            <h3 className="text-2xl font-bold neon-cyan mb-4">Want Unlimited Scans + Crypto Split Verification?</h3>
            <p className="text-gray-300 mb-6">Upgrade to Pro for full catalog audits, ongoing monitoring, payment simulator, and lifetime discount via Royalty Accelerator (spots limited).</p>
            <Link 
              href="/founding-member" 
              className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 px-10 rounded-full text-xl shadow-2xl shadow-pink-900/50 transition transform hover:scale-105"
            >
              Unlock Full Power – Join Accelerator
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center neon-purple mb-12">How the Free Audit Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-600/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 neon-cyan">1. Upload (Max 10 Tracks)</h3>
              <p className="text-gray-300">Drop your CSV — keep it simple for the free scan.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-600/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 neon-cyan">2. We Scan PROs</h3>
              <p className="text-gray-300">Checks ASCAP, BMI, SOCAN, PRS for missing registrations & gaps common in collabs/features.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-600/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 neon-cyan">3. Get Basic Report</h3>
              <p className="text-gray-300">See unclaimed royalties estimates + next steps to get your bag.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}