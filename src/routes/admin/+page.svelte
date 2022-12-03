<script>
	let state;
	reload()
	state.then(console.log)
	function reload(){
		state = fetch("/health.json").then(resp=>resp.json());
	}
</script>

<h1>Admin panel!!!</h1>
<p>Is Syncthing runing ? <span on:click={reload}>
{#await state}
	⏳
{:then {syncthing}}
	{#if syncthing===true}✔{:else}❌{/if}
{:catch error}
	❌
{/await}
</span></p>
<p>Is Santa runing ? <span on:click={reload}>
{#await state}
	⏳
{:then {santa}}
	{#if santa===true}<span alt={santa}>✔</span>{:else}❌{/if}
{:catch error}
	❌
{/await}
</span></p>
🚧

<style>
	span{
		cursor:pointer;
		cursor:hand;
	}
</style>