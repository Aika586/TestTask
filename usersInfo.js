const userListElem = document.getElementById("user-list");
const refreshBtn = document.getElementById("refresh-btn");
const errorMsgElem = document.getElementById("error-msg");

const usersData = async () => {
  try {
    const response = await fetch("https://reqres.in/api/users?page=2");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = await response.json();
    displayUsers(users);
    errorMsgElem.textContent = "";
  } catch (error) {
    errorMsgElem.textContent = error.message;
  }
};

usersData();

function displayUsers(users) {
  userListElem.innerHTML = "";
  users?.data?.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("user-card");
    card.innerHTML = `
    <img src=${user.avatar} />
    <h2>${user.first_name} ${user.last_name}</h2>
    <p> <b>ID:</b>${user.id}</p>
    <p>Email: ${user.email}</p>
    `;
    userListElem.appendChild(card);
  });
}

refreshBtn.addEventListener("click", usersData);
