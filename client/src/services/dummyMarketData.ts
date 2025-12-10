import { AssetProfile, AssetQuote, AssetSearchResult, PricePoint } from '@/types/market';

// Mock search data
export const dummySearchResults: AssetSearchResult[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'Equity', exchange: 'NASDAQ' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'Equity', exchange: 'NASDAQ' },
  { symbol: 'GOOGL', name: 'Alphabet Inc. Class A', type: 'Equity', exchange: 'NASDAQ' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', type: 'Equity', exchange: 'NASDAQ' },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', type: 'ETF', exchange: 'NYSEARCA' },
];

// Mock quotes keyed by symbol
export const dummyQuotes: Record<string, AssetQuote> = {
  AAPL: {
    symbol: 'AAPL',
    price: 188.15,
    change: -1.02,
    changePercent: -0.54,
    currency: 'USD',
    updatedAt: '2025-12-10T14:30:00Z',
  },
  MSFT: {
    symbol: 'MSFT',
    price: 382.12,
    change: 2.11,
    changePercent: 0.56,
    currency: 'USD',
    updatedAt: '2025-12-10T14:30:00Z',
  },
  GOOGL: {
    symbol: 'GOOGL',
    price: 141.88,
    change: 0.37,
    changePercent: 0.26,
    currency: 'USD',
    updatedAt: '2025-12-10T14:30:00Z',
  },
  TSLA: {
    symbol: 'TSLA',
    price: 254.22,
    change: -3.44,
    changePercent: -1.34,
    currency: 'USD',
    updatedAt: '2025-12-10T14:30:00Z',
  },
  SPY: {
    symbol: 'SPY',
    price: 471.55,
    change: 1.02,
    changePercent: 0.22,
    currency: 'USD',
    updatedAt: '2025-12-10T14:30:00Z',
  },
};

// Mock profiles keyed by symbol
export const dummyProfiles: Record<string, AssetProfile> = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    description:
      'Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
  },
  MSFT: {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    industry: 'Software—Infrastructure',
    description:
      'Microsoft develops, licenses, and supports software, services, devices, and solutions worldwide.',
  },
  GOOGL: {
    symbol: 'GOOGL',
    name: 'Alphabet Inc. Class A',
    sector: 'Communication Services',
    industry: 'Internet Content & Information',
    description:
      'Alphabet operates through Google and Other Bets, offering search, ads, cloud, hardware, and other services.',
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers',
    description:
      'Tesla designs, develops, manufactures, leases, and sells electric vehicles and energy generation and storage systems.',
  },
  SPY: {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    sector: 'ETF',
    industry: 'Index Fund',
    description:
      'SPY seeks to provide investment results that, before expenses, correspond generally to the price and yield performance of the S&P 500 Index.',
  },
};

// Mock price history keyed by symbol
export const dummyPriceHistory: Record<string, PricePoint[]> = {
  AAPL: [
    { date: '2025-12-09', close: 189.17, open: 190.2, high: 191.0, low: 188.6, volume: 51234000 },
    { date: '2025-12-08', close: 190.19, open: 191.1, high: 191.8, low: 189.7, volume: 49812000 },
    { date: '2025-12-07', close: 191.02, open: 190.8, high: 192.3, low: 189.9, volume: 45555000 },
  ],
  MSFT: [
    { date: '2025-12-09', close: 380.01, open: 381.2, high: 382.9, low: 379.5, volume: 32789000 },
    { date: '2025-12-08', close: 382.12, open: 380.5, high: 383.4, low: 379.8, volume: 31145000 },
    { date: '2025-12-07', close: 379.88, open: 378.9, high: 381.0, low: 377.5, volume: 29877000 },
  ],
  GOOGL: [
    { date: '2025-12-09', close: 141.02, open: 140.8, high: 142.1, low: 140.1, volume: 22234000 },
    { date: '2025-12-08', close: 141.88, open: 141.5, high: 142.5, low: 140.9, volume: 21876000 },
    { date: '2025-12-07', close: 140.77, open: 140.2, high: 141.4, low: 139.8, volume: 20544000 },
  ],
  TSLA: [
    { date: '2025-12-09', close: 257.66, open: 259.2, high: 260.5, low: 255.8, volume: 61234000 },
    { date: '2025-12-08', close: 254.22, open: 255.5, high: 256.4, low: 253.2, volume: 59812000 },
    { date: '2025-12-07', close: 255.98, open: 254.9, high: 257.1, low: 253.7, volume: 58555000 },
  ],
  SPY: [
    { date: '2025-12-09', close: 470.1, open: 471.0, high: 472.5, low: 469.2, volume: 74450000 },
    { date: '2025-12-08', close: 471.55, open: 470.6, high: 472.8, low: 469.9, volume: 70230000 },
    { date: '2025-12-07', close: 469.88, open: 468.7, high: 470.9, low: 467.8, volume: 68320000 },
  ],
};

