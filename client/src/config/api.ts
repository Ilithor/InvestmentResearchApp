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

export const API_BASE_URL =
  (viteEnv && viteEnv.VITE_API_BASE_URL) ||
  process.env.VITE_API_BASE_URL ||
  'http://localhost:3001';
