import node from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

const config = {
  extensions: ['.svelte', '.svx'],

  // Add your Svelte configuration here
  kit: {
    adapter: node(), // Use the Node adapter
    // other options...
  },

  preprocess: [
    sveltePreprocess(),
    mdsvex({
      extension: '.svx',
    }),
  ],
};

export default config;
