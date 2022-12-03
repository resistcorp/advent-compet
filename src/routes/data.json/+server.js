import {data} from "$lib/stats.js"

export const get = async({params}) =>{
	let stats = await data();

	return {
		status : 200,
		body: {
			stats
		}
	};
};