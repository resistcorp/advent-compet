export const get = () =>{
	let users = [
		{ name : "Boris"},
		{ name : "Yann"},
		{ name : "Lous"},
		{ name : "Tristan"},
	];
//TODO : compile from results.csv
	return {
		status : 200,
		body: {
			users
		}
	};
};