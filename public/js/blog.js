const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#blogTitle").value.trim();
  const content = document.querySelector("#blogContent").value.trim();
  const tag = document.querySelector("#blogTag").value.trim();
  const form = document.querySelector(".createBlogForm")

  if (title && content) {
    const response = await fetch(`/api/blogs`, {
      method: "POST",
      body: JSON.stringify({ title, content, tag }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      form.classList.add("hidden")
      window.location.reload();
    } else {
      alert("Failed to create blog post");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/testing");
    } else {
      alert("Failed to delete blog");
    }
  }
};

const createButtonHandler = async (event) => {
  event.preventDefault();

  const createButton = document.querySelector(".createBlogForm");
  createButton.classList.remove("hidden");
}

async function newChat(event) {
  event.preventDefault();
  const tag = document.querySelector("#blogTag").value.trim();
  let match = false;
  if (!tag) return;

  const chatrooms = await fetch(`/api/chatrooms/rooms`);

  const chats = await chatrooms.json();

  chats.forEach((chatroom) => {
    if (chatroom.title === tag.toLowerCase()) {
      match = true;
      return;
    }
  });

  if (match === false) {
    const response = await fetch(`/api/chatrooms`, {
      method: "POST",
      body: JSON.stringify({ title: tag }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Successfully made new chatroom")
    } else {
      alert("Failed to create new chatroom");
    }
  }
}

document
  .querySelector(".newBlogForm")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".createNew")
  .addEventListener("click", createButtonHandler);

if (document.querySelector(".blogList"))
  document
    .querySelector(".blogList")
    .addEventListener("click", delButtonHandler);

document.querySelector(".newBlogForm").addEventListener("submit", newChat);
