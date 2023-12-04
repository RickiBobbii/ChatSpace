const newComment = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const comment = document.querySelector("#comment").value.trim();

    if (comment) {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "POST",
        body: JSON.stringify({ comment }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to create comment");
      }
    }
  }
};

const commentDelete = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blogs/comment/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to delete comment");
    }
  }
};

if (document.querySelector(".newCommentForm")) {
  document
    .querySelector(".newCommentForm")
    .addEventListener("submit", newComment);
}

if (document.querySelector(".commentList"))
  document
    .querySelector(".commentList")
    .addEventListener("click", commentDelete);
