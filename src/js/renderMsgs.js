const chat = document.querySelector(".chat-window");
const template = document.querySelector("#sentMsg");
const templateReceived = document.querySelector("#receivedMsg");
const chatForm = document.querySelector(".chat-message");
const textMsg = document.querySelector(".textMsg");
const msg = document.getElementById("message");
const sendBtn = document.getElementById("send");

// document.body.scrollTop = document.body.scrollHeight;

const socket = new WebSocket(
  `wss://edu.strada.one/websockets?${Cookies.get("token")}`
);

function addSentMsg() {
  console.log(!/^\s/gi.test(msg.value));
  if (msg.value && !/^\s/gi.test(msg.value)) {
    socket.send(JSON.stringify({ text: `${msg.value}` }));
    msg.value = "";
  } else {
    console.log("msg is empty");
  }
}

function lastMessageScroll(animStyle) {
  const pointToScroll = document.createElement("div");
  pointToScroll.className = "pointToScroll";
  chat.append(pointToScroll);
  pointToScroll.scrollIntoView({
    behavior: animStyle || "auto",
    block: "end",
  });
  pointToScroll.remove();
}
function renderHist(msg) {
  let timeStamp = new Date(msg.createdAt);
  const templateMsg =
    msg.user.email === "ruulllo3@gmail.com"
      ? template.content.cloneNode(true)
      : templateReceived.content.cloneNode(true);
  templateMsg
    .querySelector(".textMsg")
    .setAttribute("username", `${msg.user.name}`);
  templateMsg.querySelector(
    ".textMsg"
  ).innerText = `${msg.user.name}: ${msg.text}`;

  templateMsg.querySelector(
    msg.user.email === "ruulllo3@gmail.com"
      ? "#timeStamp"
      : "#timeStampForRecieved"
  ).innerHTML = `<i>${timeStamp.getHours()}:${
    timeStamp.getMinutes() < 10
      ? "0" + timeStamp.getMinutes()
      : timeStamp.getMinutes()
  }`;
  chat.prepend(templateMsg);
}

function renderMsg(msg) {
  let timeStamp = new Date(msg.createdAt);
  const templateMsg =
    msg.user.email === "ruulllo3@gmail.com"
      ? template.content.cloneNode(true)
      : templateReceived.content.cloneNode(true);
  templateMsg
    .querySelector(".textMsg")
    .setAttribute("username", `${msg.user.name}`);
  templateMsg.querySelector(
    ".textMsg"
  ).innerText = `${msg.user.name}: ${msg.text}`;

  templateMsg.querySelector(
    msg.user.email === "ruulllo3@gmail.com"
      ? "#timeStamp"
      : "#timeStampForRecieved"
  ).innerHTML = `<i>${timeStamp.getHours()}:${
    timeStamp.getMinutes() < 10
      ? "0" + timeStamp.getMinutes()
      : timeStamp.getMinutes()
  }`;
  chat.append(templateMsg);
}

socket.addEventListener("open", () => {
  checkName();

  console.log(`Socket open`);
});

socket.addEventListener("message", (e) => {
  const message = JSON.parse(e.data);
  console.log(message);
  renderMsg(message);
  lastMessageScroll("smooth");
});

sendBtn.addEventListener("click", addSentMsg);
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addSentMsg();
});

function reply(e) {
  if (e.target.getAttribute("username")) {
    msg.value = `${e.target.getAttribute("username")}, `;
    // console.log(optionsInput.value);
    // console.log(msg.value);
  } else {
    return;
  }
}

chat.addEventListener("click", reply);
