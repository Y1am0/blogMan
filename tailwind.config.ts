/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
	  './pages/**/*.{ts,tsx}',
	  './components/**/*.{ts,tsx}',
	  './app/**/*.{ts,tsx}',
	  './src/**/*.{ts,tsx}',
	],
	theme: {
	  container: {
		center: true,
		padding: "2rem",
		screens: {
		  "2xl": "1400px",
		},
	  },
	  extend: {
		colors: {
		  primary: {
			DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
			dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
		  },
		  background: {
			DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
			dark: 'rgb(var(--color-background-dark) / <alpha-value>)',
			darkest: 'rgb(var(--color-background-darkest) / <alpha-value>)',
		  },
		  text: {
			DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
			muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
		  },
		  border: 'rgb(var(--color-border) / <alpha-value>)',
		  error: 'rgb(var(--color-error) / <alpha-value>)',
		  success: 'rgb(var(--color-success) / <alpha-value>)',
		  warning: 'rgb(var(--color-warning) / <alpha-value>)',
		},
		keyframes: {
		  "accordion-down": {
			from: { height: 0 },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: 0 },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }
  
  