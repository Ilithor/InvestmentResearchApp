// Access import.meta.env safely for non-Vite environments (e.g., Jest).
const getViteEnv = (): Record<string, string> | undefined => {
  try {
    // Avoid static reference to import.meta so CommonJS/Jest can parse this file.
    return new Function(
      'return (typeof import !== "undefined" && import.meta && import.meta.env) ? import.meta.env : undefined;'
    )() as Record<string, string> | undefined;
  } catch {
    return undefined;
  }
};

const viteEnv = getViteEnv();

export const API_BASE_URL =
  (viteEnv && viteEnv.VITE_API_BASE_URL) ||
  process.env.VITE_API_BASE_URL ||
  'http://localhost:3001';
