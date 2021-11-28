<script>
	import { page, navigating } from '$app/stores';
	let refs;// = calc($page.path, $navigating);
	$: refs = calc($page.path, $navigating);
	// navigating.subscribe(val=>refs = calc($page.path, val));
	// page.subscribe(val=>refs = calc(val.path, $navigating));
	function calc(path, nav){
		if(!path || path == "/") return [];
		let route = path.split("/") || []
		let current = "/";
		let ret = [];
		for(let name of route.slice(1)){
			current += name + "/";
			ret.push({name, current});
		}
		return ret;
	}
</script>
{#if refs?.length }
	<a href="/">←retour</a> /
	{#each refs as {name, path}}
		<a href="{path}">{name}</a> /
	{/each}
{/if}