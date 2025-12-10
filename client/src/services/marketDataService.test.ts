import { marketDataService } from './marketDataService';

describe('marketDataService (dummy)', () => {
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
    const profile = await marketDataService.getProfile('MSFT');
    expect(profile.symbol).toBe('MSFT');
    expect(profile.name).toContain('Microsoft');
  });

  it('getPriceHistory returns series for a known symbol', async () => {
    const history = await marketDataService.getPriceHistory('SPY');
    expect(Array.isArray(history)).toBe(true);
    expect(history.length).toBeGreaterThan(0);
    expect(history[0]).toHaveProperty('close');
  });

  it('throws for unknown symbol', async () => {
    await expect(marketDataService.getQuote('XXXX')).rejects.toThrow(
      /Quote not found/
    );
  });
});

