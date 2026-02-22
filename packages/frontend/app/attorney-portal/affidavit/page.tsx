"use client";

import Header from '../components/Header';
import { useState } from 'react';

export default function AffidavitPage() {
  const [affiant, setAffiant] = useState('Leron Rogers, Esq.');
  const [matter, setMatter] = useState('Metro Boomin – Creepin\' Dispute');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Export Affidavit"
        subtitle="Generate sworn affidavit of debt/ownership for court filings"
      />
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Affidavit Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Matter</label>
                <select 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={matter}
                  onChange={(e) => setMatter(e.target.value)}
                >
                  <option>Metro Boomin – Creepin' Dispute (#2026-CV-0123)</option>
                  <option>B.o.B Estate – 360 Deal Audit (#2026-CV-0456)</option>
                  <option>Future – Publishing Rights (#2026-CV-0789)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Affiant (You)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={affiant}
                  onChange={(e) => setAffiant(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sworn Statement Summary</label>
                <textarea 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                  defaultValue="I, Leron Rogers, Esq., affirm under penalty of perjury that the attached TrapRoyalties Pro Audit Report accurately reflects unpaid royalties of $187,200 for the track 'Creepin'' (ISRC: USUM72212345), based on forensic analysis of PRO and streaming data."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Include Attachments</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="h-4 w-4 text-indigo-900 rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Audit Report (Monad Verified)</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="h-4 w-4 text-indigo-900 rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Exhibit A: Royalty Statements</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="h-4 w-4 text-indigo-900 rounded" />
                    <span className="text-sm text-gray-700">Exhibit B: Correspondence</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Affidavit Preview</h2>
            
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <p className="font-bold text-center text-indigo-900 mb-6">AFFIDAVIT OF {affiant.toUpperCase()}</p>

              <div className="space-y-4 text-sm">
                <p>I, {affiant}, being duly sworn, depose and state as follows:</p>

                <p>1. I am counsel for Metro Boomin in the above-referenced matter and am licensed to practice law in the State of Georgia.</p>

                <p>2. The attached TrapRoyalties Pro Audit Report, generated on February 22, 2026, demonstrates unpaid royalties of $187,200 for the track "Creepin'" (ISRC: USUM72212345).</p>

                <p>3. The report has been verified via Monad blockchain (Hash: 0x7f3a...8e9d) and is accurate to the best of my knowledge and belief.</p>

                <p>4. The respondent, Republic Records, has failed to remit payment despite multiple requests.</p>

                <p className="mt-6">I declare under penalty of perjury that the foregoing is true and correct.</p>

                <div className="mt-8">
                  <p>Executed on this {new Date().getDate()}th day of {new Date().toLocaleString('default', { month: 'long' })}, {new Date().getFullYear()}.</p>
                  
                  <div className="mt-8">
                    <p>___________________________</p>
                    <p className="text-sm text-gray-600">{affiant}</p>
                  </div>

                  <div className="mt-8">
                    <p>___________________________</p>
                    <p className="text-sm text-gray-600">Notary Public</p>
                    <p className="text-xs text-gray-500">My Commission Expires: ________</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-green-600 flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Monad Hash Verified • Tamper-Proof
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="flex-1 py-3 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition">
                Edit
              </button>
              <button className="flex-1 py-3 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-800 transition">
                Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* Notary Instructions */}
        <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h3 className="font-semibold text-indigo-900 mb-2">Notary Instructions</h3>
          <p className="text-sm text-gray-700 mb-4">
            After downloading, have the affiant sign in front of a notary public. The notary must complete the notary block.
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Affiant must appear in person before notary</li>
            <li>• Notary must verify identity</li>
            <li>• Notary seal and signature required</li>
            <li>• Document is court-ready after notarization</li>
          </ul>
        </div>
      </main>
    </div>
  );
}