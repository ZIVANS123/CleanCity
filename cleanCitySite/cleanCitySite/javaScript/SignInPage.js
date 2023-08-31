
function handleSignIn() {
  console.log(`button clicked`);
  signInWithEmailAndPassword(auth, "tes11@gmail.com", "123123")
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      if (user) location.replace("Dashboards.html");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}