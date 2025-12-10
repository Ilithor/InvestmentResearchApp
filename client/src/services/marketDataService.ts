import {
  AssetProfile,
  AssetQuote,
  AssetSearchResult,
  PricePoint,
} from '@/types/market';
import {
  dummyPriceHistory,
  dummyProfiles,
  dummyQuotes,
  dummySearchResults,
} from './dummyMarketData';

const networkDelay = (ms = 120) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Dummy market data service.
 *
 * Replace implementations here with real API calls later.
 * Keep the function signatures stable to minimize refactors.
 */
export const marketDataService = {
  async searchAssets(query: string): Promise<AssetSearchResult[]> {
    await networkDelay();
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return dummySearchResults.filter(
      asset =>
        asset.symbol.toLowerCase().includes(q) ||
        asset.name.toLowerCase().includes(q)
    );
  },

  async getQuote(symbol: string): Promise<AssetQuote> {
    await networkDelay();
    const quote = dummyQuotes[symbol.toUpperCase()];
    if (!quote) {
      throw new Error(`Quote not found for symbol: ${symbol}`);
    }
    return quote;
  },

  async getProfile(symbol: string): Promise<AssetProfile> {
    await networkDelay();
    const profile = dummyProfiles[symbol.toUpperCase()];
    if (!profile) {
      throw new Error(`Profile not found for symbol: ${symbol}`);
    }
    return profile;
  },

  async getPriceHistory(symbol: string): Promise<PricePoint[]> {
    await networkDelay();
    const prices = dummyPriceHistory[symbol.toUpperCase()];
    if (!prices) {
      throw new Error(`Price history not found for symbol: ${symbol}`);
    }
    return prices;
  },
};

