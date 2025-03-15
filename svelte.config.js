import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  // Add shadcn-svelte custom elements
  kit: {
    alias: {
      $lib: './src/lib',
      $components: './src/components'
    }
  }
};
