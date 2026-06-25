/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

// getViteConfig pulls in astro.config.mjs (incl. the React integration), so the
// existing .tsx component tests keep their JSX transform. Test + coverage
// settings are carried over verbatim from the former vite.config.ts.
// ponytail: as any — getViteConfig's return type doesn't expose `test` in Astro 7; vitest triple-slash ref doesn't augment it
export default getViteConfig({
   
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
      exclude: [
        'node_modules/**',
        'src/test/**',
        'src/vite-env.d.ts',
        '*.config.*',
        'dist/**',
        '.astro/**',
      ],
    },
  },
} as any);
