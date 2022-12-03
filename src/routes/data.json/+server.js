import {data} from "$lib/stats.js"

export const get = async({params}) =>{
	let stats = await data();

	return new Response(
		JSON.stringify({stats}),
		{status : 200});
};