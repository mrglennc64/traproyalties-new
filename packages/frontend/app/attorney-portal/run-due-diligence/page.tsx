"use client";

import Header from '../components/Header';
import { useState } from 'react';
import Link from 'next/link';

export default function DueDiligencePage() {
  const [selectedMatter, setSelectedMatter] = useState('');
  const [uploading, setUploading] = useState(false);
  const [scanStarted, setScanStarted] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [selectedScope, setSelectedScope] = useState({
    streaming: true,
    sync: true,
    performance: true,
    merch: false,
    full360: true
  });

  const matters = [
    { id: '1', name: 'Metro Boomin – Creepin\' Dispute', case: '2026-CV-0123' },
    { id: '2', name: 'B.o.B Estate – 360 Deal Audit', case: '2026-CV-0456' },
    { id: '3', name: 'Future – Publishing Rights', case: '2026-CV-0789' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setUploadComplete(true);
    }, 2000);
  };

  const handleStartScan = () => {
    if (!selectedMatter) {
      alert('Please select a matter first');
      return;
    }
    if (!uploadComplete) {
      alert('Please upload catalog files first');
      return;
    }
    setScanStarted(true);
    // Simulate scan
    setTimeout(() => {
      window.location.href = '/attorney-portal/view-report';
    }, 3000);
  };

  const handleScopeChange = (scope: string) => {
    setSelectedScope(prev => ({
      ...prev,
      [scope]: !prev[scope as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Run Catalog Due Diligence"
        subtitle="Perform forensic audit before releases, deals, or disputes"
      />
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Step 1: Select Matter */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-indigo-900 text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
              Select Client / Matter
            </h2>
            <select 
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              value={selectedMatter}
              onChange={(e) => setSelectedMatter(e.target.value)}
            >
              <option value="">Select a matter...</option>
              {matters.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.case})</option>
              ))}
              <option value="new">+ Create New Matter</option>
            </select>
          </div>

          {/* Step 2: Upload Catalog */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-indigo-900 text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
              Upload Catalog
            </h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-indigo-500 transition relative">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileUpload}
                disabled={uploading}
                accept=".csv,.xlsx,.xls,.pdf"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              
              {uploading ? (
                <div>
                  <p className="text-gray-600 mb-2">Uploading and analyzing...</p>
                  <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-indigo-900 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              ) : uploadComplete ? (
                <div>
                  <p className="text-green-600 font-medium mb-2">✓ Upload Complete</p>
                  <p className="text-sm text-gray-500">catalog_export_2026.csv uploaded</p>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-2">Drag and drop catalog files, or <span className="text-indigo-900 font-medium">browse</span></p>
                  <p className="text-sm text-gray-500">CSV, Excel, PDF up to 50MB</p>
                </>
              )}
            </div>
          </div>

          {/* Step 3: Select Scope */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-indigo-900 text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
              Select Audit Scope
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-indigo-900 rounded"
                  checked={selectedScope.streaming}
                  onChange={() => handleScopeChange('streaming')}
                />
                <span className="text-gray-700">Streaming Royalties</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-indigo-900 rounded"
                  checked={selectedScope.sync}
                  onChange={() => handleScopeChange('sync')}
                />
                <span className="text-gray-700">Sync Licensing</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-indigo-900 rounded"
                  checked={selectedScope.performance}
                  onChange={() => handleScopeChange('performance')}
                />
                <span className="text-gray-700">Performance Rights (PROs)</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-indigo-900 rounded"
                  checked={selectedScope.merch}
                  onChange={() => handleScopeChange('merch')}
                />
                <span className="text-gray-700">Merch/Touring (360)</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-indigo-900 rounded"
                  checked={selectedScope.full360}
                  onChange={() => handleScopeChange('full360')}
                />
                <span className="text-gray-700 font-medium">Full 360 Audit (All Revenue)</span>
              </label>
            </div>
          </div>

          {/* Action Button */}
          {scanStarted ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Scanning catalog for gaps and leakage...</p>
              <p className="text-sm text-gray-400 mt-2">Checking PROs · Analyzing splits · Calculating black box</p>
            </div>
          ) : (
            <button 
              onClick={handleStartScan}
              className="w-full py-4 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-800 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedMatter || !uploadComplete}
            >
              Start Forensic Scan
            </button>
          )}
        </div>
      </main>
    </div>
  );
}