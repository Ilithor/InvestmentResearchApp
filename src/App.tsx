import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { Layout } from '@/components/Layout/Layout';
import { HomePage } from '@/pages/Home/HomePage';
import { WatchlistPage } from '@/pages/Watchlist/WatchlistPage';
import { ResearchPage } from '@/pages/Research/ResearchPage';
import './App.scss';
import './styles/theme.scss';
import './styles/base.scss';

const App = () => (
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/research" element={<ResearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export { App };
