import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [typography, forms, daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#75a1ff',
          secondary: '#caaac2',
          accent: '#ff0000',
          neutral: '#00194d',
          'base-100': '#99bbff',
        },
        dark: {
          primary: '#002c8a',
          secondary: '#55354d',
          accent: '#ff0000',
          neutral: '#00194d',
          'base-100': '#002266',
        },
      },
    ],
  },
};
