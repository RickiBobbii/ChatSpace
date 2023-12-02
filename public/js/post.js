async function newChat(event) {
  event.preventDefault();

  const title = document.querySelector("#chatTitle").value.trim();

  if (title) {
    const response = await fetch(`/api/chatrooms`, {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    if (response.ok) {
      document.location.replace("/testing");
    } else {
      alert("Failed to create new chat");
    }
  }
}

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

document.querySelector("#newChat").addEventListener("click", newChat);
document.querySelectorAll(".delChat").forEach((delButton) => {
  delButton.addEventListener("click", deleteChat);
});
