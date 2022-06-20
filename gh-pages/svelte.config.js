import adapter from '@sveltejs/adapter-static';
import path from 'path';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    prerender: {
      default: true
    },
    vite: {
      optimizeDeps: {
        include: ['hashlru']
      },
      resolve: {
        alias: {
          '@lib': path.resolve('./src/lib')
        }
      }
    }
  },

  preprocess: [
    preprocess({
      postcss: true
    })
  ]
};

export default config;
