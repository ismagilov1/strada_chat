const modals = document.querySelectorAll(".backdrop-modal");
const btns = document.querySelectorAll("[data-open]");
const getCodeBtn = document.getElementById("getCode");
const confirmCodeBtn = document.getElementById("confirmCode");
const login = document.getElementById("login");
const checkOptions = document.getElementById("checkOptions");
const saveOptionsBtn = document.getElementById("saveOptions");
const optionsInput = document.getElementById("optionsInput");

function closeOpen(dataset) {
  const modal = document.querySelector(`[data-modal=${dataset}]`);

  if (modal.style.display === "none") {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
}

for (const modal of modals) {
  modal.style.display = "none";
  const close = modal.querySelector(".close");
  close.addEventListener("click", () => closeOpen(modal.dataset.modal));
}
for (const btn of btns) {
  btn.addEventListener("click", () => closeOpen(btn.dataset.open));
}

function getCode() {
  const mailInput = document.getElementById("mailInput");
  fetch("https://edu.strada.one/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: `${mailInput.value}`,
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  console.log(mailInput.value);
}

function confirmCode() {
  if (!codeInput.value) {
    alert("Token is empty");
  } else {
    Cookies.set("token", `${codeInput.value}`);
    codeInput.value = "";
    console.log(Cookies.get("token"));
  }
  loadHistory();
}

function checkName() {
  fetch("https://edu.strada.one/api/user/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      optionsInput.value = json.name;
    });
}

function saveOptions() {
  fetch("https://edu.strada.one/api/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    body: JSON.stringify({
      name: `${optionsInput.value}`,
    }),
  })
    .then((response) => response.json())
    .then((json) => alert(json.name));
}

checkOptions.addEventListener("click", checkName);
saveOptionsBtn.addEventListener("click", saveOptions);
getCodeBtn.addEventListener("click", getCode);
login.addEventListener("click", confirmCode);
