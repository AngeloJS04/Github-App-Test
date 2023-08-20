import { initializeApp } from "firebase/app";
import { GithubAuthProvider, UserCredential, getAuth } from "firebase/auth";
import githubProvider from "./github.provider";

export type TypeProvider = "github";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

// Get provider to authenticate
export const getProvider = (name: TypeProvider) => {
    const selectProvider = {
        ["github"]: githubProvider,
    };

    return selectProvider[name];
};

// if there are more providers here is where you can get the token for every provider as Google, Github or facebook ETC
export const getResultCredentialToken = (name: TypeProvider, userCredential: UserCredential) => {
    const token = {
        ["github"]: tokenGithub(userCredential),
    };
    return token[name];
};

//this is the token for github  you can add more and use in getResultCredentialToken function
const tokenGithub = (userCredential: UserCredential) => {
    const credential = GithubAuthProvider.credentialFromResult(userCredential);
    const token = credential?.accessToken;
    return token;
};

export default firebaseApp;
