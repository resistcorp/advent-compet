<script>
	import { getContext } from 'svelte';
	import { tweened  } from 'svelte/motion';
	import { elasticOut } from 'svelte/easing';
	export let runs, min, max, avg, fails, maxAll;
	let SIZE = 100;
	let win_size = tweened (0, {
		duration: 1300,
		easing : elasticOut
	});
	getContext("stats").width.subscribe( v=> $win_size = v );
	$: SIZE = $win_size / getTextWidth("█") / 2;
	function getClass(fails){
		if(fails > 0)
			return "me failed";
		return "me";
	}
	function rep(avg, maxAll, fails, size){
		if(fails > 0)
			return size;
		let ret = Math.round((avg / maxAll) * size);
		console.log("calc repeat", avg, maxAll, ret)
		return ret;
	}
	function getTextWidth(text) {
		return 7;
	}

</script>
<style>
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
<span class={getClass(fails)}>[{"█".repeat(rep(avg, maxAll, fails, SIZE))}]</span><span class="not-me">{"░".repeat(SIZE-rep(avg, maxAll, fails, SIZE))}</span><br />
