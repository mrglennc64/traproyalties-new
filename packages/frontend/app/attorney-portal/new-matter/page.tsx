"use client";

import Header from '../components/Header';
import { useState } from 'react';

export default function NewMatterPage() {
  const [formData, setFormData] = useState({
    clientName: '',
    matterType: 'Royalty Dispute',
    projectName: '',
    isrcs: '',
    dealType: '360 Deal',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Creating matter:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Create New Matter"
        subtitle="Add a new client matter for royalty audit or dispute"
      />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
            {/* Client Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name / Firm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Metro Boomin"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matter Type <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.matterType}
                  onChange={(e) => setFormData({...formData, matterType: e.target.value})}
                >
                  <option>Royalty Dispute</option>
                  <option>Catalog Due Diligence</option>
                  <option>360 Deal Audit</option>
                  <option>Pre-Release Verification</option>
                  <option>Split Dispute</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Artist / Project Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Creepin' Dispute"
                value={formData.projectName}
                onChange={(e) => setFormData({...formData, projectName: e.target.value})}
              />
            </div>

            {/* ISRCs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key ISRCs / UPCs (comma-separated)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="USUM72212345, USUM72212346"
                value={formData.isrcs}
                onChange={(e) => setFormData({...formData, isrcs: e.target.value})}
              />
              <p className="text-xs text-gray-500 mt-1">Optional but recommended for faster audit</p>
            </div>

            {/* Deal Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deal Type
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.dealType}
                onChange={(e) => setFormData({...formData, dealType: e.target.value})}
              >
                <option>360 Deal</option>
                <option>Recording Contract</option>
                <option>Publishing Agreement</option>
                <option>Distribution Deal</option>
                <option>Sync License</option>
                <option>Other</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description / Notes
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Unpaid streaming royalties on Creepin'. Label not reporting full splits. Need black box analysis."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-indigo-900 text-white rounded-lg font-medium hover:bg-indigo-800 transition shadow-lg"
            >
              Create Matter & Start Audit
            </button>
          </div>
        </form>

        {/* Recent Matters */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Matters</h3>
          <div className="space-y-3">
            {[
              { name: 'Metro Boomin – Creepin\' Dispute', type: 'Royalty Dispute', date: 'Feb 22, 2026' },
              { name: 'B.o.B Estate – 360 Deal Audit', type: 'Catalog Due Diligence', date: 'Feb 20, 2026' },
              { name: 'Future – Publishing Rights', type: 'Split Verification', date: 'Feb 18, 2026' }
            ].map((matter, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{matter.name}</p>
                  <p className="text-sm text-gray-500">{matter.type}</p>
                </div>
                <span className="text-sm text-gray-400">{matter.date}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}