<script context="module">
	import Navbar from "$lib/Navbar.svelte"
	export const ssr = false;
</script>
<script>
	import { years as y, days as d, users as u, checkData } from '$lib/stores/allData.js';
	setTimeout(checkData, 1000);
</script>
<button on:click={()=>checkData()}>data</button>
<Navbar />
<slot></slot>