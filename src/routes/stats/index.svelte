<script context="module">
	export async function load({ fetch }){
		const req = await fetch("stats.json");
		let data = await req.json();
		return {
			props : data.stats
		}
	}
</script>
<script>
	import StatTable from "$lib/StatTable.svelte"
	export let years;
	export let users;
	export let days;
	export let data;
	function adapt(list){
		return [...list].sort().reverse();
	}
</script>
list of stats
<ul>
{#each adapt(years) as year}
	<StatTable dataThatYear={data[year]} header={year} {users}/>
{/each}
</ul>