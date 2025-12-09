import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import './App.css';
import './styles/theme.css';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>Investment Research App</h1>
            <div className="card">
              <button onClick={() => setCount(count => count + 1)}>
                count is {count}
              </button>
              <p>
                Edit <code>src/App.tsx</code> and save to test HMR
              </p>
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
          </header>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export { App };
