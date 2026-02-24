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



