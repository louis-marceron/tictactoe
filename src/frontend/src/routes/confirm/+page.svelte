<script lang="ts">
	import { confirmSignUp } from '../../lib/authService';
	import { email } from '../../lib/emailStore';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	const confirmationCode = writable('');

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		try {
			await confirmSignUp($email, $confirmationCode);
			alert('Account confirmed successfully!\nSign in on next page.');
			goto('/auth');
		} catch (error) {
			alert(`Failed to confirm account: ${error}`);
		}
	};
</script>

<div class="loginForm">
	<h2>Confirm Account</h2>
	<form on:submit={handleSubmit}>
		<div>
			<p>Email: {$email}</p>
		</div>
		<div>
			<input
				class="inputText"
				type="text"
				bind:value={$confirmationCode}
				placeholder="Confirmation Code"
				required
			/>
		</div>
		<button type="submit">Confirm Account</button>
	</form>
</div>

<style>
	.loginForm {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.inputText {
		margin: 0.5rem 0;
	}
</style>
