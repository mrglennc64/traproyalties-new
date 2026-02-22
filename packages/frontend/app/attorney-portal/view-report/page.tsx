"use client";

import Header from '../components/Header';
import { useState } from 'react';

export default function ViewReportPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Audit Report – Metro Boomin 'Creepin'' Dispute"
        subtitle="Report ID: TRP-AUDIT-2026-045 • Generated: February 22, 2026"
      />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Report Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  Monad Verified
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Chain of Custody Intact
                </span>
              </div>
              <p className="text-sm text-gray-500">Matter: Metro Boomin – Creepin' Dispute (#2026-CV-0123)</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                Share
              </button>
              <button className="px-4 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition">
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="flex border-b border-gray-200">
            {['Overview', 'Ownership', 'Splits', 'Black Box', 'Evidence Chain'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-6 py-4 text-sm font-medium transition ${
                  activeTab === tab.toLowerCase()
                    ? 'border-b-2 border-indigo-900 text-indigo-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm text-indigo-600 mb-1">Unclaimed Royalties</p>
                    <p className="text-2xl font-bold text-indigo-900">$187,200</p>
                    <p className="text-xs text-gray-500">across 14 tracks</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-600 mb-1">Black Box Leakage</p>
                    <p className="text-2xl font-bold text-red-700">$112K</p>
                    <p className="text-xs text-gray-500">31% of total</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-600 mb-1">Split Issues</p>
                    <p className="text-2xl font-bold text-yellow-700">5</p>
                    <p className="text-xs text-gray-500">require attention</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 mb-1">Verified Tracks</p>
                    <p className="text-2xl font-bold text-green-700">18/24</p>
                    <p className="text-xs text-gray-500">75% complete</p>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Executive Summary</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    This audit identifies $187,200 in unclaimed royalties across 14 tracks from the "Creepin'" 
                    project. Key findings include 31% black box leakage from unreported streaming revenue, 
                    five split inconsistencies requiring resolution, and missing PRO registrations for two 
                    contributors. Full breakdown available in detailed sections below.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'ownership' && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Ownership Breakdown</h3>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Party</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Claimed %</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Verified %</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { name: 'Metro Boomin', role: 'Producer', claimed: 50, verified: 50, status: 'Verified' },
                      { name: 'The Weeknd', role: 'Feature', claimed: 25, verified: 20, status: 'Under-claimed' },
                      { name: '21 Savage', role: 'Feature', claimed: 15, verified: 15, status: 'Missing PRO' },
                      { name: 'Label', role: 'Publisher', claimed: 10, verified: 10, status: 'Verified' }
                    ].map((item, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3 font-medium">{item.name}</td>
                        <td className="px-4 py-3 text-gray-600">{item.role}</td>
                        <td className="px-4 py-3">{item.claimed}%</td>
                        <td className="px-4 py-3">{item.verified}%</td>
                        <td className="px-4 py-3">
                          <span className={`text-sm font-medium ${
                            item.status === 'Verified' ? 'text-green-600' :
                            item.status === 'Under-claimed' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'splits' && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Split Inconsistencies</h3>
                <div className="space-y-4">
                  {[
                    { track: 'Creepin\' (Main)', issue: 'Feature split 25% vs PRO shows 20%', severity: 'High' },
                    { track: 'Creepin\' (Remix)', issue: 'Producer missing from BMI registration', severity: 'Critical' },
                    { track: 'Street Runner', issue: 'Split total 92% - under-allocation', severity: 'Medium' }
                  ].map((item, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{item.track}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                          item.severity === 'High' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {item.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{item.issue}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'black box' && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Black Box Leakage Analysis</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-red-600 mb-2">Unreported Streaming Revenue</p>
                    <p className="text-3xl font-bold text-red-700">$112,000</p>
                    <p className="text-xs text-gray-500 mt-2">31% of total streams</p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <p className="text-sm text-indigo-600 mb-2">Platform Breakdown</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Spotify</span>
                        <span className="font-medium">$48K (43%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Apple Music</span>
                        <span className="font-medium">$35K (31%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>YouTube</span>
                        <span className="font-medium">$18K (16%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recommendations & Next Steps</h3>
          <div className="space-y-3">
            {[
              'Issue demand letter for $187,200 + statutory interest',
              'File missing PRO registrations for 21 Savage',
              'Request corrected royalty statements from Republic Records',
              'Prepare affidavit for potential litigation',
              'Schedule settlement conference within 30 days'
            ].map((rec, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-indigo-900 font-bold">{i + 1}</span>
                </div>
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}