<script>
	export let scores = [];
	function adapt(scores){
		return scores.sort(([,a],[,b])=> (b||0)-(a||0)).map(([u, s], i)=> [u,s,i]);
	}
	function medal(score, position){
		if(!score)
			return "";
		return ["🥇", "🥈", "🥉"][position] ||"";
	}
	function cl(score, position){
		if(!score)
			return "invalid";
		return ["gold", "silver", "bronze"][position] ||"";
	}
</script>
<style>
	.gold{
		font-size: x-large;
		font-weight : bolder;
		color: darkgoldenrod;
	}
	.silver{
		font-size: large;
		font-weight : bold;
		color: #666666;
	}
	.bronze{
		font: bold;
		color: bronze;
	}
	.invalid{
		font: bold;
		color: lightgrey;
		text-decoration: line-through;
	}
</style>

{#each adapt(scores) as [user, score, position]}
<span>{medal(score, position)}</span> <span class={cl(score, position)} title={`score for ${user} : ${score}`}>{user}</span>
{/each}