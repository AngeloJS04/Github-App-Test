import { GithubAuthProvider } from "firebase/auth";

const githubProvider = new GithubAuthProvider();
githubProvider.addScope("user");
githubProvider.addScope("repo");

export default githubProvider;