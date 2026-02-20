"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Music, 
  DollarSign, 
  Search,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Globe,
  FileText,
  Lock,
  Zap,
  Menu,
  X,
  ChevronRight,
  PlayCircle,
  Upload,
  AlertCircle,
  Clock,
  Sparkles,
  Mic2,
  Waves,
  Gem,
  Code,
  Smartphone,
  Wallet
} from 'lucide-react';

export default function UnifiedLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Waves className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SoundProtocol
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-purple-600 font-medium">Home</Link>
              <Link href="/free-audit" className="text-gray-600 hover:text-gray-900">Free Audit</Link>
              <Link href="/founding-member" className="text-gray-600 hover:text-gray-900">Founding Member</Link>
              <Link href="/label" className="text-gray-600 hover:text-gray-900">Label Portal</Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                href="/label" 
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/free-audit"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
              >
                Start Free Audit
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-purple-600 font-medium">Home</Link>
                <Link href="/free-audit" className="text-gray-600 hover:text-gray-900">Free Audit</Link>
                <Link href="/founding-member" className="text-gray-600 hover:text-gray-900">Founding Member</Link>
                <Link href="/label" className="text-gray-600 hover:text-gray-900">Label Portal</Link>
                <div className="pt-4 flex flex-col space-y-3">
                  <Link href="/label" className="px-4 py-2 text-center text-gray-600 hover:text-gray-900">
                    Sign In
                  </Link>
                  <Link
                    href="/audit"
                    className="px-6 py-2 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg"
                  >
                    Start Free Audit
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Free Catalog Audit Available Now</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  SoundProtocol
                </span>
                <span className="block text-gray-900 text-4xl md:text-5xl mt-2">
                  Find Missing Royalties & Verify Splits
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                The first platform that combines PRO database scanning and split verification.
                Discover registration gaps and metadata errors in minutes.
              </p>

              {/* Honest Stats - No Fake Numbers */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900">100M+</div>
                  <p className="text-sm text-gray-600">Tracks in database</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">4</div>
                  <p className="text-sm text-gray-600">PROs scanned</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">∞</div>
                  <p className="text-sm text-gray-600">Ready to verify</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/free-audit"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105 text-center"
                >
                  Start Free Audit
                  <ChevronRight className="inline ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/label"
                  className="px-8 py-4 border border-gray-200 rounded-xl font-medium hover:border-purple-200 hover:bg-purple-50 transition-colors flex items-center justify-center"
                >
                  <PlayCircle className="h-5 w-5 mr-2 text-purple-600" />
                  Label Dashboard
                </Link>
              </div>
            </div>

            {/* Hero Image - Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="h-3 bg-gradient-to-r from-purple-600 to-blue-600"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Music className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="font-semibold">Split Verification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Demo Mode</span>
                    </div>
                  </div>
                  
                  {/* Mock Split Verification Results */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-purple-800">Split Status</span>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-sm text-purple-700">3 tracks need split verification</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">MIDNIGHT DRIVE</p>
                        <p className="text-xs text-gray-500">ISRC: US-TDE-24-00123</p>
                      </div>
                      <span className="text-yellow-600 font-semibold">85% total</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">VICE CITY</p>
                        <p className="text-xs text-gray-500">ISRC: US-TDE-24-00124</p>
                      </div>
                      <span className="text-green-600 font-semibold">100% ✅</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">WEST COAST</p>
                        <p className="text-xs text-gray-500">ISRC: US-TDE-24-00125</p>
                      </div>
                      <span className="text-red-600 font-semibold">110% ⚠️</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">ASCAP • BMI • SOCAN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Audit Preview Section */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-4 py-2 rounded-full">
              🔍 FREE AUDIT TOOL
            </span>
            <h2 className="text-4xl font-bold mt-4 mb-4">
              Find Missing PRO Registrations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scan ASCAP, BMI, SOCAN, and PRS to discover where your tracks are missing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discovery</h3>
              <p className="text-gray-600">Find tracks registered with PROs that you haven't claimed</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verification</h3>
              <p className="text-gray-600">Confirm registered splits match your records</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gap Analysis</h3>
              <p className="text-gray-600">Identify missing registrations and metadata errors</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Ready to check your catalog?</h4>
                <p className="text-gray-600">Upload your tracks and get a free gap analysis report</p>
              </div>
              <Link
                href="/free-audit"
                className="px-8 py-4 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 flex items-center space-x-2"
              >
                <Upload className="h-5 w-5" />
                <span>Start Free Audit</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Complete Royalty Management Platform
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Everything you need to verify and track your royalties
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Search}
              title="PRO Scanner"
              description="Continuous monitoring of ASCAP, BMI, SOCAN, and PRS for registration gaps"
            />
            <FeatureCard
              icon={Shield}
              title="Split Verification"
              description="100% rule enforcement with cryptographic proofs on Monad testnet"
            />
            <FeatureCard
              icon={Wallet}
              title="Payment Simulator"
              description="Test royalty distributions with our demo payment simulator (no real money)"
            />
          </div>
        </div>
      </section>

      {/* Founding Member Program */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Gem className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">Royalty Accelerator Program</h2>
          <p className="text-xl text-purple-100 mb-8">
            Limited to 50 labels and 500 artists. Lifetime 50% discount.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
            <div className="bg-white/10 rounded-xl p-6">
              <Users className="h-8 w-8 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">For Labels</h3>
              <ul className="text-sm text-purple-100 space-y-2">
                <li>• Free catalog audit</li>
                <li>• 50% lifetime discount</li>
                <li>• White-glove onboarding</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <Music className="h-8 w-8 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">For Artists</h3>
              <ul className="text-sm text-purple-100 space-y-2">
                <li>• Free track audit</li>
                <li>• 50% lifetime discount</li>
                <li>• Split verification tools</li>
              </ul>
            </div>
          </div>

          <Link
            href="/founding-member"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-xl font-medium text-lg hover:shadow-xl transition-all"
          >
            Apply Now - Only 50 Spots Left
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Waves className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">SoundProtocol</span>
              </div>
              <p className="text-gray-400 text-sm">
                Verify royalties. Find gaps. Simulate payments.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/free-audit" className="hover:text-white">Free Audit</Link></li>
                <li><Link href="/founding-member" className="hover:text-white">Founding Member</Link></li>
                <li><Link href="/label" className="hover:text-white">Label Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            © 2026 SoundProtocol. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: any) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-purple-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}