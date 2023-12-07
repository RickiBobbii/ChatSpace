var element = document.getElementById("goBack");
element.setAttribute("href", document.referrer);

element.onclick = function () {
  document.location.replace(document.referrer);
  return false;
};
