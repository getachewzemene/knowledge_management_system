function showComment(e) {
  var comment = document.getElementById(e);
  if (comment.style.display === "block") {
    comment.style.display = "none";
  } else {
    comment.style.display = "block";
  }
}
