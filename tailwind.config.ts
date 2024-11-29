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
		  primary: 'var(--color-primary)',
		  'primary-dark': 'var(--color-primary-dark)',
		  background: 'var(--color-background)',
		  'background-dark': 'var(--color-background-dark)',
		  'background-darkest': 'var(--color-background-darkest)',
		  text: 'var(--color-text)',
		  'text-muted': 'var(--color-text-muted)',
		  border: 'var(--color-border)',
		  error: 'var(--color-error)',
		  success: 'var(--color-success)',
		  warning: 'var(--color-warning)',
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
  
  