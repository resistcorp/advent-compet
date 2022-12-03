
export async function load({ fetch }){
	const req = await fetch("users.json");
	let data = await req.json();
	let users = data.users;
	return {
		users
	}
}
