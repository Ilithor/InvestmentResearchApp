// Make this file a module so global augmentation is allowed.
export {};

// Access Vite env via a global bridge set in the browser entrypoint (main.tsx).
declare global {
  // Exposed by main.tsx in Vite builds; absent in tests/Node.
  // eslint-disable-next-line no-var
  var __VITE_ENV__: ImportMetaEnv | undefined;
}

const getViteEnv = (): Record<string, string> | undefined => {
  try {
    return typeof globalThis !== 'undefined'
      ? globalThis.__VITE_ENV__
      : undefined;
  } catch {
    return undefined;
  }
};

const viteEnv = getViteEnv();

const nodeEnv =
  typeof process !== 'undefined' && process.env
    ? (process.env as Record<string, string | undefined>)
    : undefined;

export const API_BASE_URL =
  (viteEnv && viteEnv.VITE_API_BASE_URL) ||
  (nodeEnv && nodeEnv.VITE_API_BASE_URL) ||
  'http://localhost:3001';
