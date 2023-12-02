const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#blogTitle").value.trim();
  const content = document.querySelector("#blogContent").value.trim();
  const tag = document.querySelector("#blogTag").value.trim();

  if (title && content) {
    const response = await fetch(`/api/blogs`, {
      method: "POST",
      body: JSON.stringify({ title, content, tag }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/testing");
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

async function newChat(event) {
  event.preventDefault();

  const tag = document.querySelector("#blogTag").value.trim();

  if (tag) {
    const response = await fetch(`/api/chatrooms`, {
      method: "POST",
      body: JSON.stringify({ title: tag }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/testing");
    } else {
      alert("Failed to create new chat");
    }
  }
}

document
  .querySelector(".newBlogForm")
  .addEventListener("submit", newFormHandler);

if (document.querySelector(".blogList"))
  document
    .querySelector(".blogList")
    .addEventListener("click", delButtonHandler);

document.querySelector(".newBlogForm").addEventListener("submit", newChat);
