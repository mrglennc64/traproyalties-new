"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Star, 
  Users, 
  Music, 
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Mail,
  Calendar,
  MessageCircle,
  Sparkles,
  Gem,
  Award,
  Clock,
  Upload,
  Search,
  FileText,
  Download,
  PlayCircle,
  Menu,
  X,
  ChevronRight,
  Waves
} from 'lucide-react';

export default function FoundingMemberPage() {
  const [selectedTier, setSelectedTier] = useState<'label' | 'artist'>('label');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStep, setFormStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    catalogSize: '',
    referral: '',
    goals: ''
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to your backend
    alert('Application submitted! We\'ll review within 48 hours.');
  };

  // Stats for the program
  const labelSpotsRemaining = 28;
  const artistSpotsRemaining = 342;
  const totalApplications = 180;

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
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/audit" className="text-gray-600 hover:text-gray-900">Free Audit</Link>
              <Link href="/founding-member" className="text-purple-600 font-medium">Founding Member</Link>
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
                href="/audit"
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
                <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link href="/audit" className="text-gray-600 hover:text-gray-900">Free Audit</Link>
                <Link href="/founding-member" className="text-purple-600 font-medium">Founding Member</Link>
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
      <section className="pt-32 pb-16 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Gem className="h-4 w-4" />
            <span className="text-sm font-medium">Limited Time • Invite Only</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            The Royalty Accelerator
          </h1>
          
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Join 50 independent labels and 500 artists as founding members. 
            Lifetime 50% discount + shape our product roadmap.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-1">50</div>
              <div className="text-sm text-purple-200">Label Spots</div>
              <div className="text-lg font-semibold text-yellow-300 mt-2">{labelSpotsRemaining} remaining</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-1">500</div>
              <div className="text-sm text-purple-200">Artist Spots</div>
              <div className="text-lg font-semibold text-yellow-300 mt-2">{artistSpotsRemaining} remaining</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-1">{totalApplications}+</div>
              <div className="text-sm text-purple-200">Applications</div>
              <div className="text-lg font-semibold text-yellow-300 mt-2">Reviewing now</div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Become a Co-Creator</h2>
            <p className="text-lg text-gray-600">
              Founding members don't just get a discount — they help build the future of royalty management.
            </p>
          </div>

          <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Sparkles className="h-6 w-6 text-purple-600 mr-2" />
              The Audit-First Hook
            </h3>
            <p className="text-gray-700 mb-4">
              Every founding member receives a comprehensive catalog audit. We scan across:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Soundcharts (streaming data)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>ASCAP, BMI, SOCAN, PRS</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>MLC (mechanical rights)</span>
              </div>
            </div>
            <p className="text-gray-700">
              You'll receive a detailed "Found Money Report" showing unclaimed royalties, 
              split discrepancies, and registration gaps — often worth thousands.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Comparison */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Program Benefits</h2>
          <p className="text-xl text-gray-600 text-center mb-12">Choose your path</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Labels */}
            <div className={`bg-white rounded-2xl shadow-xl p-8 border-2 transition-all ${
              selectedTier === 'label' ? 'border-purple-600 shadow-purple-100' : 'border-transparent'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold">For Labels</h3>
                </div>
                <button
                  onClick={() => setSelectedTier('label')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm ${
                    selectedTier === 'label'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Select
                </button>
              </div>

              <ul className="space-y-4 mb-8">
                <BenefitItem 
                  icon={Search}
                  title="Free Comprehensive Catalog Audit"
                  description="Full catalog scan across all PROs and streaming platforms"
                />
                <BenefitItem 
                  icon={Award}
                  title="50% Lifetime Discount"
                  description="Half-price access to all current and future features forever"
                />
                <BenefitItem 
                  icon={Star}
                  title="Priority Feature Requests"
                  description="Your feedback shapes our roadmap + quarterly strategy calls"
                />
                <BenefitItem 
                  icon={Upload}
                  title="White-Glove Onboarding"
                  description="Bulk ISRC/IPI upload, metadata cleanup assistance"
                />
                <BenefitItem 
                  icon={Zap}
                  title="Early Access"
                  description="First to try micro-royalties, AI detection, and new modules"
                />
              </ul>

              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Sample audit includes:</p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Unclaimed royalties by territory
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Split discrepancies
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    PRO registration gaps
                  </li>
                </ul>
              </div>
            </div>

            {/* For Artists */}
            <div className={`bg-white rounded-2xl shadow-xl p-8 border-2 transition-all ${
              selectedTier === 'artist' ? 'border-purple-600 shadow-purple-100' : 'border-transparent'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Music className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold">For Artists</h3>
                </div>
                <button
                  onClick={() => setSelectedTier('artist')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm ${
                    selectedTier === 'artist'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Select
                </button>
              </div>

              <ul className="space-y-4 mb-8">
                <BenefitItem 
                  icon={Search}
                  title="Free Individual Audit"
                  description="Deep analysis of your top 10 tracks"
                />
                <BenefitItem 
                  icon={Award}
                  title="50% Lifetime Discount"
                  description="Half-price access to all artist plans forever"
                />
                <BenefitItem 
                  icon={MessageCircle}
                  title="Direct Feedback Channel"
                  description="Private Discord/Slack access to the team"
                />
                <BenefitItem 
                  icon={PlayCircle}
                  title="Simplified Onboarding"
                  description="Import from Spotify or Apple Music playlists"
                />
                <BenefitItem 
                  icon={Shield}
                  title="Split Proof Wallet"
                  description="Early access to artist verification tools"
                />
              </ul>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">What we audit:</p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Streaming performance
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    PRO registration status
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Split accuracy
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Audit Report Preview */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your "Found Money Report"</h2>
            <p className="text-lg text-gray-600">
              Every founding member receives a detailed audit report showing exactly where money is being left on the table.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600"></div>
            <div className="p-8">
              {/* Report Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Catalog Audit Report</h3>
                  <p className="text-gray-500">Top Dawg Entertainment • March 2026</p>
                </div>
                <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium">
                  CONFIDENTIAL
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-red-600 mb-1">Unclaimed Royalties</p>
                  <p className="text-2xl font-bold text-gray-900">$124,500</p>
                  <p className="text-xs text-gray-500">estimated across 12 tracks</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-sm text-yellow-600 mb-1">Split Discrepancies</p>
                  <p className="text-2xl font-bold text-gray-900">8 issues</p>
                  <p className="text-xs text-gray-500">splits don't total 100%</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 mb-1">Registration Gaps</p>
                  <p className="text-2xl font-bold text-gray-900">5 missing</p>
                  <p className="text-xs text-gray-500">PROs not registered</p>
                </div>
              </div>

              {/* Sample Issues */}
              <h4 className="font-semibold mb-3">Priority Issues Found</h4>
              <div className="space-y-3">
                <AuditIssueRow 
                  track="MIDNIGHT DRIVE"
                  artist="Jay Rock"
                  issue="BMI registration missing"
                  impact="Est. $3,450 unclaimed"
                  severity="high"
                />
                <AuditIssueRow 
                  track="VICE CITY"
                  artist="Jay Rock"
                  issue="Split mismatch: 85% total"
                  impact="Producer missing 15%"
                  severity="medium"
                />
                <AuditIssueRow 
                  track="WEST COAST"
                  artist="Schoolboy Q"
                  issue="ASCAP not registered"
                  impact="Est. $2,100 unclaimed"
                  severity="high"
                />
                <AuditIssueRow 
                  track="ELEMENT."
                  artist="Jay Rock"
                  issue="Publisher missing"
                  impact="20% share unassigned"
                  severity="medium"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                <p className="text-sm text-gray-500">*Based on initial scan • Full report available upon application</p>
                <button className="text-purple-600 font-medium text-sm flex items-center">
                  Download Sample Report
                  <Download className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-2">Apply for Founding Membership</h2>
            <p className="text-center text-gray-600 mb-8">
              {selectedTier === 'label' 
                ? 'Join 50 independent labels shaping the future of royalty management.'
                : 'Join 500 artists getting early access to verification tools.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {selectedTier === 'label' ? 'Label Name' : 'Full Name'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={selectedTier === 'label' ? 'Top Dawg Entertainment' : 'Jay Rock'}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="contact@tde.com"
                  required
                />
              </div>

              {/* Conditional field based on tier */}
              {selectedTier === 'label' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Artists in Catalog
                  </label>
                  <input
                    type="number"
                    name="catalogSize"
                    value={formData.catalogSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="25"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Released Tracks
                  </label>
                  <input
                    type="number"
                    name="catalogSize"
                    value={formData.catalogSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="15"
                  />
                </div>
              )}

              {/* How did you hear about us? */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How did you hear about SoundProtocol?
                </label>
                <select
                  name="referral"
                  value={formData.referral}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select an option</option>
                  <option value="twitter">Twitter/X</option>
                  <option value="instagram">Instagram</option>
                  <option value="friend">Friend/Colleague</option>
                  <option value="article">Article/Blog</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Goals */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are you hoping to achieve with SoundProtocol?
                </label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Tell us about your royalty management challenges..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium text-lg hover:shadow-lg transition-all"
              >
                Apply for Founding Membership
              </button>

              <p className="text-xs text-gray-500 text-center">
                No commitment required. We'll review your application within 48 hours.
                {selectedTier === 'label' && ` ${labelSpotsRemaining} label spots remaining.`}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <FAQItem 
              question="What happens after I apply?"
              answer="We review your application within 48 hours. If accepted, you'll receive an email with next steps including scheduling your free audit and setting up your founding member account."
            />
            <FAQItem 
              question="How long does the audit take?"
              answer="For labels, comprehensive catalog audits typically take 3-5 business days. Artist audits of top 10 tracks are usually completed within 24-48 hours."
            />
            <FAQItem 
              question="What's included in the 'Found Money Report'?"
              answer="The report includes estimated unclaimed royalties by territory/source, split discrepancies (splits not adding to 100%, missing writers), and registration gaps (tracks not registered with certain PROs)."
            />
            <FAQItem 
              question="Can I upgrade from artist to label later?"
              answer="Yes! Artists can upgrade to label accounts at any time. Your 50% lifetime discount applies to the upgraded tier as well."
            />
            <FAQItem 
              question="What happens after the founding member program fills up?"
              answer="Once we reach 50 labels and 500 artists, the program will close. Founding members retain their lifetime discounts forever."
            />
          </div>
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
                <li><Link href="/audit" className="hover:text-white">Free Audit</Link></li>
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

// ==================== Helper Components ====================

interface BenefitItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function BenefitItem({ icon: Icon, title, description }: BenefitItemProps) {
  return (
    <li className="flex space-x-3">
      <div className="flex-shrink-0 mt-1">
        <Icon className="h-5 w-5 text-purple-600" />
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </li>
  );
}

interface AuditIssueRowProps {
  track: string;
  artist: string;
  issue: string;
  impact: string;
  severity: 'high' | 'medium' | 'low';
}

function AuditIssueRow({ track, artist, issue, impact, severity }: AuditIssueRowProps) {
  const severityColors: Record<string, string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-blue-100 text-blue-700'
  };

  const severityColor = severityColors[severity] || 'bg-gray-100 text-gray-700';

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{track}</span>
          <span className="text-sm text-gray-500">• {artist}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{issue}</p>
      </div>
      <div className="text-right">
        <span className={`text-xs px-2 py-1 rounded-full ${severityColor}`}>
          {severity.toUpperCase()}
        </span>
        <p className="text-sm font-medium text-gray-900 mt-1">{impact}</p>
      </div>
    </div>
  );
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <ChevronRight className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
}