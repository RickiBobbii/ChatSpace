const socket = io();
let username;

document.querySelectorAll(".chatrooms").forEach((chatroom) => {
  chatroom.addEventListener("click", async function (e) {
    e.preventDefault();

    const response = await fetch(`/api/users/currentUser`, {
      method: "GET",
    });

    username = await response.json();

    const mainElement = document.querySelector("#main");
    const chatElement = document.querySelector(`#chat${chatroom.id}`);
    socket.emit("join", `Room: ${chatroom.id}`);
    if (chatElement.className === "hide") {
      document.querySelectorAll(".show").forEach((element) => {
        element.className = "hide";
      });
      document.querySelector(`#chat${chatroom.id}`).className = "show";
    } else {
      chatElement.className = "hide";
      mainElement.className = "show";
    }
  });
});

socket.emit("newuser", username);

document
  .querySelector(".chat-screen #send-message")
  .addEventListener("click", function () {
    let message = document.querySelector(".chat-screen #message-input").value;
    if (message.length == 0) {
      return;
    }

    renderMessage("my", {
      username: username,
      text: message,
    });

    socket.emit("chat", {
      username: username,
      text: message,
    });

    document.querySelector(".chat-screen #message-input").value = "";
  });

document
  .querySelector(".chat-screen #exit-chat")
  .addEventListener("click", function () {
    socket.emit("exituser", username);
    window.location.href = window.location.href;
  });

socket.on("update", function (update) {
  renderMessage("update", update);
});

socket.on("chat", function (message) {
  renderMessage("other", message);
});

function renderMessage(type, message) {
  let messageContainer = document.querySelector(".chat-screen .messages");
  if (type == "my") {
    let el = document.createElement("div");
    el.setAttribute("class", "message my-message");
    el.innerHTML = `
          <div>
            <div class="name">${message.username}</div>
            <div class="text">${message.text}</div>
        `;
    messageContainer.appendChild(el);
  } else if (type == "other") {
    let el = document.createElement("div");
    el.setAttribute("class", "message other-message");
    el.innerHTML = `
          <div>
            <div class="name">${message.username}</div>
            <div class="text">${message.text}</div>
          </div>
        `;
    messageContainer.appendChild(el);
  } else if (type == "update") {
    let el = document.createElement("div");
    el.setAttribute("class", "update");
    el.innerText = message;
    messageContainer.appendChild(el);
  }
  // scroll chat to end on new message
  messageContainer.scrollTop =
    messageContainer.scrollHeight - messageContainer.clientHeight;
}
