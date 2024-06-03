<script lang="ts">
	import { goto } from '$app/navigation';
	import { signIn, signUp } from '../../lib/authService';
	import { email } from '../../lib/emailStore';
	import { writable } from 'svelte/store';

	let password = '';
	let confirmPassword = '';
	let isSignUp = writable(false);

	const handleSignIn = async (e: Event) => {
		e.preventDefault();
		try {
			const session = await signIn($email, password);
			console.log('Sign in successful', session);
			if (session && typeof session.AccessToken !== 'undefined') {
				sessionStorage.setItem('accessToken', session.AccessToken);
				if (sessionStorage.getItem('accessToken')) {
					window.location.href = '/';
				} else {
					console.error('Session token was not set properly.');
				}
			} else {
				console.error('SignIn session or AccessToken is undefined.');
			}
		} catch (error) {
			alert(`Sign in failed: ${error}`);
		}
	};

	const handleSignUp = async (e: Event) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		try {
			await signUp($email, password);
			goto('/confirm');
		} catch (error) {
			alert(`Sign up failed: ${error}`);
		}
	};
</script>

<div class="loginForm">
	<h1>Welcome</h1>
	<h4>{$isSignUp ? 'Sign up to create an account' : 'Sign in to your account'}</h4>
	<form on:submit={$isSignUp ? handleSignUp : handleSignIn}>
		<div>
			<input
				class="inputText"
				id="email"
				type="email"
				bind:value={$email}
				placeholder="Email"
				required
			/>
		</div>
		<div>
			<input
				class="inputText"
				id="password"
				type="password"
				bind:value={password}
				placeholder="Password"
				required
			/>
		</div>
		{#if $isSignUp}
			<div>
				<input
					class="inputText"
					id="confirmPassword"
					type="password"
					bind:value={confirmPassword}
					placeholder="Confirm Password"
					required
				/>
			</div>
		{/if}
		<button type="submit">{$isSignUp ? 'Sign Up' : 'Sign In'}</button>
	</form>
	<button on:click={() => isSignUp.set(!$isSignUp)}>
		{$isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
	</button>
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
