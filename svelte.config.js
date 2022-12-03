import adapter from '@sveltejs/adapter-node';
import fs from "fs/promises";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({out : "build"}),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		files: {
			assets: 'static',
		},
		ssr : false
	}
};

// function myadapter(){
// 	let node_adapter = adapter({out : "build"});
// 	return {
// 		name: 'simple node',

// 		async adapt({ utils, config }) {
// 			await node_adapter.adapt({ utils, config });
// 			await fs.copyFile("app.yaml", "build/app.yaml");
// 			await fs.copyFile("built-package.json", "build/package.json");
// 		}
// 	};
// }

export default config;
