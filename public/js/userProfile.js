let username;

const user = async (event) => {
  event.preventDefault();

  const response = await fetch(`/api/users/currentUser`);

  username = await response.json();
}