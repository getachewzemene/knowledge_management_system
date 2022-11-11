function validateAddUser() {
  const firstName = document.addUserForm.firstName.value;
  const lastName = document.addUserForm.lastName.value;
  const email = document.addUserForm.email.value;
  const password = document.addUserForm.password.value;
  const phone = document.addUserForm.phone.value;
  const salary = document.addUserForm.salary.value;
  const department = document.addUserForm.department.value;
  const address = document.addUserForm.address.value;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const nameRegex = /^[a-zA-Z ]+$/;
  const phoneRegex = /^\d{10}$/;
  const salaryRegex = /^\d+$/;
  if (
    firstName == "" ||
    lastName == "" ||
    email == "" ||
    password == "" ||
    phone == "" ||
    salary == "" ||
    department == "" ||
    address == ""
  ) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML = "please fill all the fields";
    firstName.focus();
    lastName.focus();
    email.focus();
    password.focus();
    phone.focus();
    salary.focus();
    department.focus();
    address.focus();
    return false;
  }
  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML = "please enter valid name";
    firstName.focus();
    lastName.focus();
    return false;
  }
  if (!email.match(emailRegex)) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML = "please enter valid email";
    email.focus();
    return false;
  }
  if (password.length < 4) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML =
      "password must be at least 4 characters long";
    password.focus();
    return false;
  }
  if (!phone.match(phoneRegex)) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML =
      "please enter valid phone number";
    phone.focus();
    return false;
  }
  if (!salary.match(salaryRegex)) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML = "please enter valid salary";
    salary.focus();
    return false;
  }
  if (
    !department.match(nameRegex) ||
    department.length < 2 ||
    address.length < 2 ||
    !address.match(nameRegex)
  ) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML =
      "please enter valid department and address";
  }

  document.getElementById("error").style.display = "none";
  return true;
}

function validateLogin() {
  const email = document.loginForm.email.value;
  const password = document.loginForm.password.value;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email == "" || password == "") {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML =
      "please enter email and password";
    email.focus();
    password.focus();
    return false;
  }
  if (!email.match(emailRegex)) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML = "please enter valid email";
    email.focus();
    return false;
  }

  if (password.length < 4) {
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML =
      "password must be at least 4 characters long";
    password.focus();
    return false;
  } else {
    document.getElementById("error").style.display = "none";
    return true;
  }
}
