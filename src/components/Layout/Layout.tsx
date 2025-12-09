import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import './Layout.css';

const Layout = () => {
  const { mode, toggleMode, getClassName } = useTheme();
  const layoutClassName = getClassName('layout');
  const headerClassName = getClassName('layout__header');
  const navClassName = getClassName('layout__nav');
  const mainClassName = getClassName('layout__main');
  const toggleClassName = getClassName('layout__theme-toggle');

  return (
    <div className={layoutClassName}>
      <header className={headerClassName}>
        <div className="layout__brand">
          <span className="layout__title">Investment Research App</span>
        </div>
        <nav className={navClassName}>
          <NavLink to="/" className="layout__link">
            Home
          </NavLink>
          <NavLink to="/watchlist" className="layout__link">
            Watchlist
          </NavLink>
          <NavLink to="/research" className="layout__link">
            Research
          </NavLink>
        </nav>
        <button type="button" className={toggleClassName} onClick={toggleMode}>
          {mode === 'light' ? 'Dark' : 'Light'} mode
        </button>
      </header>
      <main className={mainClassName}>
        <Outlet />
      </main>
    </div>
  );
};

export { Layout };
