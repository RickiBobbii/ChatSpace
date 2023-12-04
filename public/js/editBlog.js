const displayForm = (e) => {
    e.preventDefault();
    const editForm = document.querySelector(".editBlogForm");
  
    if (editForm.style.display === "none") {
      editForm.style.display = "block";
    } else {
      editForm.style.display = "none";
    }
  };
  
  const editBlog = async (event) => {
    event.preventDefault();
  
    const id = event.target.getAttribute("data-id");
    const title = document.querySelector("#newBlogTitle").value.trim();
    const content = document.querySelector("#newBlogContent").value.trim();
  
    if (title || content) {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert("Failed to create blog post");
      }
    }
  };
  
  const delBlog = async (event) => {
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
  
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert("Failed to delete blog");
      }
    }
  };
  
  if (document.querySelector("#editButton")) {
    document.querySelector("#editButton").addEventListener("click", displayForm);
    document.querySelector(".editBlogForm").addEventListener("submit", editBlog);
  }
  
  if (document.querySelector("#delButton")) {
    document.querySelector("#delButton").addEventListener("click", delBlog);
  }
  