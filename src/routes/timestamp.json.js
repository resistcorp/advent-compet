import {dev} from "$app/env";
import fs from "fs/promises";


export const get = async({params}) =>{
	const path = dev ? "./static/results.csv" : "./assets/results.csv";

	let handle = await fs.open(path);
	let stats = await handle.stat();
	let stamp = stats.mtimeMs;
	handle.close()

	return {
		status : 200,
		body: {
			stamp
		}
	};
};