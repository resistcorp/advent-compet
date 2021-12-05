<script>
	export let runs, min, max, avg, fails;
</script>
<style>
	.runs{
		color : green;
		font-weight: bold;
	}
	.fails{
		color : red;
	}
	.min{
		color : darkgrey;
	}
	.max{
		color : grey;
	}
	.avg{
		color : darkblue;
	}

</style>
<span class="min"><b>min :</b> {min}</span> -- 
<span class="avg"><b>avg :</b> {avg}</span> --
<span class="max"><b>max :</b> {max}</span> -- 
<b>fails/runs :</b> <span class="fails">{fails}</span>/<span class="runs">{runs}</span>.