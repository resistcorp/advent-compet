<script>
import { page } from '$app/stores';
	let route = $page?.params?.rest || "."
</script>
<h1>404 (pas de page pour {route})</h1>
<a href="/"> retour à la sécurité</a>