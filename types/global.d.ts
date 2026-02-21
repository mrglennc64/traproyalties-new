// Add Evidence interface
interface Evidence {
  id: string;
  type: 'contract' | 'statement' | 'email' | 'screenshot' | 'other';
  title: string;
  description: string;
  url?: string;
  uploadedAt: Date;
  uploadedBy: string;
  verified: boolean;
}

// Add Vote interface
interface Vote {
  id: string;
  voterId: string;
  voterName: string;
  vote: 'for' | 'against' | 'abstain';
  weight: number;
  comment?: string;
  timestamp: Date;
}

// Add Resolution interface
interface Resolution {
  id: string;
  type: 'settlement' | 'arbitration' | 'court' | 'dismissed';
  decision: string;
  amount?: number;
  notes: string;
  resolvedAt: Date;
  resolvedBy: string;
}

// Add SplitCondition interface
interface SplitCondition {
  id: string;
  type: 'time' | 'sales' | 'territory' | 'platform' | 'custom';
  operator: 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'contains';
  value: string | number;
  description?: string;
}

// Add Advance interface
interface Advance {
  id: string;
  amount: number;
  currency: string;
  recoupable: boolean;
  recoupedAmount: number;
  dateIssued: Date;
  dateRecouped?: Date;
  notes?: string;
}

// WorkMetadata interface
interface WorkMetadata {
  id: string;
  title: string;
  isrc?: string;
  iswc?: string;
  duration?: number;
  language?: string;
  genre?: string;
  subGenre?: string;
  releaseDate?: Date;
  recordingLocation?: string;
  masterOwner?: string;
  publishingAdmin?: string;
  label?: string;
  catalogNumber?: string;
  explicit?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Artist interface
interface Artist {
  id: string;
  name: string;
  ipi?: string;
  pro?: string;
  role?: string;
}

// Producer interface
interface Producer {
  id: string;
  name: string;
  ipi?: string;
  pro?: string;
}

// Publisher interface
interface Publisher {
  id: string;
  name: string;
  ipi?: string;
  pro?: string;
}

// RoyaltySplit interface
interface RoyaltySplit {
  id: string;
  recipientId: string;
  recipientName: string;
  percentage: number;
  role: string;
  verified: boolean;
}

// Party interface
interface Party {
  id: string;
  name: string;
  role: string;
  percentage?: number;
  ipi?: string;
  pro?: string;
}

// WorkReference interface
interface WorkReference {
  id: string;
  title: string;
  isrc?: string;
  iswc?: string;
}

// Clause interface
interface Clause {
  id: string;
  type: string;
  description: string;
  terms: string;
}

// Territory interface
interface Territory {
  id: string;
  name: string;
  code: string;
  royaltyRate: number;
  isActive: boolean;
}

// Recipient interface
interface Recipient {
  id: string;
  name: string;
  address: string;
  percentage: number;
  amount: number;
  paid: boolean;
}

// LabelMetrics interface
interface LabelMetrics {
  totalTracks: number;
  totalArtists: number;
  totalProducers: number;
  unreconciledSplits: number;
  territories: Territory[];
}

// RiskSummary interface
interface RiskSummary {
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  totalAmount: number;
}

// SplitVerification interface
interface SplitVerification {
  id: string;
  trackId: string;
  verified: boolean;
  verifiedAt: Date;
  proofHash?: string;
}

// Payment interface
interface Payment {
  id: string;
  amount: number;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  transactionHash?: string;
  recipients: Recipient[];
}

// Activity interface
interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  userId: string;
}
