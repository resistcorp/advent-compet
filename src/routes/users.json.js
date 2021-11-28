export const get = () =>{
	let users = [
		{ name : "boris"},
		{ name : "yann"},
	];

	return {
		status : 200,
		body: {
			users
		}
	};
};