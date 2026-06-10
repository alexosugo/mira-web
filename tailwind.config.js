/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm editorial palette: paper ground, ink text, hairline rules,
        // one clay accent reserved for the moment a sale closes.
        paper: {
          DEFAULT: '#FAF7F1',
          raised: '#F3EEE4',
        },
        ink: {
          DEFAULT: '#211C15',
          light: '#5E5749',
          // Quietest text step that still clears 4.5:1 on paper.
          faint: '#6E6657',
        },
        line: '#E6DFD1',
        clay: {
          DEFAULT: '#B23E1D',
          deep: '#933312',
          // Brighter step for legibility on the dark night-shift section.
          bright: '#D96B45',
        },
        // On-dark equivalents for the night-shift section and footer.
        night: {
          DEFAULT: '#1B1712',
          raised: '#262019',
          line: '#352D23',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
