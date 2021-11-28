import adapter from '@sveltejs/adapter-node';
import fs from "fs/promises";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: myadapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

function myadapter(){
	let node_adapter = adapter({out : "build"});
	return {
		name: '@boris/gcloud',

		async adapt({ utils, config }) {
			await node_adapter.adapt({ utils, config });
			await fs.copyFile("app.yaml", "build/app.yaml");
			await fs.copyFile("built-package.json", "build/package.json");
		}
	};
}

export default config;
