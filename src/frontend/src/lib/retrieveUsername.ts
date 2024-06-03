import { parseJwt } from "./parseJwt";

export const retrieveUsername = async () => {
	try {
		const idToken = sessionStorage.getItem('idToken');

		if (!idToken) {
			throw new Error('No ID token found');
		}

		const tokenPayload = await parseJwt(idToken);

		const username = tokenPayload['cognito:username'];

		if (!username) {
			throw new Error('Username not found in ID token');
		}

		return username;
	} catch (error) {
		console.error('Error retrieving username:', error);
	}
};

