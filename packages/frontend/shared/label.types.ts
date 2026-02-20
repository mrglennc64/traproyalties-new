export interface Territory {
  id: string;
  name: string;
  code: string;
  royaltyRate: number;
  isActive: boolean;
}

export interface LabelMetrics {
  totalTracks: number;
  totalArtists: number;
  totalProducers: number;
  unreconciledSplits: number;
  territories: Territory[];
}

export interface RiskSummary {
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  totalAmount: number;
}

export interface SplitVerification {
  id: string;
  trackId: string;
  verified: boolean;
  verifiedAt: Date;
  proofHash?: string;
}