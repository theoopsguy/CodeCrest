import { GithubAuthProvider, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../config/firebase.config";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, googleProvider).then((userCreds) => {
    window.location.reload();
  });
};

export const signInWithGithub = async () => {
  await signInWithRedirect(auth, githubProvider).then((userCreds) => {
    window.location.reload();
  });
};
