<script>
	import DataEntry from "$lib/DataEntry.svelte";
	let open = [];
	export let header = "";
	export let users;
	export let dataThatYear;
	function days(data){
		return data?.days || [];
	}
	function getData(day, user){
		let data = dataThatYear["d-"+day]?.[user];
		return data;
	}
	function click(day){
		open[day] = !open[day];
	}

</script>
<h2>{header}</h2>
<ul>
	{#each days(dataThatYear) as day}
		<li><a href="#" on:click={e => click(day)}>
			<h3>day {day.padStart(2, "0")} :</h3>
		</a>
			{#if open[day]}
			<ul>
				{#each users as user}
					<li>{user} : <DataEntry {...getData(day, user)} />
				{/each}
			</ul>
			{/if}
	{/each}
</ul>