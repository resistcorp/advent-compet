<script>
	async function load(){
		const req = await fetch("stats.json");
		let result = await req.json();
		years = result.stats.years;
		users = result.stats.users;
		days = result.stats.days;
		data = result.stats.data;
		return null;
	}
	let loading = load()
	import StatTable from "$lib/StatTable.svelte"
	export let years = [];
	export let users;
	export let days;
	export let data;
	let searchTerm = "";
	function adapt(list){
		return [...list].sort().reverse();
	}
	function match(year, day, ...terms){
		let year_ok = false;
		let day_ok = false;
		terms = terms.filter(s=>!!s);
		for(let term of terms){
			if(day.includes(term))
				day_ok = true;
			else if( year.includes(term) || term.includes(year))
				year_ok = true;
		}
		switch(terms.length){
			case 0 : return true;
			case 1 : return year_ok || day_ok;
			default : return year_ok && day_ok;
		};
	}
	function search(term){
		let terms = (term?.split("-") || []);
		return (year, day)=> match(year, ""+day, ...terms);
	}
</script>
list of stats <input type="text" bind:value={searchTerm} placeholder="search day or year-day" />
<ul>
{#await loading}
... loading
{:then}
	{#each adapt(years) as year}
		<StatTable dataThatYear={data[year]} header={year} {year} {users} search={search(searchTerm)} />
	{/each}
{/await}
</ul>