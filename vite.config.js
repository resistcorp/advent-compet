import { sveltekit } from '@sveltejs/kit/vite';

const config = {
    plugins: [sveltekit()],
    resolve: {
        alias: {
            'node-fetch': 'isomorphic-fetch',
        },
    }
};

export default config;