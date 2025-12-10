import { useTheme } from '@/context/ThemeContext';

const HomePage = () => {
  const { getClassName } = useTheme();
  const pageClassName = getClassName('home-page');

  return (
    <section className={pageClassName}>
      <h1>Welcome</h1>
      <p>
        Start by exploring market overviews, your watchlist, or detailed
        research.
      </p>
    </section>
  );
};

export { HomePage };
