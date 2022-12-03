<script>
	export let users;
</script>
list of users
<ul>
{#each users as user}
	<li>{user.name}
{/each}
</ul>