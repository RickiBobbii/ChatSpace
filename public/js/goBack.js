var element = document.getElementById("goBack");
element.setAttribute("href", document.referrer);

element.onclick = function () {
  history.back();
  return false;
};