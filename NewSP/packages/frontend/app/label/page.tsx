"use client";

import { useState } from 'react';
import { 
  Music, 
  AlertTriangle, 
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  Bell,
  Search,
  Download,
  Upload,
  Shield,
  PlayCircle,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import DemoRoyaltyPayment from '../../components/DemoRoyaltyPayment';

export default function LabelDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showDemo, setShowDemo] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'statements'>('dashboard');

  // Demo track data for payment modal
  const demoTrack = {
    isrc: 'US-TDE-24-00123',
    title: 'MIDNIGHT DRIVE',
    artist: 'Jay Rock',
    totalEarned: 12450.00,
    splits: [
      { 
        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', 
        percentage: 50, 
        name: 'Jay Rock', 
        role: 'artist' as const
      },
      { 
        address: '0x1234567890123456789012345678901234567890', 
        percentage: 25, 
        name: 'Dave Free', 
        role: 'producer' as const
      },
      { 
        address: '0x8765432109876543210987654321098765432109', 
        percentage: 25, 
        name: 'Top Dawg Ent', 
        role: 'label' as const
      }
    ]
  };

  const metrics = [
    {
      title: 'Total Catalog Value',
      value: 'Live Data Coming Q3 2026',
      change: '--',
      trend: 'up',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Monthly Royalties',
      value: 'Live Data Coming Q3 2026',
      change: '--',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Pending Payments',
      value: 'Live Data Coming Q3 2026',
      change: '--',
      trend: 'down',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Risk Exposure',
      value: 'Live Data Coming Q3 2026',
      change: '--',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  const recentActivity = [
    {
      track: 'MIDNIGHT DRIVE',
      artist: 'Jay Rock',
      label: 'Top Dawg Entertainment',
      amount: '--',
      status: 'completed',
      time: '2h ago',
      txHash: '0x7f3a...8e9d'
    },
    {
      track: 'WEST COAST',
      artist: 'Schoolboy Q',
      label: 'Top Dawg Entertainment',
      amount: '--',
      status: 'pending',
      time: '5h ago',
      txHash: '0x9b2c...4f1a'
    },
    {
      track: 'ELEMENT.',
      artist: 'Jay Rock',
      label: 'Top Dawg Entertainment',
      amount: '--',
      status: 'completed',
      time: '1d ago',
      txHash: '0x3d5e...7b2c'
    },
    {
      track: 'VICE CITY',
      artist: 'Jay Rock',
      label: 'Top Dawg Entertainment',
      amount: '--',
      status: 'flagged',
      time: '1d ago',
      txHash: '0x8a1f...9c3d'
    }
  ];

  const topTracks = [
    { rank: 1, title: 'MIDNIGHT DRIVE', artist: 'Jay Rock', streams: '--', revenue: '--' },
    { rank: 2, title: 'VICE CITY', artist: 'Jay Rock', streams: '--', revenue: '--' },
    { rank: 3, title: 'WEST COAST', artist: 'Schoolboy Q', streams: '--', revenue: '--' },
    { rank: 4, title: 'ELEMENT.', artist: 'Jay Rock', streams: '--', revenue: '--' },
    { rank: 5, title: 'BLOW FOR BLOW', artist: 'Schoolboy Q', streams: '--', revenue: '--' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Mode Banner */}
      <div className="bg-purple-600 text-white py-2 px-4 text-center text-sm">
        <span className="font-medium">🎮 Demo Mode Active</span> - No wallet needed. All data is simulated.
        <button 
          onClick={() => setShowDemo(true)}
          className="ml-4 inline-flex items-center space-x-1 bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-medium hover:bg-purple-50"
        >
          <PlayCircle className="h-3 w-3" />
          <span>Try Demo Payment</span>
        </button>
      </div>

      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Menu className="h-6 w-6 text-gray-600 cursor-pointer" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></div>
                <span className="font-bold text-xl">SoundProtocol</span>
                <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full font-medium">
                  VERIFICATION
                </span>
              </div>
            </div>
            
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tracks, artists, ISRC..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="px-3 py-2 bg-purple-50 rounded-lg">
                  <p className="text-xs text-purple-600">Demo Balance</p>
                  <p className="text-sm font-semibold">1,245 MON</p>
                </div>
                <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                  0x742d...f44e
                </div>
              </div>
              
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  TDE
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Top Dawg Ent.</p>
                  <p className="text-xs text-gray-500">Demo Mode</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="px-6 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome to SoundProtocol</h1>
              <p className="text-purple-100">Verifiable Royalty Proof for Music Credits and Earnings.</p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/royalty-finder"
                className="px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>Check Missing Royalties</span>
              </Link>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'dashboard'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Dashboard
          </button>
          
          {/* Split Verification Link - Opens the full SMPT page */}
          <Link
            href="/verification"
            className="px-4 py-2 font-medium text-gray-500 hover:text-purple-600 hover:border-b-2 hover:border-purple-600 transition-colors"
          >
            Split Verification
          </Link>
          
          <button
            onClick={() => setActiveTab('statements')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'statements'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Statements
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <>
            {/* Period Selector */}
            <div className="flex justify-end mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-1">
                {['day', 'week', 'month', 'quarter'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      selectedPeriod === period
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-${metric.color}-50 rounded-lg`}>
                        <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                      </div>
                      <span className="text-sm font-medium flex items-center text-gray-400">
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                    <p className="text-xl font-bold text-gray-400 italic">{metric.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Top Performing Tracks</h2>
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">View All →</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-600 border-b border-gray-200">
                        <th className="pb-3 font-medium">#</th>
                        <th className="pb-3 font-medium">Track</th>
                        <th className="pb-3 font-medium">Artist</th>
                        <th className="pb-3 font-medium text-right">Streams</th>
                        <th className="pb-3 font-medium text-right">Revenue</th>
                        <th className="pb-3 font-medium text-center">Demo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topTracks.map((track) => (
                        <tr key={track.rank} className="border-b border-gray-100 last:border-0">
                          <td className="py-3 text-sm font-medium text-gray-500">{track.rank}</td>
                          <td className="py-3 text-sm font-medium">{track.title}</td>
                          <td className="py-3 text-sm text-gray-600">{track.artist}</td>
                          <td className="py-3 text-sm text-right text-gray-400 italic">{track.streams}</td>
                          <td className="py-3 text-sm font-medium text-right text-gray-400 italic">{track.revenue}</td>
                          <td className="py-3 text-center">
                            <button
                              onClick={() => setShowDemo(true)}
                              className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full hover:bg-purple-200"
                            >
                              Demo Pay
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center">
                    <PlayCircle className="h-5 w-5 text-purple-600 mr-2" />
                    Demo Payment
                  </h2>
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">No Wallet Needed</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Try a simulated royalty payment without connecting a wallet.
                </p>
                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">MIDNIGHT DRIVE</span>
                    <span className="text-sm font-bold text-purple-600">$12,450.00</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">Jay Rock • 3 recipients</div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>50% Artist</span>
                    <span>25% Producer</span>
                    <span>25% Label</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowDemo(true)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Run Demo Payment
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Recent Transactions (Demo)</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Filter</button>
                  <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Export</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-600 border-b border-gray-200">
                      <th className="pb-3 font-medium">Track</th>
                      <th className="pb-3 font-medium">Artist</th>
                      <th className="pb-3 font-medium">Label</th>
                      <th className="pb-3 font-medium text-right">Amount</th>
                      <th className="pb-3 font-medium text-center">Status</th>
                      <th className="pb-3 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 text-sm font-medium">{item.track}</td>
                        <td className="py-3 text-sm text-gray-600">{item.artist}</td>
                        <td className="py-3 text-sm text-gray-600">{item.label}</td>
                        <td className="py-3 text-sm font-medium text-right text-gray-400 italic">{item.amount}</td>
                        <td className="py-3 text-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'completed' ? 'bg-green-100 text-green-600' :
                            item.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {item.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {item.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                            {item.status === 'flagged' && <XCircle className="h-3 w-3 mr-1" />}
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-500">{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Statements Tab */}
        {activeTab === 'statements' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-purple-600" />
              Uploaded Statements
            </h2>
            <div className="text-center py-12 text-gray-500">
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="mb-2">No statements uploaded yet</p>
              <p className="text-sm text-gray-400">Upload your first PRO statement to verify splits</p>
              <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Upload Statement
              </button>
            </div>
          </div>
        )}

        {/* Status Bar */}
        <div className="mt-6 flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium">SoundProtocol Verification</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Awaiting integration</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">connect your catalog</span>
            </div>
          </div>
          <Link
            href="/royalty-finder"
            className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center"
          >
            Check Missing Royalties →
          </Link>
        </div>
      </main>

      {/* Demo Payment Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-1"
            >
              <XCircle className="h-6 w-6" />
            </button>
            <DemoRoyaltyPayment
              track={demoTrack}
              onComplete={() => {
                setTimeout(() => setShowDemo(false), 3000);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}