"use client";

import Link from 'next/link';

export default function AttorneyPortalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-2 px-6 text-center text-sm font-medium">
        Attorney Portal – Secure Session | Encrypted & Monad-Verified
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
            <span className="text-sm text-gray-600">Leron Rogers (Fox Rothschild)</span>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-white border-r border-gray-200 min-h-screen p-6">
          <div className="space-y-8">
            {/* Main Navigation */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Matter Management</p>
              <div className="space-y-2">
                <Link 
                  href="/attorney-portal"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all sidebar-link text-gray-600 hover:bg-indigo-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Dashboard</span>
                </Link>
                
                <Link 
                  href="/attorney-portal/new-matter"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all sidebar-link text-gray-600 hover:bg-indigo-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>New Matter</span>
                </Link>
              </div>
            </div>

            {/* Audit & Due Diligence */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Audit & Due Diligence</p>
              <div className="space-y-2">
                <Link 
                  href="/attorney-portal/run-due-diligence"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all sidebar-link text-gray-600 hover:bg-indigo-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Run Catalog Due Diligence</span>
                </Link>
                
                <Link 
                  href="/attorney-portal/split-verification"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all sidebar-link text-gray-600 hover:bg-indigo-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Pre-Release Split Verification</span>
                </Link>
              </div>
            </div>

            {/* Reports & Documents */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Reports & Documents</p>
              <div className="space-y-2">
                <Link 
                  href="/attorney-portal/view-report"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all sidebar-link text-gray-600 hover:bg-indigo-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>View Audit Report</span>
                </Link>
                
                <Link 
                  href="/attorney-portal/generate-court-report"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all sidebar-link text-gray-600 hover:bg-indigo-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Generate Court-Ready Report</span>
                </Link>
                
                <Link 
                  href="/attorney-portal/generate-custom-report"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all sidebar-link text-gray-600 hover:bg-indigo-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Generate Custom Report</span>
                </Link>
              </div>
            </div>

            {/* Legal Actions */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Legal Actions</p>
              <div className="space-y-2">
                <Link 
                  href="/attorney-portal/demand-letter"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all sidebar-link text-gray-600 hover:bg-indigo-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Create Demand Letter</span>
                </Link>
                
                <Link 
                  href="/attorney-portal/affidavit"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all sidebar-link text-gray-600 hover:bg-indigo-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                  <span>Export Affidavit</span>
                </Link>
                
                <Link 
                  href="/attorney-portal/export-hash"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all sidebar-link text-gray-600 hover:bg-indigo-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Export with Monad Hash Seal</span>
                </Link>
              </div>
            </div>

            {/* Communication */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Communication</p>
              <div className="space-y-2">
                <Link 
                  href="/attorney-portal/secure-message"
                  className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all sidebar-link text-gray-600 hover:bg-indigo-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Secure Client Message</span>
                  <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">2</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Dashboard */}
        <div className="flex-1 p-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, Leron</h1>
            <p className="text-gray-600">Fox Rothschild LLP · Active Matters: 12</p>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <p className="text-sm text-gray-500 mb-1">Active Matters</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="text-xs text-green-600 mt-2">+3 this month</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <p className="text-sm text-gray-500 mb-1">Pending Audits</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
              <p className="text-xs text-yellow-600 mt-2">4 require review</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <p className="text-sm text-gray-500 mb-1">Active Disputes</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
              <p className="text-xs text-red-600 mt-2">2 urgent</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <p className="text-sm text-gray-500 mb-1">Black Box Value</p>
              <p className="text-3xl font-bold text-green-600">$1.2M</p>
              <p className="text-xs text-indigo-600 mt-2">Unclaimed royalties</p>
            </div>
          </div>

          {/* Recent Matters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Matters</h2>
            <div className="space-y-4">
              <Link href="/attorney-portal/view-report" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition cursor-pointer">
                <div>
                  <p className="font-bold text-lg">Metro Boomin – Creepin' Dispute</p>
                  <p className="text-sm text-gray-500">Updated 2 hours ago · $187K claimed</p>
                </div>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Urgent</span>
              </Link>
              
              <Link href="/attorney-portal/view-report" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition cursor-pointer">
                <div>
                  <p className="font-bold text-lg">B.o.B Estate – 360 Deal Audit</p>
                  <p className="text-sm text-gray-500">Updated yesterday · $450K under audit</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">In Progress</span>
              </Link>
              
              <Link href="/attorney-portal/view-report" className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition cursor-pointer">
                <div>
                  <p className="font-bold text-lg">Future – Publishing Rights</p>
                  <p className="text-sm text-gray-500">Updated 3 days ago · Document review</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Ready</span>
              </Link>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/attorney-portal/run-due-diligence"
              className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 text-center hover:shadow-lg transition group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-indigo-900 group-hover:scale-110 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="font-bold text-lg text-gray-900">Run Catalog Due Diligence</h3>
            </Link>
            
            <Link 
              href="/attorney-portal/generate-court-report"
              className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 text-center hover:shadow-lg transition group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-indigo-900 group-hover:scale-110 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="font-bold text-lg text-gray-900">Generate Court-Ready Report</h3>
            </Link>
            
            <Link 
              href="/attorney-portal/secure-message"
              className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 text-center hover:shadow-lg transition group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-indigo-900 group-hover:scale-110 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="font-bold text-lg text-gray-900">Secure Client Message</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}