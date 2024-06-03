import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand, ConfirmSignUpCommand, type InitiateAuthCommandInput } from "@aws-sdk/client-cognito-identity-provider";
import { env } from '$env/dynamic/public';

export const cognitoClient = new CognitoIdentityProviderClient({
	region: env.PUBLIC_AWS_REGION,
});

export const signIn = async (username: string, password: string) => {
	console.log(env.PUBLIC_BACKEND_URL);
	console.log(env.PUBLIC_AWS_REGION);
	console.log(env.PUBLIC_AWS_USER_POOL_ID);
	console.log(env.PUBLIC_AWS_APP_CLIENT_ID);

	const params: InitiateAuthCommandInput = {
		AuthFlow: "USER_PASSWORD_AUTH",
		ClientId: env.PUBLIC_AWS_APP_CLIENT_ID,
		AuthParameters: {
			USERNAME: username,
			PASSWORD: password,
		},
	};
	try {
		const command = new InitiateAuthCommand(params);
		const { AuthenticationResult } = await cognitoClient.send(command);
		if (AuthenticationResult) {
			sessionStorage.setItem("idToken", AuthenticationResult.IdToken || '');
			sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || '');
			sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || '');
			return AuthenticationResult;
		}
	} catch (error) {
		console.error("Error signing in: ", error);
		throw error;
	}
};

export const signUp = async (email: string, password: string) => {
	const params = {
		ClientId: env.PUBLIC_AWS_APP_CLIENT_ID,
		Username: email,
		Password: password,
		UserAttributes: [
			{
				Name: "email",
				Value: email,
			},
		],
	};
	try {
		const command = new SignUpCommand(params);
		const response = await cognitoClient.send(command);
		console.log("Sign up success: ", response);
		return response;
	} catch (error) {
		console.error("Error signing up: ", error);
		throw error;
	}
};

export const confirmSignUp = async (username: string, code: string) => {
	const params = {
		ClientId: env.PUBLIC_AWS_APP_CLIENT_ID,
		Username: username,
		ConfirmationCode: code,
	};
	try {
		const command = new ConfirmSignUpCommand(params);
		await cognitoClient.send(command);
		console.log("User confirmed successfully");
		return true;
	} catch (error) {
		console.error("Error confirming sign up: ", error);
		throw error;
	}
};

