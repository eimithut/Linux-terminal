import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // Cast process to any to avoid "Property 'cwd' does not exist on type 'Process'" error
  // which can occur if node types are missing or conflicting in the TS context.
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Stringify the API key to ensure it is embedded as a string.
      // IMPORTANT: Fallback to '' if undefined, otherwise the replacement is skipped 
      // and the browser crashes on "process is not defined".
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    }
  };
});