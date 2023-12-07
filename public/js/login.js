const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/home");
    } else {
      document.querySelector("#loginFail").style.display = "block";
      console.log("fail");
    }
  }
};

//ADD new User
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  try {
    if (username && email && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/home");
      } else {
        const err = await response.json();
        switch (err.errors[0].path) {
          case "email":
            switch (err.errors[0].type) {
              case "Validation error":
                document.querySelector("#loginFail").textContent =
                  "Please enter a valid email!";
                document.querySelector("#loginFail").style.display = "block";
                break;
              case "unique violation":
                document.querySelector("#loginFail").textContent =
                  "That email has already been used to register an account!";
                document.querySelector("#loginFail").style.display = "block";
                break;
            }
            break;
          case "password":
            document.querySelector("#loginFail").textContent =
              "Please enter a password that is at least 4 characters!";
            document.querySelector("#loginFail").style.display = "block";
            break;
          case "username":
            document.querySelector("#loginFail").textContent =
              "That username is already taken!";
            document.querySelector("#loginFail").style.display = "block";
            break;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//SHow create and hide login
const showCreatUser = async (event) => {
  event.preventDefault();

  const login = document.querySelector("#login-card");
  const create = document.querySelector("#create-card");
  login.classList.add("hidden");
  create.classList.remove("hidden");
};

document.querySelector("#login").addEventListener("click", loginFormHandler);

document
  .querySelector("#signup-user")
  .addEventListener("click", signupFormHandler);

document.querySelector("#show-create").addEventListener("click", showCreatUser);
