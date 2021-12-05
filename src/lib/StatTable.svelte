<script>
	import DayStats from "$lib/DayStats.svelte";
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	let width = writable(0);
	setContext("stats", {
		width,
	});
	export let open = [];
	export let header = "";
	export let year;
	export let users;
	export let search;
	export let dataThatYear;
	function days(data, search){
		let days = data?.days?.sort().reverse() || []
		if(search)
			return days.filter(d => search(year, d));
		return days;
	}
	function click(day){
		open[day] = !open[day];
	}

</script>
<style>
	.user{
		text-decoration: underline;
		font-weight: bolder;
	}
	ul{
		width : 100%;
	}
</style>
<h2>{header}</h2>
<ul bind:clientWidth={$width}>
	{#each days(dataThatYear, search) as day}
		<li><a href="#" on:click={e => click(day)}>
			<h3>day {day.padStart(2, "0")} :</h3>
		</a>
			{#if open[day]}
				<DayStats {users} {day} {dataThatYear} />
			{/if}
	{/each}
</ul>