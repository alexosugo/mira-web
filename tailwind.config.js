/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // "Morning light" palette: a soft green-tinted ground, fern green
        // where Sellogram is acting, and a dawn-amber accent for a closing sale.
        paper: {
          DEFAULT: '#F2F6F3',
          raised: '#E7EEE9',
        },
        ink: {
          DEFAULT: '#1B2620',
          light: '#49584F',
          // Quietest text step that still clears 4.5:1 on paper.
          faint: '#58685E',
        },
        line: '#DCE6DF',
        cobalt: {
          DEFAULT: '#0D5DA8',
          deep: '#09477F',
        },
        // Fern means Sellogram is acting: product replies, presence, success,
        // and every primary button and interactive control. The lime default
        // is a fill colour only and always carries ink text, never paper.
        fern: {
          DEFAULT: '#9EEB47',
          // Text, icons, focus rings and hover fills on light surfaces, where
          // the lime default sits at 1.3:1 against paper.
          deep: '#44780C',
          // Text on the dark night-shift section and footer.
          bright: '#B5F27C',
        },
        // Dawn means money: the cart confirmation, the paid ledger line, the
        // highlighted-plan tag. Never a button color.
        dawn: {
          DEFAULT: '#A35F0C',
          deep: '#834B0A',
          // Brighter step for legibility on the dark night-shift section.
          bright: '#F0B254',
        },
        // On-dark equivalents for the night-shift section and footer.
        night: {
          DEFAULT: '#0E1E17',
          raised: '#162C22',
          line: '#264436',
        },
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tight: '-0.05em',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
