import express, { type Request, type Response } from 'express';
import cors from 'cors';
import {
  dummyPriceHistory,
  dummyProfiles,
  dummyQuotes,
  dummySearchResults,
} from './data/dummyMarketData.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Search
app.get('/api/search', (req: Request, res: Response) => {
  const q = String(req.query.q || '').toLowerCase();
  if (!q) return res.json([]);
  const results = dummySearchResults.filter(
    asset =>
      asset.symbol.toLowerCase().includes(q) ||
      asset.name.toLowerCase().includes(q)
  );
  res.json(results);
});

// Quote
app.get('/api/quote/:symbol', (req: Request, res: Response) => {
  const symbol = String(req.params.symbol || '').toUpperCase();
  const quote = dummyQuotes[symbol];
  if (!quote) return res.status(404).json({ error: 'Quote not found' });
  res.json(quote);
});

// Profile
app.get('/api/profile/:symbol', (req: Request, res: Response) => {
  const symbol = String(req.params.symbol || '').toUpperCase();
  const profile = dummyProfiles[symbol];
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json(profile);
});

// Price history
app.get('/api/history/:symbol', (req: Request, res: Response) => {
  const symbol = String(req.params.symbol || '').toUpperCase();
  const history = dummyPriceHistory[symbol];
  if (!history) return res.status(404).json({ error: 'Price history not found' });
  res.json(history);
});

app.listen(port, () => {
  console.log(`Dummy market data server listening on http://localhost:${port}`);
});

