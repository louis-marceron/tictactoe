<script>
	let idToken = null;

	// Check if idToken is stored in sessionStorage
	if (typeof window !== 'undefined') {
		console.log('widow is defined');
		idToken = sessionStorage.getItem('idToken');
	}

	console.log(idToken);
</script>

<svelte:head>
	<title>Home | tictactoe</title>
	<meta name="description" content="Tic tac toe game" />
</svelte:head>

<nav>
	{#if !idToken}
		<a href="/auth">Login / Register</a>
	{/if}
</nav>

<section>
	<h1>My tic-tac-toe game</h1>
	<nav class="mode-selection">
		<a href="/local">Offline</a>
		<a href="/multiplayer">Online</a>
	</nav>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
