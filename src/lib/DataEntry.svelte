<script>
	export let runs, min, max, avg, inputsFailed, inputsSolved;
	export let day, user, langage, year;

</script>
<style>
	
	.runs{
		color : green;
		font-weight: bold;
	}
	.fails{
		color : red;
	}
	.ok{
		color : gold;
	}
	.min{
		color : darkgrey;
	}
	.max{
		color : grey;
	}
	.avg{
		font-size: large;
		color : darkblue;
	}

</style>
<span class="avg"><b>avg runs/sec : {(+avg).toFixed(1)}</b></span> --
<span class="min"><b>min :</b> {(+min).toFixed(1)}</span> -- 
<span class="max"><b>max :</b> {(+max).toFixed(1)}</span> -- 
<b>fails/ok/runs :</b> <span class="fails">{inputsFailed}</span>/<span class="ok">{inputsSolved}</span>/<span class="runs">{runs}</span>.
