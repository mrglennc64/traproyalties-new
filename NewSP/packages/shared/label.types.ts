// Label Portal Type Definitions
export interface LabelDashboard {
  id: string;
  name: string;
  metrics: DashboardMetrics;
  catalog: CatalogSummary;
  risks: RiskSummary;
  recentActivity: Activity[];
}

export interface DashboardMetrics {
  totalCatalogValue: number;
  monthlyRoyalties: number;
  potentialOverpayments: number;
  activeDisputes: number;
  settlementTime: string;
  savedAmount: number;
  currency: string;
}

export interface CatalogSummary {
  totalTracks: number;
  totalArtists: number;
  totalProducers: number;
  unreconciledSplits: number;
  territories: Territory[];
}

export interface RiskSummary {
  highRiskItems: number;
  mediumRiskItems: number;
  lowRiskItems: number;
  totalAtRisk: number;
  risksByType: RiskByType[];
}

export interface RiskByType {
  type: 'missing_split' | 'wrong_percentage' | 'territory_error' | 'advance_mismatch';
  count: number;
  amount: number;
}

export interface CatalogItem {
  id: string;
  isrc: string;
  title: string;
  artist: string;
  releaseDate: Date;
  streams: number;
  revenue: number;
  splitConfidence: 'high' | 'medium' | 'low';
  riskFlags: RiskFlag[];
}

export interface RiskFlag {
  type: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  amount: number;
  suggestedAction: string;
}

export interface Settlement {
  id: string;
  trackId: string;
  amount: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  transactionHash?: string;
  recipients: Recipient[];
}

export interface Activity {
  id: string;
  type: 'settlement' | 'risk_detected' | 'dispute' | 'upload';
  description: string;
  timestamp: Date;
  metadata?: any;
}
