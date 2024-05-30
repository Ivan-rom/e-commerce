/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  // TODO: define color schemes
  extend: {
    colors: {
      backgroundHoverPrimary: '#e2e8f0',
    },
    transitionProperty: {
      height: 'height',
      spacing: 'margin, padding',
    },
  },
};
export const plugins = [];
