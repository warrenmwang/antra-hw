function signInOption() {
  alert("Change to sign in page instead...");
}

function registerOption() {
  const firstname = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const mobilePhoneNumber = document.getElementById("mobilePhoneNumber").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  // Basic password check
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return; // Form does still get cleared, did not implement default behavior implementation
  }
  const accountData = {
    firstName: firstname,
    lastName: lastName,
    mobilePhoneNumber: mobilePhoneNumber,
    email: email,
    password: password,
  };
  alert(`Creating account with data: ${JSON.stringify(accountData)}`);
}
