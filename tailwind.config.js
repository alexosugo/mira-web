/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // "Morning light" palette: a cool, airy ground with one deep
        // midnight passage. Dusk indigo is the product acting; dawn amber
        // is a sale closing.
        mist: {
          DEFAULT: '#F3F6FB',
          raised: '#E9EEF7',
        },
        slate: {
          DEFAULT: '#1C2433',
          light: '#4D5A70',
          // Quietest text step that still clears 4.5:1 on mist.
          faint: '#5C6A80',
        },
        line: '#DFE6F1',
        // Dusk means Mira (and the product) is acting: her chat bubbles,
        // her ledger lines, every button and interactive control.
        dusk: {
          DEFAULT: '#4757D6',
          deep: '#3848BE',
          // Legible step for text/icons on the midnight surfaces.
          bright: '#9DACF8',
          // Wash for chips, icons stages, and gradient starts.
          tint: '#E8ECFB',
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
          DEFAULT: '#10172B',
          raised: '#1A2240',
          line: '#28335C',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Avenir', 'sans-serif'],
        body: ['Figtree', 'system-ui', 'sans-serif'],
        mono: ['"Spline Sans Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        // Two-layer soft elevation: a hairline lift plus an ambient pool.
        soft: '0 1px 2px rgba(28, 36, 51, 0.05), 0 10px 30px -12px rgba(28, 36, 51, 0.14)',
        // The raised step for the hero demo and the highlighted plan.
        lifted:
          '0 2px 4px rgba(28, 36, 51, 0.06), 0 24px 56px -20px rgba(28, 36, 51, 0.22)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
