import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.scss';

declare global {
  // eslint-disable-next-line no-var
  var __VITE_ENV__: ImportMetaEnv | undefined;
}

// Bridge Vite env to a global so non-Vite contexts (Jest/Node) can avoid parsing import.meta.
globalThis.__VITE_ENV__ = import.meta.env;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
