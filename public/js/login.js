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
      document.location.replace("/testing");
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
          document.location.replace('/testing');
        } else {
          alert(response.statusText);
        }
      }
    } catch (error) {
      console.log(error);
    }
};

document.querySelector("#login").addEventListener("click", loginFormHandler);

document.querySelector('#signup-user').addEventListener('click', signupFormHandler);