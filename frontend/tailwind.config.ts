import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#070A13',
        surface: '#111827',
        muted: '#1F2937',
        primary: '#3B82F6',
        accent: '#06B6D4',
        text: '#E5E7EB',
        subtle: '#9CA3AF'
      }
    }
  },
  plugins: []
};

export default config;
