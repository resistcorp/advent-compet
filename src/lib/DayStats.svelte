<script>
	import DataEntry from "$lib/DataEntry.svelte";
	import DataLine from "$lib/DataLine.svelte";
	export let users;
	export let day;
	export let dataThatYear;
	function getData(user){
		let data = dataThatDay?.[user];
		return data;
	}

	let dataThatDay = dataThatYear["d-"+day];
	let maxVal = getMax(dataThatDay);
	$:{
		dataThatDay = dataThatYear["d-"+day];
		maxVal = getMax(dataThatDay);
	}

	function getMax(data){
		let max = 0;
		for(let user in data){
			max = Math.max(max, data[user]?.avg ?? 0);
		}
		return max;
	}
	function isOk(user){
		return dataThatDay?.[user]?.fails === "0" ? "ok" : "ko"
	}

</script>
<style>
	.ok{
		list-style-type: "\2705";
	}
	.ko{
		list-style-type: "\274C";
	}
</style>
<ul>
	{#each users as user}
		<li class={isOk(user)}><span class="user">{user}</span> : <DataEntry {...dataThatDay?.[user]}/><br />
		<DataLine {...dataThatDay?.[user]} maxAll={maxVal}/>
	{/each}
</ul>