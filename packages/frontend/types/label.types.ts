export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: Date | string;
}
export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: Date | string;
}
export interface CatalogItem {
  id: string;
  title: string;
  artist: string;
  streams: number;
  revenue: number;
}export interface Dispute {
  id: string;
  title: string;
  message: string;
  status: 'open' | 'closed' | 'pending';
  createdAt: Date | string;
}
export interface LabelDashboard {
  id: string;
  name: string; // matches dashboard.name in the component
  metrics: {
    totalCatalogValue: number;
    currency: string;
    monthlyRoyalties: number;
  };
}
export interface RiskSummary {
  id: string;
  highRiskItems: number;
  mediumRiskItems: number;
  lowRiskItems: number;
  totalAtRisk: number;
  lastUpdated: Date | string;
  notes?: string;
}
export interface Settlement {
  id: string;
  period: string;            // e.g. "Q1 2025"
  amount: number;            // settlement amount
  status: 'paid' | 'pending' | 'overdue';
  date: Date | string;       // settlement date
}




