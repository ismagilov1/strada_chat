function loadHistory() {
  if (!Cookies.get("token")) {
    console.log("!Token");
    closeOpen("auth");
  } else {
    fetch("https://edu.strada.one/api/messages/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((historyMsgs) => {
        const msgs = historyMsgs.messages;
        let i = 1;
        for (const msg of msgs.reverse()) {
          window.localStorage.setItem(`${i}`, `${JSON.stringify(msg)}`);
          i++;
        }
        console.log(window.localStorage);
      });
  }
}

loadHistory();

let decreaseHist = 20;
let lastHist = window.localStorage.length;

function renderHistory() {
  if (decreaseHist >= window.localStorage.length) {
    return;
  } else {
    decreaseHist = decreaseHist + 20;

    for (let i = lastHist; i > window.localStorage.length - decreaseHist; i--) {
      renderHist(JSON.parse(window.localStorage[i]));
    }
    lastHist = window.localStorage.length - decreaseHist;
  }
}

renderHistory();

function moveToEnd() {
  chat.scrollTop = chat.scrollHeight;
}
moveToEnd();

chat.addEventListener("scroll", () => {
  // console.log(chat.scrollTop);
  if (chat.scrollTop < 100) {
    console.log("asd");
    renderHistory();
  }
});

// for (let msg in window.localStorage.length) {
// console.log(JSON.parse(window.localStorage[i]));
// }

// chat.addEventListener("scroll", () => {
//   for (msg in window.localStorage) {
//     console.log("asd");
//   }
//   console.log(chat.scrollTop);
// });
