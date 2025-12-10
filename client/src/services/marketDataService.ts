import { API_BASE_URL } from '@/config/api';
import {
  AssetProfile,
  AssetQuote,
  AssetSearchResult,
  PricePoint,
} from '@/types/market';

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
};

export const marketDataService = {
  async searchAssets(query: string): Promise<AssetSearchResult[]> {
    if (!query.trim()) return [];
    const params = new URLSearchParams({ q: query });
    return request<AssetSearchResult[]>(`/api/search?${params.toString()}`);
  },

  async getQuote(symbol: string): Promise<AssetQuote> {
    return request<AssetQuote>(`/api/quote/${encodeURIComponent(symbol)}`);
  },

  async getProfile(symbol: string): Promise<AssetProfile> {
    return request<AssetProfile>(`/api/profile/${encodeURIComponent(symbol)}`);
  },

  async getPriceHistory(symbol: string): Promise<PricePoint[]> {
    return request<PricePoint[]>(`/api/history/${encodeURIComponent(symbol)}`);
  },
};
