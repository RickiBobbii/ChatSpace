const socket = io();
const app = document.querySelector(".app");

document.querySelectorAll(".chatrooms").forEach((chatroom) => {
  chatroom.addEventListener("click", function (e) {
    e.preventDefault();
    if (
      window.location.href.charAt(window.location.href.length - 1) ===
      chatroom.id
    ) {
      socket.emit("join", `Room: ${chatroom.id}`);
      return;
    } else {
      document.location.replace(chatroom.href);
    }
  });
});

let uname = "username";
socket.emit("newuser", uname);

app
  .querySelector(".chat-screen #send-message")
  .addEventListener("click", function () {
    let message = app.querySelector(".chat-screen #message-input").value;
    if (message.length == 0) {
      return;
    }

    renderMessage("my", {
      username: uname,
      text: message,
    });

    socket.emit("chat", {
      username: uname,
      text: message,
    });

    app.querySelector(".chat-screen #message-input").value = "";
  });

app
  .querySelector(".chat-screen #exit-chat")
  .addEventListener("click", function () {
    socket.emit("exituser", uname);
    window.location.href = window.location.href;
  });

socket.on("update", function (update) {
  renderMessage("update", update);
});

socket.on("chat", function (message) {
  renderMessage("other", message);
});

function renderMessage(type, message) {
  let messageContainer = app.querySelector(".chat-screen .messages");
  if (type == "my") {
    let el = document.createElement("div");
    el.setAttribute("class", "message my-message");
    el.innerHTML = `
          <div>
            <div class="name">You</div>
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
