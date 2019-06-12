document.getElementById("joinbtn").addEventListener("click", e => {
  e.preventDefault();
  if (fieldValid && passWordValid) {
    //Get current first and last names
    const first = document.getElementById("first").value;
    const last = document.getElementById("last").value;

    //Get current email and password
    const email = document.getElementById("email").value;
    const password = document.getElementById("confirmedPassword").value;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (user) {
        db.collection("users")
          .doc(auth.currentUser.uid)
          .set({
            first: first,
            last: last,
            email: email,
          })
          .catch(function (error) {
            alert("Error adding document: ", error);
          });
      })
      .catch(error => {
        alert(error.message);
      });
  }
});

document.getElementById("sign-in").addEventListener("click", e => {
  e.preventDefault();
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("userPassword").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function (user) {
      location.href = "calculatorindex.html";
    })
    .catch(error => {
      document.getElementById("displayStatus").innerHTML = error.message;
    });
});




