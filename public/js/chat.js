const socket = io();
let username;

document.querySelectorAll(".chatrooms").forEach((chatroom) => {
  chatroom.addEventListener("click", async function (e) {
    e.preventDefault();

    const response = await fetch(`/api/users/currentUser`);

    username = await response.json();

    const mainElement = document.querySelector("#main");
    const chatElement = document.querySelector(`#chat${chatroom.id}`);
    if (chatElement.className === "hide") {
      socket.emit("join", `${chatroom.textContent.trim()}`);
      socket.emit("newuser", username);
      document.querySelectorAll(".show").forEach((element) => {
        element.className = "hide";
      });
      document.querySelector(`#chat${chatroom.id}`).className = "show flex justify-center text-center w-full bg-[url(./assets/images/ai-image-10.jpg)] bg-cover";
    } else {
      socket.emit("exituser", username);
      chatElement.className = "hide";
      mainElement.className = "show w-full";
    }
  });
});

// Grabbing the users message and communicating with socket.io
document.querySelectorAll(".send-message").forEach((sendButton) => {
  sendButton.addEventListener("click", function () {
    let message = document.querySelector(".show #message-input").value;
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

    document.querySelector(".show #message-input").value = "";
  });
});

// On join
socket.on("userJoined", function (update) {
  renderMessage("userJoined", update);
});

socket.on("chat", function (message) {
  renderMessage("other", message);
});

// Handling all of the html for our chat rooms. This function uses the information sent to or from socket.io
function renderMessage(type, message) {
  let messageContainer = document.querySelector(".show .messages");
  if (type == "my") {
    let el = document.createElement("div");
    el.setAttribute(
      "class",
      "message my-message flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
    );
    el.innerHTML = `
          <div class="">
              <div class="name uppercase text-2xl flex justify-end"><a href="user/${message.username}">${message.username}</a></div>
              <div class="text text-xl bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">${message.text}</div>
          </div>
        `;
    messageContainer.appendChild(el);
  } else if (type == "other") {
    let el = document.createElement("div");
    el.setAttribute(
      "class",
      "message other-message flex w-full mt-2 space-x-3 max-w-xs mr-auto justify-start"
    );
    el.innerHTML = `
          <div>
            <div class="name uppercase text-2xl flex justify-start"><a href="user/${message.username}">${message.username}</a></div>
            <div class="text text-xl bg-slate-400 text-white p-3 rounded-r-lg rounded-bl-lg">${message.text}</div>
          </div>
        `;
    messageContainer.appendChild(el);
  } else if (type == "userJoined") {
    let el = document.createElement("div");
    el.setAttribute("class", "update");
    el.innerText = message;
    messageContainer.appendChild(el);
  }
  // scroll chat to end on new message
  messageContainer.scrollTop =
    messageContainer.scrollHeight - messageContainer.clientHeight;
}