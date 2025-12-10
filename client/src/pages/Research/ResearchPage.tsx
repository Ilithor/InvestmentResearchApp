import { useTheme } from '@/context/ThemeContext';

const ResearchPage = () => {
  const { getClassName } = useTheme();
  const pageClassName = getClassName('research-page');

  return (
    <section className={pageClassName}>
      <h1>Research</h1>
      <p>
        Deep dives, screeners, and signals will appear here as features land.
      </p>
    </section>
  );
};

export { ResearchPage };
