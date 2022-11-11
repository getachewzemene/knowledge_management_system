function togglePassword() {
  var oldPass = document.getElementById("oldPassword");
  var newPass = document.getElementById("newPassword");

  if (oldPass.type === "password") {
    oldPass.type = "text";
  }
  if (newPass.type === "password") {
    newPass.type = "text";
  } else {
    oldPass.type = "password";
    newPass.type = "password";
  }
}
