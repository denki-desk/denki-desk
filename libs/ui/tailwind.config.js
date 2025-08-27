const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        transparent: 'transparent',

        border: 'rgba(var(--border), <alpha-value>)',
        input: 'rgba(var(--input), <alpha-value>)',
        ring: 'rgba(var(--ring), <alpha-value>)',
        background: 'rgba(var(--background), <alpha-value>)',
        foreground: 'rgba(var(--foreground), <alpha-value>)',
        primary: {
          DEFAULT: 'rgba(var(--primary), <alpha-value>)',
          foreground: 'rgba(var(--primary-foreground), <alpha-value>)',
        },
        success: {
          DEFAULT: 'rgba(var(--success), <alpha-value>)',
          foreground: 'rgba(var(--success-foreground), <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgba(var(--destructive), <alpha-value>)',
          foreground: 'rgba(var(--destructive-foreground), <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgba(var(--muted), <alpha-value>)',
          foreground: 'rgba(var(--muted-foreground), <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgba(var(--accent), <alpha-value>)',
          foreground: 'rgba(var(--accent-foreground), <alpha-value>)',
        },
        popover: {
          DEFAULT: 'rgba(var(--popover), <alpha-value>)',
          foreground: 'rgba(var(--popover-foreground), <alpha-value>)',
        },
        card: {
          DEFAULT: 'rgba(var(--card), <alpha-value>)',
          foreground: 'rgba(var(--card-foreground), <alpha-value>)',
        },
        sidebar: {
          DEFAULT: 'rgba(var(--sidebar-background), <alpha-value>)',
          foreground: 'rgba(var(--sidebar-foreground), <alpha-value>)',
          primary: 'rgba(var(--sidebar-primary), <alpha-value>)',
          'primary-foreground':
            'rgba(var(--sidebar-primary-foreground), <alpha-value>)',
          accent: 'rgba(var(--sidebar-accent), <alpha-value>)',
          'accent-foreground':
            'rgba(var(--sidebar-accent-foreground), <alpha-value>)',
          border: 'rgba(var(--sidebar-border), <alpha-value>)',
          ring: 'rgba(var(--sidebar-ring), <alpha-value>)',
        },
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
      },
      borderColor: {
        DEFAULT: 'rgba(var(--border), <alpha-value>)',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ['Calibre', ...fontFamily.sans],
      },
      fontSize: {
        xl: '28px',
        lg: '22px',
        md: '20px',
        base: '18px',
        sm: '16px',
        xs: '14px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
