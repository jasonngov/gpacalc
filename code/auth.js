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
        /*
        * Creates instance of new user in collection 'Users'
        * Includes information about user first and last name, email
        */
        db.collection("users")
          .doc(12345)
          .set({
            first: first,
            last: last,
            email: email,
          })
          .then(function (docRef) {
            console.log("Document written with ID: ", 12345);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
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




