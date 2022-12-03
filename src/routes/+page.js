
export async function load({ fetch }){
	const req = await fetch("/data.json");
	let stats = await req.json();
	let {years, data, users} = stats.stats;
	let year = years.sort().pop();
	return {latestYear : data[year],
					 year, users}
}
