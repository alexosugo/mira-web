/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // "Morning light" palette: a soft green-tinted ground, fern green
        // where Mira is present, and a dawn-amber accent for a closing sale.
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
        // Fern means Mira (and the product) is acting: her chat bubbles, her
        // presence dot, and every button and interactive control.
        fern: {
          DEFAULT: '#177E54',
          deep: '#11603F',
          // Brighter step for legibility on the dark night-shift section.
          bright: '#8BD9B3',
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
