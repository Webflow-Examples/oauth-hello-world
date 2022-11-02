// parse querystring
const { code } = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

// update the html message with user data
function updateMessage({ firstName, lastName, email }) {
  const header = document.querySelector("h3");
  header.textContent = header.textContent.replace("newcomer", `${firstName} ${lastName}`);
}

// get user data from oauth code
function getUserInfo(code) {
  const method = "POST";
  const body = JSON.stringify({ code });
  const headers = { "Content-Type": "application/json" };
  return fetch("/", { method, body, headers }).then((r) => r.json());
}

// if code is present, get user's info
if (code) getUserInfo(code).then(updateMessage);
