export interface Contract {
  id: string;
  title: string;
  parties: Party[];
  works: WorkReference[];
  clauses: Clause[];
  territory: Territory[];
  advance?: Advance;
  recoupmentRate: number;
  ipfsHash: string;
  onChainHash: string;
  status: 'draft' | 'active' | 'disputed' | 'completed';
}

export interface Work {
  id: string;
  isrc: string;
  iswc?: string;
  title: string;
  artists: Artist[];
  producers: Producer[];
  publishers: Publisher[];
  splits: RoyaltySplit[];
  metadata: WorkMetadata;
}

export interface RoyaltySplit {
  partyId: string;
  role: 'artist' | 'producer' | 'label' | 'publisher';
  percentage: number;
  territory?: Territory[];
  conditions?: SplitCondition[];
}

export interface Advance {
  amount: number;
  currency: string;
  date: Date;
  recouped: number;
  remaining: number;
  recoupmentRate: number; // percentage of royalties withheld
}

export interface Dispute {
  id: string;
  workId: string;
  claimant: Party;
  respondent: Party;
  amount: number;
  evidence: Evidence[];
  status: 'open' | 'voting' | 'resolved' | 'rejected';
  votes: Vote[];
  resolution?: Resolution;
}
