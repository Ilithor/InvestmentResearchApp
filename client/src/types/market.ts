export interface AssetSearchResult {
  symbol: string;
  name: string;
  type: 'Equity' | 'ETF' | 'Crypto' | 'Index' | 'Forex' | 'Other';
  exchange: string;
}

export interface AssetQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  updatedAt: string; // ISO timestamp
}

export interface AssetProfile {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  description: string;
}

export interface PricePoint {
  date: string; // ISO date
  close: number;
  open?: number;
  high?: number;
  low?: number;
  volume?: number;
}
