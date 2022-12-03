export const get = () =>{
	let users = [
		{ name : "Boris"},
		{ name : "Yann"},
		{ name : "Lous"},
		{ name : "Tristan"},
	];
//TODO : compile from results.csv
	return new Response(
		JSON.stringify({users}),
    {status : 200});
};