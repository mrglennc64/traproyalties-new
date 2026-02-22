"use client";

import Header from '../components/Header';
import { useState } from 'react';

export default function DemandLetterPage() {
  const [recipient, setRecipient] = useState('Republic Records');
  const [amount, setAmount] = useState('187,200');
  const [deadline, setDeadline] = useState('30');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Create Legal Demand Letter"
        subtitle="Generate demand letter with auto-filled evidence from audits"
      />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Letter Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Matter</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Metro Boomin – Creepin' Dispute (#2026-CV-0123)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient (Label/Publisher)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (Days)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Firm but Professional</option>
                  <option>Aggressive (Pre-Litigation)</option>
                  <option>Standard</option>
                </select>
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
                    <span className="text-sm text-gray-700">Split Sheet Evidence</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="h-4 w-4 text-indigo-900 rounded" />
                    <span className="text-sm text-gray-700">PRO Registration Confirmations</span>
                  </label>
                </div>
              </div>

              <button className="w-full py-4 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-800 transition shadow-lg">
                Generate Letter
              </button>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Letter Preview</h2>
            
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 font-serif">
              <div className="text-center mb-6">
                <p className="font-bold">FOX ROTHSCHILD LLP</p>
                <p className="text-sm text-gray-600">101 Park Avenue • New York, NY 10178</p>
              </div>

              <p className="text-sm mb-4">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

              <p className="text-sm mb-4">
                {recipient}<br />
                Attn: Legal Department
              </p>

              <p className="font-bold text-sm mb-4">
                RE: Unpaid Royalties – "Creepin'" (ISRC: USUM72212345)
              </p>

              <p className="text-sm mb-4">
                Dear Sir or Madam:
              </p>

              <p className="text-sm mb-4">
                We represent Metro Boomin in connection with the above-referenced track. 
                Pursuant to applicable copyright law and contractual obligations, we hereby demand 
                payment of <span className="font-bold">${amount}</span> in unpaid royalties, plus statutory interest at 7% per annum 
                under Georgia law, within <span className="font-bold">{deadline}</span> days of receipt of this letter.
              </p>

              <p className="text-sm mb-4">
                Attached please find a TrapRoyalties Pro Audit Report (Monad Hash Verified – Tamper-Proof) 
                documenting the unpaid amounts through forensic analysis of PRO and streaming data.
              </p>

              <p className="text-sm mb-4">
                Failure to remit payment will result in further legal action, including litigation 
                in Georgia Superior Court. We are prepared to pursue all available remedies.
              </p>

              <p className="text-sm mb-8">
                Sincerely,<br /><br />
                Leron Rogers, Esq.<br />
                Fox Rothschild LLP
              </p>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs text-green-600 flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  Monad Hash Verified • Tamper-Proof
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="flex-1 py-3 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition">
                Save Draft
              </button>
              <button className="flex-1 py-3 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-800 transition">
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}