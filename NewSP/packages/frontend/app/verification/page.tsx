"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  Download,
  Shield,
  Music,
  User,
  DollarSign,
  CreditCard,
  Info,
  ArrowRight,
  RefreshCw,
  Copy,
  Globe,
  Zap,
  Calculator,
  Fingerprint,
  Menu,
  Bell,
  Mail,
  Loader2
} from 'lucide-react';

interface Contributor {
  name: string;
  role: string;
  percentage: number;
  ipi: string;
}

export default function VerificationPage() {
  const [currentData, setCurrentData] = useState<Contributor[]>([]);
  const [errors, setErrors] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(50000);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [splitPreviewVisible, setSplitPreviewVisible] = useState(false);
  const [actionButtonsVisible, setActionButtonsVisible] = useState(false);
  const [verificationSectionVisible, setVerificationSectionVisible] = useState(false);
  const [paymentInputVisible, setPaymentInputVisible] = useState(false);
  const [paymentSectionVisible, setPaymentSectionVisible] = useState(false);
  const [step2ButtonsVisible, setStep2ButtonsVisible] = useState(false);
  const [errorPanelVisible, setErrorPanelVisible] = useState(false);
  
  const TAX_RATE = 0.25; // 25% Swedish tax withholding
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample data
  const PERFECT_SAMPLE: Contributor[] = [
    { name: "Drik Svensson", role: "Composer", percentage: 50, ipi: "00624789341" },
    { name: "Anna Deng", role: "Lyricist", percentage: 30, ipi: "00472915682" },
    { name: "Lars Johansson", role: "Producer", percentage: 20, ipi: "00836125497" }
  ];

  const ERROR_SAMPLE: Contributor[] = [
    { name: "Drik Svensson", role: "Composer", percentage: 60, ipi: "" },
    { name: "", role: "Lyricist", percentage: 25, ipi: "00472915682" },
    { name: "Lars Johansson", role: "Producer", percentage: 20, ipi: "invalid" },
    { name: "Extra", role: "Writer", percentage: 10, ipi: "" }
  ];

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateStep = (step: number) => {
    setCurrentStep(step);
  };

  const loadPerfectSample = () => {
    processData(PERFECT_SAMPLE);
    showToast('Perfect sample loaded - no issues detected');
  };

  const loadErrorSample = () => {
    processData(ERROR_SAMPLE);
    showToast('Sample with issues loaded', 'error');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    // Simulate file parsing
    setTimeout(() => {
      if (Math.random() > 0.5) {
        processData(PERFECT_SAMPLE);
      } else {
        processData(ERROR_SAMPLE);
      }
      showToast(`Loaded: ${file.name}`);
      setUploading(false);
    }, 500);
  };

  const validateData = (data: Contributor[]) => {
    const errors: any[] = [];
    let total = 0;
    
    data.forEach((item, index) => {
      total += item.percentage || 0;
      
      if (!item.name || item.name.trim() === '') {
        errors.push({ message: `Contributor ${index + 1} missing name` });
      }
      
      if (!item.ipi || item.ipi.trim() === '') {
        errors.push({ message: `${item.name || 'Contributor'} missing IPI/ISWC` });
      }
      
      if (item.percentage <= 0 || item.percentage > 100) {
        errors.push({ message: `${item.name || 'Contributor'} has invalid percentage: ${item.percentage}%` });
      }
    });
    
    if (Math.abs(total - 100) > 0.1) {
      errors.push({ message: `Total split is ${total.toFixed(1)}%, must equal 100%` });
    }
    
    return errors;
  };

  const processData = (data: Contributor[]) => {
    setCurrentData(data);
    setSplitPreviewVisible(true);
    setActionButtonsVisible(true);
    
    // Validate
    const validationErrors = validateData(data);
    setErrors(validationErrors);
    
    if (validationErrors.length > 0) {
      setErrorPanelVisible(true);
      updateStep(2); // Issues Detected
    } else {
      setErrorPanelVisible(false);
      updateStep(3); // Data Verified
      setVerificationSectionVisible(true);
      setStep2ButtonsVisible(true);
    }
  };

  const autoFixErrors = () => {
    const fixedData = currentData.map((item, i) => {
      const fixed = { ...item };
      if (!fixed.name || fixed.name === '') fixed.name = `Contributor ${i + 1}`;
      if (!fixed.ipi || fixed.ipi === 'invalid') fixed.ipi = 'Auto-generated';
      return fixed;
    });
    
    const total = fixedData.reduce((sum, item) => sum + item.percentage, 0);
    if (Math.abs(total - 100) > 0.1) {
      const factor = 100 / total;
      fixedData.forEach(item => {
        item.percentage = Math.round(item.percentage * factor * 10) / 10;
      });
    }
    
    const validationErrors = validateData(fixedData);
    setErrors(validationErrors);
    setCurrentData(fixedData);
    
    if (validationErrors.length === 0) {
      setErrorPanelVisible(false);
      showToast('✅ All issues fixed automatically');
    } else {
      showToast('⚠️ Some issues could not be auto-fixed', 'error');
    }
  };

  const startVerification = () => {
    if (errors.length > 0) {
      showToast('Please fix issues before verification', 'error');
      return;
    }
    
    setVerificationSectionVisible(true);
    setStep2ButtonsVisible(true);
    updateStep(3);
    showToast('Data verified successfully');
  };

  const showPaymentInput = () => {
    setPaymentInputVisible(true);
    setStep2ButtonsVisible(false);
  };

  const calculateAndShowPayment = () => {
    setPaymentSectionVisible(true);
    setStep4ButtonsVisible(true);
    updateStep(4);
    showToast('Payment calculated successfully');
  };

  const resetWorkflow = () => {
    setCurrentData([]);
    setErrors([]);
    setCurrentStep(1);
    setPaymentAmount(50000);
    setSplitPreviewVisible(false);
    setActionButtonsVisible(false);
    setErrorPanelVisible(false);
    setVerificationSectionVisible(false);
    setPaymentInputVisible(false);
    setPaymentSectionVisible(false);
    setStep2ButtonsVisible(false);
    setStep4ButtonsVisible(false);
    showToast('Workflow reset');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTotalPercentage = () => {
    return currentData.reduce((sum, item) => sum + item.percentage, 0);
  };

  const downloadPaymentPDF = () => {
    if (!currentData || currentData.length === 0) {
      showToast('No data to export', 'error');
      return;
    }
    showToast('Opening PDF report...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Overlay */}
      {uploading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-gray-600">Processing file...</p>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 ${
          toast.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {toast.type === 'success' ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center pb-5 mb-5 border-b border-gray-200 flex-wrap gap-5">
          <Link href="/label" className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-xl">
              S
            </div>
            <span className="text-2xl font-semibold text-gray-900">SMPT</span>
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="/" className="text-gray-600 hover:text-purple-600 font-medium text-sm">Home</Link>
            <Link href="/verification" className="text-purple-600 font-medium text-sm">Workflow</Link>
            <Link href="/pilot" className="text-gray-600 hover:text-purple-600 font-medium text-sm">Pilot</Link>
            <Link href="/faq" className="text-gray-600 hover:text-purple-600 font-medium text-sm">FAQ</Link>
          </div>
          <button className="bg-transparent border border-gray-200 px-5 py-2 rounded-full font-medium text-sm hover:border-purple-600 hover:text-purple-600 transition-colors">
            <Mail className="h-4 w-4 inline mr-2" />
            Contact
          </button>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto py-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Data Verification & Payment Workflow</h1>
          <p className="text-lg text-gray-600">Upload → Detect issues → Verify → Enter amount → Calculate payment → Download PDF</p>
        </div>

        {/* Before/After Banner */}
        <div className="grid md:grid-cols-2 gap-6 bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="border-r border-gray-200 pr-6">
            <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
              <XCircle className="h-5 w-5 mr-2" />
              Before SMPT
            </h3>
            <div className="flex items-center space-x-2 text-sm flex-wrap">
              <span className="px-3 py-1 bg-gray-100 rounded-full">Publisher</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">Issues</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="px-3 py-1 bg-gray-100 rounded-full">STIM</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="px-3 py-1 bg-gray-100 rounded-full">Payment Delay</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-600 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              With SMPT
            </h3>
            <div className="flex items-center space-x-2 text-sm flex-wrap">
              <span className="px-3 py-1 bg-gray-100 rounded-full">Publisher</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">SMPT</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="px-3 py-1 bg-gray-100 rounded-full">STIM</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Fast Payment</span>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute top-5 left-12 right-12 h-0.5 bg-gray-200" />
            
            {/* Step 1 */}
            <div className="flex flex-col items-center relative bg-gray-50 px-3 z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                currentStep >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>1</div>
              <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-purple-600' : 'text-gray-500'}`}>
                Upload Data
              </span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center relative bg-gray-50 px-3 z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                currentStep >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>2</div>
              <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-purple-600' : 'text-gray-500'}`}>
                Issues Detected
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center relative bg-gray-50 px-3 z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                currentStep >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>3</div>
              <span className={`text-sm font-medium ${currentStep >= 3 ? 'text-purple-600' : 'text-gray-500'}`}>
                Data Verified
              </span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center relative bg-gray-50 px-3 z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                currentStep >= 4 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>4</div>
              <span className={`text-sm font-medium ${currentStep >= 4 ? 'text-purple-600' : 'text-gray-500'}`}>
                Payment Ready
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-600 transition-all duration-500 rounded-full"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Work Area */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* LEFT PANEL: UPLOAD + VALIDATE */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Upload className="h-5 w-5 text-purple-600 mr-2" />
              Step 1: Upload registration data
            </h2>

            {/* Upload Area */}
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer mb-4"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-medium mb-1">Drop your split sheet here</h3>
              <p className="text-sm text-gray-500 mb-3">STIM CSV, NCB Excel, or PDF</p>
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept=".csv,.xlsx,.xls,.pdf"
                onChange={handleFileSelect}
              />
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Browse files
              </button>
            </div>

            {/* Sample Links */}
            <div className="flex justify-center space-x-4 mb-6">
              <button 
                onClick={loadPerfectSample}
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                📄 Load perfect sample
              </button>
              <button 
                onClick={loadErrorSample}
                className="text-sm text-red-600 hover:text-red-700"
              >
                ⚠️ Load test with errors
              </button>
            </div>

            {/* Error Panel */}
            {errorPanelVisible && errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center text-red-600 font-medium mb-2">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Issues Detected
                </div>
                <div className="text-sm text-red-700 mb-3 space-y-1">
                  {errors.map((error, i) => (
                    <div key={i}>• {error.message}</div>
                  ))}
                </div>
                <button 
                  onClick={autoFixErrors}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
                >
                  <Zap className="h-4 w-4 inline mr-2" />
                  Auto-Fix Issues
                </button>
              </div>
            )}

            {/* Split Preview */}
            {splitPreviewVisible && currentData.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                  <span className="font-medium">Summer Nights EP</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    errors.length === 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {errors.length === 0 ? 'Ready' : `${errors.length} issue${errors.length > 1 ? 's' : ''}`}
                  </span>
                </div>

                {currentData.map((contributor, i) => {
                  const hasError = errors.some(e => 
                    e.message.includes(contributor.name) || 
                    (e.message.includes('missing') && !contributor.name)
                  );
                  return (
                    <div key={i} className={`flex justify-between items-center py-2 ${hasError ? 'bg-red-50 -mx-4 px-4' : ''}`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center font-semibold text-purple-600">
                          {contributor.name?.[0] || '?'}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{contributor.name || 'Unknown'}</p>
                          <p className="text-xs text-gray-500">{contributor.role} · IPI: {contributor.ipi || 'Missing'}</p>
                        </div>
                      </div>
                      <span className={`font-semibold ${hasError ? 'text-red-600' : 'text-purple-600'}`}>
                        {contributor.percentage}%
                      </span>
                    </div>
                  );
                })}

                <div className="mt-4 pt-2 border-t border-gray-200 text-right">
                  <span className="font-medium">{getTotalPercentage().toFixed(1)}% total</span>
                </div>

                {/* Start Verification Button */}
                {actionButtonsVisible && errors.length === 0 && (
                  <button 
                    onClick={startVerification}
                    className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                  >
                    <Shield className="h-4 w-4 inline mr-2" />
                    Start Verification
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RIGHT PANEL: VERIFY + PAYMENT */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
              Steps 2-4: Verify & Calculate Payment
            </h2>

            {/* Verification Record */}
            {verificationSectionVisible && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-4">Verification Record</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Fingerprint className="h-4 w-4 mr-1" /> Verification ID
                    </span>
                    <span className="font-mono">QmXoy...6uco</span>
                  </div>
                  
                  <div className="bg-white p-2 rounded border border-gray-200 font-mono text-xs break-all">
                    QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> Timestamp
                    </span>
                    <span>{new Date().toISOString().replace('T', ' ').substring(0, 16)} UTC</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1 text-green-600" /> Status
                    </span>
                    <span className="text-green-600 font-medium">Verified ✓</span>
                  </div>

                  <div className="text-xs text-gray-400 pt-2 border-t border-gray-200">
                    <span>System reference: 0xAa19...B2ea4</span>
                    <button 
                      onClick={() => setShowTechDetails(!showTechDetails)}
                      className="float-right text-purple-600 hover:text-purple-700"
                    >
                      {showTechDetails ? 'Hide details ↑' : 'Show details ↓'}
                    </button>
                  </div>

                  {showTechDetails && (
                    <div className="text-xs text-gray-400 space-y-1 mt-2">
                      <div>Contract: 0xAa19bFC7Bd852efe49ef31297bB082FB044B2ea4</div>
                      <div>Network: Monad Testnet (Chain ID: 10143)</div>
                    </div>
                  )}
                </div>

                {/* Calculate Payment Button */}
                {step2ButtonsVisible && (
                  <button 
                    onClick={showPaymentInput}
                    className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                  >
                    <Calculator className="h-4 w-4 inline mr-2" />
                    Calculate Payment
                  </button>
                )}
              </div>
            )}

            {/* Payment Input Section */}
            {paymentInputVisible && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-4 flex items-center">
                  <Calculator className="h-4 w-4 text-purple-600 mr-2" />
                  Enter Payment Amount
                </h3>
                
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button 
                    onClick={calculateAndShowPayment}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                  >
                    Calculate
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  <Info className="h-3 w-3 inline mr-1" />
                  Enter any amount and we'll calculate the split with 25% Swedish tax withholding
                </p>
              </div>
            )}

            {/* Payment Summary Section */}
            {paymentSectionVisible && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-purple-900 flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payment Summary
                  </span>
                  <span className="text-2xl font-bold text-purple-700">
                    {formatCurrency(paymentAmount)}
                  </span>
                </div>

                <div className="bg-white rounded-lg p-4 space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gross Royalties</span>
                    <span className="font-medium">{formatCurrency(paymentAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Swedish Tax Withholding (25%)</span>
                    <span className="font-medium text-red-600">-{formatCurrency(paymentAmount * TAX_RATE)}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                    <span className="font-medium">Net Payment</span>
                    <span className="font-bold text-purple-600 text-lg">
                      {formatCurrency(paymentAmount * (1 - TAX_RATE))}
                    </span>
                  </div>
                </div>

                <div className="text-xs bg-red-50 text-red-700 p-2 rounded-lg flex items-center mb-4">
                  <Info className="h-3 w-3 mr-1" />
                  25% tax withholding automatically calculated for Swedish payees
                </div>

                {/* Distribution List */}
                {currentData.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-3">Distribution by Contributor</h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {currentData.map((contributor, i) => {
                        const grossShare = paymentAmount * (contributor.percentage / 100);
                        const taxShare = grossShare * TAX_RATE;
                        const netShare = grossShare - taxShare;
                        
                        return (
                          <div key={i} className="flex justify-between items-center text-sm p-2 bg-white rounded border border-gray-100">
                            <div className="flex items-center">
                              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center text-purple-700 font-semibold text-xs mr-2">
                                {contributor.name[0]}
                              </div>
                              <div>
                                <span className="font-medium">{contributor.name}</span>
                                <span className="text-xs text-gray-500 ml-2">{contributor.percentage}%</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-purple-600">{formatCurrency(netShare)}</div>
                              <div className="text-xs text-gray-400">gross: {formatCurrency(grossShare)}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Download PDF Button */}
                <button 
                  onClick={downloadPaymentPDF}
                  className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Payment Report (PDF)
                </button>
              </div>
            )}

            {/* Ready Banner */}
            {paymentSectionVisible && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-800">Payment Ready for STIM</h3>
                <p className="text-sm text-green-600">Your verified data and payment calculation are ready for submission</p>
              </div>
            )}

            {/* Reset Button */}
            {currentStep > 1 && (
              <button 
                onClick={resetWorkflow}
                className="w-full mt-4 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 flex items-center justify-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Start New Verification
              </button>
            )}
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 bg-gray-50 rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium">EU Data Compliance</span>
            </div>
            <div>
              <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium">Swedish Tax Ready</span>
            </div>
            <div>
              <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium">Pilot-Ready</span>
            </div>
            <div>
              <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium">25% Auto Withholding</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>SMPT supports data quality, payment accuracy, and operational efficiency in music rights registration.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <span>© 2026 SMPT</span>
            <span>STIM & Skatteverket Compatible</span>
            <span>Built for Swedish Publishing</span>
          </div>
        </div>
      </div>
    </div>
  );
}