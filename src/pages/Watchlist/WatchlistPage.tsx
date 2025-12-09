import { useTheme } from '@/context/ThemeContext';

const WatchlistPage = () => {
  const { getClassName } = useTheme();
  const pageClassName = getClassName('watchlist-page');

  return (
    <section className={pageClassName}>
      <h1>Watchlist</h1>
      <p>
        Track symbols you care about. We will add add/remove and sorting soon.
      </p>
    </section>
  );
};

export { WatchlistPage };
