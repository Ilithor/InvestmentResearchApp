import { marketDataService } from './marketDataService';
import { API_BASE_URL } from '@/config/api';
import { Response } from 'whatwg-fetch';

const dummySearchResults = [
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'Equity', exchange: 'NASDAQ' },
];

const dummyQuotes: Record<string, unknown> = {
  AAPL: {
    symbol: 'AAPL',
    price: 188.15,
    change: -1.02,
    changePercent: -0.54,
    currency: 'USD',
    updatedAt: '2025-12-10T14:30:00Z',
  },
};

const dummyProfiles: Record<string, unknown> = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    description: 'Apple designs and sells devices and services.',
  },
};

const dummyPriceHistory: Record<string, Array<Record<string, unknown>>> = {
  AAPL: [{ date: '2025-12-09', close: 189.17 }],
};

const mockFetch = (url: string) => {
  const u = new URL(url);
  if (u.pathname === '/api/search') {
    return new Response(JSON.stringify(dummySearchResults), { status: 200 });
  }
  if (u.pathname.startsWith('/api/quote/')) {
    const symbol = u.pathname.split('/').pop() || '';
    const data = dummyQuotes[symbol];
    if (!data) return new Response('Quote not found', { status: 404 });
    return new Response(JSON.stringify(data), { status: 200 });
  }
  if (u.pathname.startsWith('/api/profile/')) {
    const symbol = u.pathname.split('/').pop() || '';
    const data = dummyProfiles[symbol];
    if (!data) return new Response('Profile not found', { status: 404 });
    return new Response(JSON.stringify(data), { status: 200 });
  }
  if (u.pathname.startsWith('/api/history/')) {
    const symbol = u.pathname.split('/').pop() || '';
    const data = dummyPriceHistory[symbol];
    if (!data) return new Response('Price history not found', { status: 404 });
    return new Response(JSON.stringify(data), { status: 200 });
  }
  return new Response('Not found', { status: 404 });
};

describe('marketDataService (dummy, via mocked fetch)', () => {
  const originalFetch = global.fetch;

  beforeAll(() => {
    expect(API_BASE_URL).toBe('http://localhost:3001');
  });

  beforeEach(() => {
    global.fetch = jest.fn(async (input: RequestInfo | URL) =>
      mockFetch(String(input))
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('searchAssets returns matches by symbol or name', async () => {
    const results = await marketDataService.searchAssets('aap');
    expect(results.some(r => r.symbol === 'AAPL')).toBe(true);
  });

  it('getQuote returns a quote for a known symbol', async () => {
    const quote = await marketDataService.getQuote('AAPL');
    expect(quote.symbol).toBe('AAPL');
    expect(typeof quote.price).toBe('number');
  });

  it('getProfile returns a profile for a known symbol', async () => {
    const profile = await marketDataService.getProfile('AAPL');
    expect(profile.symbol).toBe('AAPL');
    expect(profile.name).toContain('Apple');
  });

  it('getPriceHistory returns series for a known symbol', async () => {
    const history = await marketDataService.getPriceHistory('AAPL');
    expect(Array.isArray(history)).toBe(true);
    expect(history.length).toBeGreaterThan(0);
    expect(history[0]).toHaveProperty('close');
  });

  it('throws for unknown symbol', async () => {
    await expect(marketDataService.getQuote('XXXX')).rejects.toThrow();
  });
});
