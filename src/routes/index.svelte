<svelte:head>
	<title>Advent of Code -- racers</title>
</svelte:head>
<script context="module">
	export async function load({ fetch }){
		const req = await fetch("stats.json");
		let stats = await req.json();
		let {years, data, users} = stats.stats;
		let year = years.sort().pop();
		return {
			props : {latestYear : data[year],
							 year, users}
		}
	}
</script>
<script>
	import StatTable from "$lib/StatTable.svelte"
	export let latestYear;
	export let year;
	export let users;
</script>
<h1>La compet' de Yann et Boris sur <a href="https://adventofcode.com/">Advent Of Code</a></h1>
<StatTable header="les dernières stats : {year}" dataThatYear={latestYear} {users}/>
<a href="/stats">→ toutes stats</a><br>
<a href="/rules">les règles</a><br>
<a href="/users">les utilisateurs</a><br>
🚧

