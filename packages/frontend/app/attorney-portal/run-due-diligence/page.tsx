"use client";

import { useState } from 'react';
import Link from 'next/link';

const MATTERS = [
  { id: '1', name: "Metro Boomin – Creepin' Dispute", tracks: 12, value: '$187K claimed' },
  { id: '2', name: 'B.o.B Estate – 360 Deal Audit', tracks: 47, value: '$450K under audit' },
  { id: '3', name: 'Future – Publishing Rights', tracks: 23, value: 'Document review' },
];

const DEMO_RESULTS: Record<string, {
  summary: { total: number; verified: number; critical: number; warnings: number; estimatedRecovery: string };
  tracks: { name: string; isrc: string; status: 'verified' | 'critical' | 'warning'; issue: string; action: string; proStatus: string[] }[];
}> = {
  '1': {
    summary: { total: 12, verified: 7, critical: 3, warnings: 2, estimatedRecovery: '$142,000–$187,000' },
    tracks: [
      { name: "CREEPIN'", isrc: 'US-MB1-22-00001', status: 'critical', issue: 'Split conflict — hook writer unregistered at BMI', action: 'Register hook writer at BMI immediately. Add correct split percentage.', proStatus: ['ASCAP ✓', 'BMI ✗', 'PRS ✓', 'SOCAN ✗'] },
      { name: 'SUPERHERO', isrc: 'US-MB1-22-00002', status: 'critical', issue: 'Total split adds to 87% — 13% unaccounted', action: 'Identify missing co-writer and correct split sheet with ASCAP.', proStatus: ['ASCAP ✓', 'BMI ✓', 'PRS ✗', 'SOCAN ✗'] },
      { name: 'AROUND ME', isrc: 'US-MB1-22-00003', status: 'verified', issue: '—', action: 'No action required.', proStatus: ['ASCAP ✓', 'BMI ✓', 'PRS ✓', 'SOCAN ✓'] },
      { name: 'TRANCE', isrc: 'US-MB1-22-00004', status: 'warning', issue: 'Track not registered with PRS or SOCAN', action: 'Register with PRS for Music and SOCAN to collect international royalties.', proStatus: ['ASCAP ✓', 'BMI ✓', 'PRS ✗', 'SOCAN ✗'] },
      { name: 'LOCK ON ME', isrc: 'US-MB1-22-00005', status: 'critical', issue: 'Duplicate ownership claim detected — 2 conflicting registrations', action: 'File dispute resolution with ASCAP. Obtain signed split sheet from all parties.', proStatus: ['ASCAP ⚠', 'BMI ✓', 'PRS ✗', 'SOCAN ✗'] },
    ],
  },
  '2': {
    summary: { total: 47, verified: 28, critical: 8, warnings: 11, estimatedRecovery: '$380,000–$450,000' },
    tracks: [
      { name: 'NOTHIN ON YOU', isrc: 'US-BOB-10-00001', status: 'critical', issue: 'Not registered with BMI — 14 years of performance royalties uncollected', action: 'File retroactive registration with BMI. Consult with PRO rep on claim window.', proStatus: ['ASCAP ✓', 'BMI ✗', 'PRS ✗', 'SOCAN ✗'] },
      { name: 'AIRPLANES', isrc: 'US-BOB-10-00002', status: 'warning', issue: 'Producer split missing from SOCAN registration', action: 'Add producer split to SOCAN registration.', proStatus: ['ASCAP ✓', 'BMI ✓', 'PRS ✓', 'SOCAN ⚠'] },
      { name: 'MAGIC', isrc: 'US-BOB-11-00001', status: 'verified', issue: '—', action: 'No action required.', proStatus: ['ASCAP ✓', 'BMI ✓', 'PRS ✓', 'SOCAN ✓'] },
      { name: 'SO GOOD', isrc: 'US-BOB-12-00001', status: 'critical', issue: 'Split adds to 115% — duplicate feature claim', action: 'Correct split sheet. Remove duplicate claim. File correction with BMI.', proStatus: ['ASCAP ✓', 'BMI ⚠', 'PRS ✗', 'SOCAN ✗'] },
    ],
  },
  '3': {
    summary: { total: 23, verified: 15, critical: 4, warnings: 4, estimatedRecovery: '$95,000–$140,000' },
    tracks: [
      { name: 'MASK OFF', isrc: 'US-FUT-17-00001', status: 'verified', issue: '—', action: 'No action required.', proStatus: ['ASCAP ✓', 'BMI ✓', 'PRS ✓', 'SOCAN ✓'] },
      { name: 'LIFE IS GOOD', isrc: 'US-FUT-20-00001', status: 'critical', issue: 'Publishing rights conflict — two publishers claiming same work', action: 'Obtain publishing agreement documentation. File with ASCAP to resolve conflict.', proStatus: ['ASCAP ⚠', 'BMI ⚠', 'PRS ✗', 'SOCAN ✗'] },
      { name: 'WAIT FOR U', isrc: 'US-FUT-22-00001', status: 'warning', issue: 'Sample clearance not reflected in PRO registration', action: 'Update registration to reflect sample source. Confirm clearance documentation on file.', proStatus: ['ASCAP ✓', 'BMI ✓', 'PRS ✗', 'SOCAN ✗'] },
      { name: 'PUSHIN P', isrc: 'US-FUT-22-00002', status: 'critical', issue: 'Featured artist split not registered at any PRO', action: 'Add featured artist split to all four PRO registrations immediately.', proStatus: ['ASCAP ✗', 'BMI ✗', 'PRS ✗', 'SOCAN ✗'] },
    ],
  },
};

type ScanStep = 'idle' | 'scanning' | 'complete';

export default function RunDueDiligencePage() {
  const [selectedMatter, setSelectedMatter] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [scanStep, setScanStep] = useState<ScanStep>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('');
  const [auditScope, setAuditScope] = useState({
    streaming: false,
    sync: false,
    merch: false,
    full: true,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setUploadedFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) setUploadedFile(e.dataTransfer.files[0]);
  };

  const handleStartScan = () => {
    if (!selectedMatter) { alert('Please select a client matter first.'); return; }
    if (!uploadedFile) { alert('Please upload a catalog file first.'); return; }

    setScanStep('scanning');
    setScanProgress(0);

    const messages = [
      'Connecting to ASCAP database...',
      'Scanning BMI registrations...',
      'Cross-referencing PRS for Music...',
      'Checking SOCAN records...',
      'Analyzing split sheets...',
      'Detecting ownership conflicts...',
      'Calculating recovery estimates...',
      'Generating attorney report...',
    ];

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setScanProgress(Math.min(step * 13, 99));
      setScanMessage(messages[Math.min(step - 1, messages.length - 1)]);
      if (step >= messages.length) {
        clearInterval(interval);
        setTimeout(() => {
          setScanProgress(100);
          setScanStep('complete');
        }, 600);
      }
    }, 700);
  };

  const results = DEMO_RESULTS[selectedMatter];
  const matter = MATTERS.find(m => m.id === selectedMatter);

  const statusColor = (s: string) => {
    if (s === 'critical') return 'bg-red-100 text-red-700 border-red-200';
    if (s === 'warning') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  const statusLabel = (s: string) => {
    if (s === 'critical') return '⚠ Critical';
    if (s === 'warning') return '○ Warning';
    return '✓ Verified';
  };

  const Sidebar = () => (
    <div className="w-72 bg-white border-r border-gray-200 min-h-screen p-6 shrink-0">
      <div className="space-y-8">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Matter Management</p>
          <div className="space-y-1">
            <Link href="/attorney-portal" className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-indigo-50 transition text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span>Dashboard</span>
            </Link>
            <Link href="/attorney-portal/new-matter" className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-indigo-50 transition text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              <span>New Matter</span>
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Audit & Due Diligence</p>
          <div className="space-y-1">
            <Link href="/attorney-portal/run-due-diligence" className="w-full flex items-center space-x-3 p-3 rounded-lg bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              <span>Run Catalog Due Diligence</span>
            </Link>
            <Link href="/attorney-portal/split-verification" className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-indigo-50 transition text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Pre-Release Split Verification</span>
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Reports & Documents</p>
          <div className="space-y-1">
            <Link href="/attorney-portal/view-report" className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-indigo-50 transition text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <span>View Audit Report</span>
            </Link>
            <Link href="/attorney-portal/generate-court-report" className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-indigo-50 transition text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <span>Generate Court-Ready Report</span>
            </Link>
            <Link href="/attorney-portal/generate-custom-report" className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-indigo-50 transition text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              <span>Generate Custom Report</span>
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Legal Actions</p>
          <div className="space-y-1">
            <Link href="/attorney-portal/demand-letter" className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-indigo-50 transition text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              <span>Create Demand Letter</span>
            </Link>
            <Link href="/attorney-portal/affidavit" className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-indigo-50 transition text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
              <span>Export Affidavit</span>
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Communication</p>
          <div className="space-y-1">
            <Link href="/attorney-portal/secure-message" className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-indigo-50 transition text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              <span>Secure Client Message</span>
              <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">2</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Bar */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-2 px-6 text-center text-sm font-medium flex items-center justify-center gap-3">
        Attorney Portal – Secure Session | Confidential
        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded">DEMO MODE</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-indigo-900">
              TrapRoyalties<span className="text-indigo-600">Pro</span>
            </Link>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full font-medium">Attorney Portal</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-sm text-gray-600">Attorney of Record</span>
            <Link href="/attorney-portal" className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg text-sm transition">
              ← Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">

          {/* SCANNING STATE */}
          {scanStep === 'scanning' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Scanning PRO Databases</h2>
              <p className="text-indigo-600 font-medium mb-6 h-6">{scanMessage}</p>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400">{scanProgress}% complete</p>
            </div>
          )}

          {/* RESULTS STATE */}
          {scanStep === 'complete' && results && (
            <div>
              {/* Demo notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <span className="text-yellow-500 text-lg">⚠</span>
                <div>
                  <p className="text-sm font-semibold text-yellow-800">Demo Mode — Sample Data Only</p>
                  <p className="text-xs text-yellow-700 mt-1">This report shows realistic sample findings for demonstration purposes. Live PRO database scanning will be available in the full release.</p>
                </div>
              </div>

              {/* Summary cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">{results.summary.total}</p>
                  <p className="text-xs text-gray-500 mt-1">Tracks Scanned</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{results.summary.verified}</p>
                  <p className="text-xs text-gray-500 mt-1">Verified Clean</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">{results.summary.critical}</p>
                  <p className="text-xs text-gray-500 mt-1">Critical Issues</p>
                </div>
                <div className="bg-white rounded-xl border border-red-100 bg-red-50 p-4 text-center">
                  <p className="text-2xl font-bold text-red-700">{results.summary.estimatedRecovery}</p>
                  <p className="text-xs text-red-600 mt-1">Est. Recovery Opportunity</p>
                </div>
              </div>

              {/* Track findings */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Audit Findings — {matter?.name}</h2>
                  <span className="text-xs text-gray-400 font-mono">Scanned: ASCAP · BMI · PRS · SOCAN</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {results.tracks.map((track, i) => (
                    <div key={i} className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-gray-900">{track.name}</p>
                          <p className="text-xs text-gray-400 font-mono mt-1">{track.isrc}</p>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColor(track.status)}`}>
                          {statusLabel(track.status)}
                        </span>
                      </div>
                      {track.status !== 'verified' && (
                        <>
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Issue Detected</p>
                            <p className="text-sm text-gray-800">{track.issue}</p>
                          </div>
                          <div className="bg-indigo-50 rounded-lg p-3 mb-3">
                            <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">Recommended Action</p>
                            <p className="text-sm text-indigo-900">{track.action}</p>
                          </div>
                        </>
                      )}
                      <div className="flex gap-2 flex-wrap">
                        {track.proStatus.map((pro, j) => (
                          <span key={j} className={`text-xs font-mono px-2 py-1 rounded border ${pro.includes('✓') ? 'bg-green-50 border-green-200 text-green-700' : pro.includes('⚠') ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-red-50 border-red-200 text-red-600'}`}>
                            {pro}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 flex-wrap">
                <Link href="/attorney-portal/generate-court-report" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition text-sm">
                  Generate Court-Ready Report
                </Link>
                <Link href="/attorney-portal/demand-letter" className="px-6 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold transition text-sm">
                  Create Demand Letter
                </Link>
                <button
                  onClick={() => { setScanStep('idle'); setUploadedFile(null); setSelectedMatter(''); setScanProgress(0); }}
                  className="px-6 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl font-semibold transition text-sm"
                >
                  Run Another Audit
                </button>
              </div>
            </div>
          )}

          {/* IDLE STATE — FORM */}
          {scanStep === 'idle' && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Run Catalog Due Diligence</h1>
                <p className="text-gray-500 max-w-2xl">
                  Perform a forensic audit on client catalogs before releases, deals, or disputes. Detect registration gaps, split errors, and ownership conflicts across ASCAP, BMI, PRS, and SOCAN.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                {/* Step 1 */}
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">1</span>
                    <h2 className="text-xl font-bold text-gray-900">Select Client / Matter</h2>
                  </div>
                  <select
                    value={selectedMatter}
                    onChange={(e) => setSelectedMatter(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-indigo-500 transition"
                  >
                    <option value="">— Select a matter —</option>
                    {MATTERS.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.tracks} tracks)</option>
                    ))}
                    <option value="new">+ New Matter</option>
                  </select>
                </div>

                {/* Step 2 */}
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">2</span>
                    <h2 className="text-xl font-bold text-gray-900">Upload Catalog File</h2>
                  </div>
                  {uploadedFile ? (
                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{uploadedFile.name}</p>
                          <p className="text-xs text-gray-500">{(uploadedFile.size / 1024).toFixed(1)} KB — ready for scan</p>
                        </div>
                      </div>
                      <button onClick={() => setUploadedFile(null)} className="text-sm text-red-500 hover:text-red-700">Remove</button>
                    </div>
                  ) : (
                    <div
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      className="border-2 border-dashed border-gray-200 hover:border-indigo-400 rounded-2xl p-10 text-center transition cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" className="mx-auto mb-4">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
                      </svg>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Drag & Drop Catalog File</h3>
                      <p className="text-gray-400 text-sm mb-5">CSV, Excel, or PDF — ISRCs, track names, or split sheets</p>
                      <label className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold text-sm transition cursor-pointer">
                        Choose File
                        <input type="file" accept=".csv,.xlsx,.xls,.pdf" className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>
                  )}
                </div>

                {/* Step 3 */}
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">3</span>
                    <h2 className="text-xl font-bold text-gray-900">Select Audit Scope</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { key: 'streaming', label: 'Streaming (Spotify / Apple Music)' },
                      { key: 'sync', label: 'Sync Licenses & Performance Rights' },
                      { key: 'merch', label: 'Merch / Touring / 360 Revenue' },
                      { key: 'full', label: 'Full 360 Audit — All Revenue Streams' },
                    ].map(({ key, label }) => (
                      <label key={key} className={`flex items-center space-x-3 p-4 rounded-xl border cursor-pointer transition ${auditScope[key as keyof typeof auditScope] ? 'border-indigo-300 bg-indigo-50 text-indigo-900' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                        <input type="checkbox" checked={auditScope[key as keyof typeof auditScope]} onChange={(e) => setAuditScope(prev => ({ ...prev, [key]: e.target.checked }))} className="w-4 h-4 accent-indigo-600" />
                        <span className="text-sm font-medium">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <div className="p-8">
                  <button onClick={handleStartScan} className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-bold text-xl transition shadow-lg shadow-indigo-900/20">
                    Start Forensic Scan →
                  </button>
                  <p className="text-center text-gray-400 text-xs mt-4">Scans ASCAP · BMI · PRS for Music · SOCAN</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="py-6 border-t border-gray-200 text-center bg-white">
        <p className="text-xs text-gray-400">Secure Portal &nbsp;·&nbsp; End-to-End Encryption &nbsp;·&nbsp; Court-Admissible Reports</p>
      </footer>
    </div>
  );
}
