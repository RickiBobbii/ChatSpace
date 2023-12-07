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
      // document.querySelector("#loginFail").style.display = "block";
      console.log("fail");
    }
  }
};

//ADD new User
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

    try { 
      if (username && email && password) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/home');
        } else {
          alert(response.statusText);
        }
      }
    } catch (error) {
      console.log(error);
    }
};

//SHow create and hide login
const showCreatUser = async (event) => {
  event.preventDefault();

  const login = document.querySelector('#login-card');
  const create = document.querySelector('#create-card');
  login.classList.add("hidden");
  create.classList.remove("hidden");

};


document.querySelector("#login").addEventListener("click", loginFormHandler);

document.querySelector('#signup-user').addEventListener('click', signupFormHandler);

document.querySelector('#show-create').addEventListener('click', showCreatUser);