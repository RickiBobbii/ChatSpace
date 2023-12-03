async function deleteChat(event) {
  event.preventDefault();
  console.log("test");
  if (event.target.hasAttribute("data-id")) {
    console.log("test");
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/chatrooms/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/testing");
    } else {
      alert("Failed to delete chat");
    }
  }
}

document.querySelectorAll(".delChat").forEach((delButton) => {
  delButton.addEventListener("click", deleteChat);
});
