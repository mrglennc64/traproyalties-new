"use client";

import { useState } from 'react';
import { 
  Upload,
  Search,
  Music,
  Users,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  Download,
  FileText,
  Shield,
  Loader2,
  XCircle,
  Menu,
  X,
  Waves
} from 'lucide-react';
import Link from 'next/link';

interface Track {
  title: string;
  artist: string;
  isrc?: string;
  writers?: string[];
  publishers?: string[];
}

interface AuditIssue {
  type: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  pro?: string;
}

interface AuditResult {
  track: Track;
  issues: AuditIssue[];
  found_in: {
    ascap: boolean;
    bmi: boolean;
    socan: boolean;
    prs: boolean;
  };
}

export default function FreeAuditPage() {
  const [step, setStep] = useState<'upload' | 'scanning' | 'results'>('upload');
  const [uploadType, setUploadType] = useState<'label' | 'artist'>('label');
  const [catalog, setCatalog] = useState<Track[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simulate parsing CSV
    setStep('scanning');
    
    // Mock catalog data
    const mockCatalog: Track[] = [
      { title: 'MIDNIGHT DRIVE', artist: 'Jay Rock', isrc: 'US-TDE-24-00123' },
      { title: 'VICE CITY', artist: 'Jay Rock', isrc: 'US-TDE-24-00124' },
      { title: 'WEST COAST', artist: 'Schoolboy Q', isrc: 'US-TDE-24-00125' },
      { title: 'ELEMENT.', artist: 'Jay Rock', isrc: 'US-TDE-24-00126' },
      { title: 'BLOW FOR BLOW', artist: 'Schoolboy Q', isrc: 'US-TDE-24-00127' }
    ];
    
    setCatalog(mockCatalog);
    
    // Simulate scanning progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setScanProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        generateMockResults(mockCatalog);
      }
    }, 300);
  };

  const generateMockResults = (tracks: Track[]) => {
    const results = {
      tracks_scanned: tracks.length,
      issues_found: 7,
      estimated_missing: 12450,
      detailed_results: tracks.map(track => ({
        track,
        issues: generateMockIssues(track),
        found_in: {
          ascap: Math.random() > 0.3,
          bmi: Math.random() > 0.3,
          socan: Math.random() > 0.5,
          prs: Math.random() > 0.6
        }
      }))
    };
    
    setScanResults(results);
    setStep('results');
  };

  const generateMockIssues = (track: Track): AuditIssue[] => {
    const issues: AuditIssue[] = [];
    
    if (track.title === 'MIDNIGHT DRIVE') {
      issues.push({
        type: 'missing_pro',
        pro: 'BMI',
        message: 'Track missing from BMI database',
        severity: 'high'
      });
      issues.push({
        type: 'split_error',
        message: 'Split mismatch: Publisher share missing',
        severity: 'medium'
      });
    } else if (track.title === 'VICE CITY') {
      issues.push({
        type: 'missing_pro',
        pro: 'ASCAP',
        message: 'Track missing from ASCAP',
        severity: 'high'
      });
    } else if (track.title === 'WEST COAST') {
      issues.push({
        type: 'missing_pro',
        pro: 'SOCAN',
        message: 'Track missing from SOCAN (Canadian territory)',
        severity: 'medium'
      });
    } else {
      issues.push({
        type: 'registration_gap',
        message: 'Not registered with all major PROs',
        severity: 'low'
      });
    }
    
    return issues;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
              <Link href="/free-audit" className="text-purple-600 font-medium">Free Audit</Link>
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
                <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link href="/free-audit" className="text-purple-600 font-medium">Free Audit</Link>
                <Link href="/founding-member" className="text-gray-600 hover:text-gray-900">Founding Member</Link>
                <Link href="/label" className="text-gray-600 hover:text-gray-900">Label Portal</Link>
                <div className="pt-4 flex flex-col space-y-3">
                  <Link href="/label" className="px-4 py-2 text-center text-gray-600 hover:text-gray-900">
                    Sign In
                  </Link>
                  <Link
                    href="/free-audit"
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

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free Catalog Audit
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scan ASCAP, BMI, SOCAN, and PRS to discover unclaimed royalties and split errors
          </p>
        </div>

        {/* Audit Tool */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            {/* Tabs */}
            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => setUploadType('label')}
                className={`flex-1 py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all ${
                  uploadType === 'label'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>I'm a Label</span>
              </button>
              <button
                onClick={() => setUploadType('artist')}
                className={`flex-1 py-4 rounded-xl font-medium flex items-center justify-center space-x-2 ${
                  uploadType === 'artist'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Music className="h-5 w-5" />
                <span>I'm an Artist</span>
              </button>
            </div>

            {/* Step 1: Upload */}
            {step === 'upload' && (
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 mb-6 hover:border-purple-500 transition-colors cursor-pointer">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">
                    {uploadType === 'label' 
                      ? 'Upload your catalog (CSV)'
                      : 'Upload your tracks (CSV)'}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Include ISRC, title, artist, writers if available
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 cursor-pointer inline-block"
                  >
                    Choose File
                  </label>
                </div>
                
                <p className="text-sm text-gray-500">
                  Or try with a{' '}
                  <button 
                    onClick={() => {
                      setCatalog([
                        { title: 'MIDNIGHT DRIVE', artist: 'Jay Rock' },
                        { title: 'VICE CITY', artist: 'Jay Rock' }
                      ]);
                      setStep('scanning');
                      let progress = 0;
                      const interval = setInterval(() => {
                        progress += 10;
                        setScanProgress(progress);
                        if (progress >= 100) {
                          clearInterval(interval);
                          generateMockResults(catalog);
                        }
                      }, 300);
                    }}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    sample catalog
                  </button>
                </p>
              </div>
            )}

            {/* Step 2: Scanning */}
            {step === 'scanning' && (
              <div className="text-center py-12">
                <div className="relative mb-8 w-32 h-32 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-purple-600 transition-all duration-300"
                    style={{ 
                      clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                      transform: `rotate(${scanProgress * 3.6}deg)`
                    }}
                  ></div>
                  <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-purple-600">
                    {scanProgress}%
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">Scanning PRO Databases</h3>
                <p className="text-gray-500 mb-6">Checking {catalog.length} tracks across ASCAP, BMI, SOCAN, PRS...</p>
                
                <div className="space-y-3 text-left max-w-md mx-auto">
                  <div className="flex items-center justify-between">
                    <span>ASCAP Repertory</span>
                    {scanProgress > 30 ? (
                      <span className="text-green-600 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" /> Complete
                      </span>
                    ) : (
                      <span className="text-yellow-600 flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> Scanning
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>BMI Repertoire</span>
                    {scanProgress > 60 ? (
                      <span className="text-green-600 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" /> Complete
                      </span>
                    ) : (
                      <span className="text-yellow-600 flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> Scanning
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SOCAN Database</span>
                    {scanProgress > 80 ? (
                      <span className="text-green-600 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" /> Complete
                      </span>
                    ) : (
                      <span className="text-yellow-600 flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> Scanning
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>PRS Works Search</span>
                    {scanProgress > 90 ? (
                      <span className="text-green-600 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" /> Complete
                      </span>
                    ) : (
                      <span className="text-yellow-600 flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> Scanning
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Results */}
            {step === 'results' && scanResults && (
              <div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-8 w-8 text-green-600" />
                      <h3 className="text-2xl font-bold text-green-800">
                        {formatCurrency(scanResults.estimated_missing)} Found
                      </h3>
                    </div>
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      Download Report
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{scanResults.tracks_scanned}</p>
                      <p className="text-sm text-gray-600">Tracks Scanned</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">{scanResults.issues_found}</p>
                      <p className="text-sm text-gray-600">Issues Found</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {scanResults.detailed_results.filter((r: any) => !r.found_in.ascap).length}
                      </p>
                      <p className="text-sm text-gray-600">Missing from ASCAP</p>
                    </div>
                  </div>
                </div>

                <h4 className="font-semibold mb-4">Detailed Findings</h4>
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {scanResults.detailed_results.map((result: any, idx: number) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-gray-900">{result.track.title}</p>
                          <p className="text-sm text-gray-500">{result.track.artist}</p>
                        </div>
                        <span className="text-xs text-gray-400">{result.track.isrc || 'No ISRC'}</span>
                      </div>

                      {/* PRO Status */}
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        <div className={`text-xs p-1 rounded text-center ${result.found_in.ascap ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          ASCAP {result.found_in.ascap ? '✓' : '✗'}
                        </div>
                        <div className={`text-xs p-1 rounded text-center ${result.found_in.bmi ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          BMI {result.found_in.bmi ? '✓' : '✗'}
                        </div>
                        <div className={`text-xs p-1 rounded text-center ${result.found_in.socan ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          SOCAN {result.found_in.socan ? '✓' : '✗'}
                        </div>
                        <div className={`text-xs p-1 rounded text-center ${result.found_in.prs ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          PRS {result.found_in.prs ? '✓' : '✗'}
                        </div>
                      </div>

                      {/* Issues */}
                      {result.issues.length > 0 && (
                        <div className="space-y-2">
                          {result.issues.map((issue: AuditIssue, i: number) => (
                            <div key={i} className={`text-sm p-2 rounded flex items-start space-x-2 ${
                              issue.severity === 'high' ? 'bg-red-50' :
                              issue.severity === 'medium' ? 'bg-yellow-50' : 'bg-blue-50'
                            }`}>
                              {issue.severity === 'high' && <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />}
                              {issue.severity === 'medium' && <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />}
                              {issue.severity === 'low' && <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />}
                              <span className="text-gray-700">{issue.message}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep('upload')}
                    className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50"
                  >
                    Scan Another Catalog
                  </button>
                  <Link
                    href="/founding-member"
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium text-center hover:shadow-lg transition-all"
                  >
                    Join Founding Member
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">1. Upload Your Catalog</h3>
              <p className="text-gray-600 text-sm">Provide a CSV with your tracks (ISRC, title, artist)</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">2. We Scan PROs</h3>
              <p className="text-gray-600 text-sm">Our system checks ASCAP, BMI, SOCAN, and PRS databases</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">3. Get Your Report</h3>
              <p className="text-gray-600 text-sm">Receive detailed findings with estimated missing royalties</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for info icon
function Info(props: any) {
  return <AlertCircle {...props} />;
}