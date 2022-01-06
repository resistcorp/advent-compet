<script>
	import DayStats from "$lib/DayStats.svelte";
	import Podium from "$lib/Podium.svelte";
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import {multiScores} from "$lib/scoring.js";
	let width = writable(0);
	let chk;
	let openAll;
	let reverse = true;
	setContext("stats", {
		width,
	});
	export let full = true;
	export let open = [];
	export let header = "";
	export let year;
	export let alone;
	export let users;
	export let search;
	export let dataThatYear;
	function days(data, search, reverse){
		let days = data?.days || []
		if(search)
			days = days.filter(d => search(year, d));
		days = days.sort((a, b)=>a-b);
		if(reverse)
			return days.reverse();
		return days;
	}
	function click(day){
		open[day] = !open[day];
	}
	function scores(data, search, users){
		let dayNumbers = days(data, search, false);
		let theDays = dayNumbers.map(d=>data["d-"+d]);
		let ret = multiScores(users, ...theDays);
		return ret;
	}

	let usedDays = days(dataThatYear, search, reverse);
	$:usedDays = days(dataThatYear, search, reverse);

	function isOpenAll(values, checkbox){
		let all = Object.values(values).every(v=>!!v);
		let none = Object.values(values).every(v=>!v);
		if(checkbox) checkbox.indeterminate = !all && !none;
		return all;
	}
	function toggleOpenAll(v){
		let allopen = open.every(v=>!!v);
		open = open.map(v=>false)
	}
</script>
<style>
	.user{
		text-decoration: underline;
		font-weight: bolder;
	}
	ul.year-stats{
		right: 0px;
		padding:  0;
		overflow-x: hidden;
	}
	.active{
		border-color : green;
		text-color : green;
	}
	h2{
		display: inline;
	}
</style>
{#if usedDays?.length}
<h2>{header}<input type="checkbox" bind:this={chk} checked={isOpenAll(open, chk)} /><span on:click={toggleOpenAll}>toggle</span>
	{#if full}
		<button class={reverse?"active" : "inactive"} on:click={e=>reverse = true} title="trier 25→01">↓</button><button class={!reverse?"active" : "inactive"} on:click={e=>reverse = false} title="trier 01→25">↑</button><button on:click={e=>reverse = !reverse} title="inverser le tri">↨</button>
	{/if}
</h2>
	<Podium scores={scores(dataThatYear, search, users)} />
<ul bind:clientWidth={$width} class="year-stats">
	{#each usedDays as day}
			<DayStats {users} {day} {year} {dataThatYear} {click} open={open[day]} alone={usedDays.length == 1} />
	{/each}
</ul>
{/if}