<script>
	import DataEntry from "$lib/DataEntry.svelte";
	import DataLine from "$lib/DataLine.svelte";
	import Podium from "$lib/Podium.svelte";
	import {dayScores} from "$lib/scoring.js";
	import {assets} from "$app/paths";
	export let users;
	export let day;
	export let year;
	export let dataThatYear;
	export let alone;
	export let open = false;
	export let click = _ => false;
	function getData(user){
		let data = dataThatDay?.[user];
		return data;
	}

	let dataThatDay = dataThatYear["d-"+day];
	let maxVal = getMax(dataThatDay);
	let scores = dayScores(dataThatDay);
	$:{
		dataThatDay = dataThatYear["d-"+day];
		maxVal = getMax(dataThatDay);
		scores = dayScores(dataThatDay)
	}

	function getMax(data){
		let max = 0;
		for(let user in data){
			max = Math.max(max, data[user]?.avg ?? 0);
		}
		return max;
	}
	function isOk(user){
		if(dataThatDay?.[user]?.inputsFailed !== "0")
			return "ko";
		let pos = scores.filter(([u,_]) => dataThatDay?.[u]?.inputsFailed === "0").findIndex(([u,_]) => u === user);
		return ["first", "second", "third"][pos] || "ok";
	}
	function lang(user){
		return dataThatDay?.[user]?.langage;
	}
	function langicon(user){
		let lg = dataThatDay?.[user]?.langage;
		switch(lg){
			case "skPython2" :
			case "skPython" :
				return "python";
			case "skJava" :
				return "java";
			case "skExe" :
				switch (user){
					case "Boris":
						return "rust";
					case "Yann":
						return "nim";
				}
		};
		return null;
	}
</script>
<style>
	img{
		height:  1em;
		vertical-align: bottom;
	}
	span.user{
		font-size: x-large;
		font-weight: bold;
		margin-left: -25px;
	}
	.day.open{
		list-style: disclosure-open;
		cursor: pointer;
	}
	.day.close{
		list-style: disclosure-closed;
		cursor: pointer;
	}
	li.user {
	  list-style: none;
	  font-size: 20px;
	}

	li.user:before{
		position: absolute;
	}
	li.user.ok:before{
		content: "\2705";
		position: relative;
		left: -30px;
		top: 20px;
		font-size:20px;
	  vertical-align:middle;
	  line-height:20px;
	}
	li.user.ko:before{
		content: "\274C";
		position: relative;
		left: -30px;
		top: 20px;
		font-size:20px;
	  vertical-align:middle;
	  line-height:20px;
	}
	li.user.first:before{
		content: "\1F947";
		position: relative;
		left: -50px;
		top: 10px;
		font-size:40px;
	  vertical-align:middle;
	  line-height:20px;
	}
	li.user.second:before{
		content: "\1F948";
		position: relative;
		left: -40px;
		top: 15px;
		font-size:30px;
	  vertical-align:middle;
	  line-height:20px;
	}
	li.user.third:before{
		content: "\1F949";
		position: relative;
		left: -35px;
		top: 8px;
		font-size:25px;
	  vertical-align:middle;
	  line-height:20px;
	}
	h2{
		display : inline;
		padding-left: 25px;
		margin-left: -25px;
	}
</style>
<li class={open ? "day open":"day close"}>
	<h2 on:click={e => click(day)}>day {day.padStart(2, "0")} :</h2>
{#if !alone}	<a href="/stats/{year}/{day}" alt="ouvrir ce jour" rel=external>(link)</a> {/if}
	<Podium scores={scores} />

{#if open ||alone}
	<ul>
		{#each users.sort((a, b) => 0.5 - Math.random()) as user} 
			{#if dataThatDay?.[user]}
				<li class="user {isOk(user)}"><span class="user">
<img src='{assets}/lg/{langicon(user)}.svg' alt={lang(user)}/>
{user}</span> : <DataEntry {...dataThatDay?.[user]}/><br />
				<DataLine {...dataThatDay?.[user]} maxAll={maxVal}/></li>
			{/if}
		{/each}
	</ul>
{/if}
</li>