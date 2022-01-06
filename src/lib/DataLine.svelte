<script>
	import { getContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { tweened  } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	export let runs, min, max, avg, inputsFailed, maxAll;
	export let day, user, langage, year, inputsSolved;
	let win_size = tweened (0, {
		duration: 500,
		easing : cubicInOut
	});
	// getContext("stats").width.subscribe( v=> $win_size = v );
	let SIZE;
	$: SIZE = $win_size / getTextWidth("█") / 2;
	function getClass(fails){
		if(fails > 0)
			return "me failed";
		return "me";
	}
	function rep(avg, maxAll, fails, size){
		// if(fails > 0)
		// 	return 0;
		let ret = Math.round((avg / maxAll) * size);
		if(ret>=0)
			return ret;
		return 0;
	}
	function getTextWidth(text) {
		return 7;
	}

</script>
<style>
	div{
		width: calc(100% - 50px);
	}
	.runs{
		color : green;
		font-weight: bold;
	}
	.me{
		font-weight: bolder;
		color : darkblue;
	}
	.me.failed{
		color : red;
	}
	.min{
		color : darkgrey;
	}
	.not-me{
		color : grey;
	}

</style>
<div bind:clientWidth={$win_size}>
	<span class={getClass(inputsFailed)}>[{"█".repeat(rep(avg, maxAll, inputsFailed, SIZE))}]</span><span class="not-me">{"░".repeat(SIZE-rep(avg, maxAll, inputsFailed, SIZE))}</span><br />
</div>
