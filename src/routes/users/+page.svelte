<script context="module">
	export async function load({ fetch }){
		const req = await fetch("users.json");
		let data = await req.json();
		let users = data.users;
		return {
			props : {
				users
			}
		}
	}
</script>
<script>
	export let users;
</script>
list of users
<ul>
{#each users as user}
	<li>{user.name}
{/each}
</ul>