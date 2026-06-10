/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // "Morning light" palette: a soft green-tinted ground with one deep
        // forest-night passage. Fern green is the product acting; dawn amber
        // is a sale closing.
        mist: {
          DEFAULT: '#F2F6F3',
          raised: '#E7EEE9',
        },
        slate: {
          DEFAULT: '#1B2620',
          light: '#49584F',
          // Quietest text step that still clears 4.5:1 on mist.
          faint: '#58685E',
        },
        line: '#DCE6DF',
        // Fern means Mira (and the product) is acting: her chat bubbles,
        // her ledger lines, every button and interactive control.
        fern: {
          DEFAULT: '#177E54',
          deep: '#11603F',
          // Legible step for text/icons on the midnight surfaces.
          bright: '#8BD9B3',
          // Wash for chips, icon stages, and gradient starts.
          tint: '#E4F2EA',
        },
        // Dawn means money: the cart confirmation, the Paid ledger line,
        // the "Most popular" tag. Never a button color.
        dawn: {
          DEFAULT: '#A35F0C',
          // Legible step on the midnight surfaces.
          bright: '#F0B254',
          // Wash for the cart-confirmed chip and gradient ends.
          tint: '#FBF1E0',
        },
        // The one dark passage: night-shift ledger and footer.
        midnight: {
          DEFAULT: '#0E1E17',
          raised: '#162C22',
          line: '#264436',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Avenir', 'sans-serif'],
        body: ['Figtree', 'system-ui', 'sans-serif'],
        mono: ['"Spline Sans Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        // Two-layer soft elevation: a hairline lift plus an ambient pool.
        soft: '0 1px 2px rgba(27, 38, 32, 0.05), 0 10px 30px -12px rgba(27, 38, 32, 0.14)',
        // The raised step for the hero demo and the highlighted plan.
        lifted:
          '0 2px 4px rgba(27, 38, 32, 0.06), 0 24px 56px -20px rgba(27, 38, 32, 0.22)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
