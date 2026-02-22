"use client";

import Header from '../components/Header';
import { useState } from 'react';

export default function CustomReportPage() {
  const [reportType, setReportType] = useState('Full Audit Report');
  const [format, setFormat] = useState('PDF');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Generate Custom Report"
        subtitle="Build tailored reports for clients, negotiations, or court filings"
      />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Builder */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Configuration</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Matter</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Metro Boomin – Creepin' Dispute (#2026-CV-0123)</option>
                  <option>B.o.B Estate – 360 Deal Audit (#2026-CV-0456)</option>
                  <option>Future – Publishing Rights (#2026-CV-0789)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option>Full Audit Report</option>
                  <option>Executive Summary</option>
                  <option>Black Box Leakage Only</option>
                  <option>360 Deal Analysis</option>
                  <option>Split Verification Summary</option>
                  <option>Custom Selection</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Include Sections</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Ownership Breakdown',
                    'Split Inconsistencies',
                    'PRO Registrations',
                    'Black Box Analysis',
                    '360 Revenue Gaps',
                    'Sync Licensing',
                    'Performance Rights',
                    'Merch/Touring'
                  ].map((item) => (
                    <label key={item} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" className="h-4 w-4 text-indigo-900 rounded" defaultChecked />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    defaultValue="2026-01-01"
                  />
                  <input
                    type="date"
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    defaultValue="2026-02-22"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <div className="flex space-x-4">
                  {['PDF', 'CSV', 'Excel', 'JSON'].map((f) => (
                    <label key={f} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="format"
                        value={f}
                        checked={format === f}
                        onChange={(e) => setFormat(e.target.value)}
                        className="h-4 w-4 text-indigo-900"
                      />
                      <span className="text-sm text-gray-700">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full py-4 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-800 transition shadow-lg">
                Generate Report
              </button>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Report Preview</h2>
              <span className="text-xs text-gray-500">Live preview based on selections</span>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="font-bold text-indigo-900">
                  {reportType === 'Executive Summary' ? 'Executive Summary' : 
                   reportType === 'Black Box Leakage Only' ? 'Black Box Leakage Analysis' :
                   'Custom Audit Report'}
                </p>
                <p className="text-sm text-gray-500">Metro Boomin – Creepin' Dispute</p>
                <p className="text-xs text-gray-400 mt-1">Generated: Feb 22, 2026 | ID: TRP-CUSTOM-{Date.now().toString().slice(-6)}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Key Findings</p>
                  <ul className="mt-2 space-y-2">
                    <li className="text-sm flex justify-between">
                      <span className="text-gray-600">Unclaimed Royalties:</span>
                      <span className="font-bold text-green-600">$187,200</span>
                    </li>
                    <li className="text-sm flex justify-between">
                      <span className="text-gray-600">Black Box Leakage:</span>
                      <span className="font-bold text-red-600">$112K (31%)</span>
                    </li>
                    <li className="text-sm flex justify-between">
                      <span className="text-gray-600">Split Issues:</span>
                      <span className="font-bold text-yellow-600">5 flagged</span>
                    </li>
                    <li className="text-sm flex justify-between">
                      <span className="text-gray-600">PRO Gaps:</span>
                      <span className="font-bold text-orange-600">2 missing</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-green-600 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Monad Verified • Chain of Custody Intact
                  </p>
                  <p className="text-xs text-gray-400 mt-2 font-mono">
                    Hash: 0x7f3a...8e9d
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs text-gray-500 italic">
                Full report will include {format} export with Bates stamping, 
                verification QR code, and blockchain proof.
              </p>
            </div>
          </div>
        </div>

        {/* Saved Templates */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Saved Report Templates</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Standard Audit', used: 'Used 12 times' },
              { name: 'Litigation Package', used: 'Used 8 times' },
              { name: 'Due Diligence', used: 'Used 6 times' }
            ].map((template, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 cursor-pointer transition">
                <p className="font-medium text-gray-900">{template.name}</p>
                <p className="text-xs text-gray-500">{template.used}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}