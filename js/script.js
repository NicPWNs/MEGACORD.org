const date = new Date();
let day = date.getDate().toString().padStart(2, "0");
let month = (date.getMonth() + 1).toString().padStart(2, "0");
let year = date.getFullYear();

function vote() {
  var nav = document.getElementById("nav");
  var vote = document.getElementById("vote");
  var error = document.getElementById("error");
  var discord = document.getElementById("discord");
  discord.value = "";
  var ref = document.referrer;

  if (ref.match("/^https?://([^/]+.)?adfoc.us(/|$)/i")) {
    nav.style.display = "none";
    vote.style.display = "block";
  } else {
    vote.style.display = "block";
    discord.style.display = "none";
    submit.style.display = "none";
    error.style.display = "block";
    error.value = "Use /vote in the MEGACORD";
  }
}

const sendVote = async () => {
  var discord = document.getElementById("discord");
  var error = document.getElementById("error");
  var submit = document.getElementById("submit");

  await fetch(".env")
    .then((res) => res.text())
    .then((text) => {
      key = text.split("=")[1];
    })
    .catch((e) => console.error(e));

  if (discord.value) {
    const response = await fetch("https://api.megacord.org/items", {
      method: "GET",
      headers: {
        authorization: key,
      },
    });
    const json = await response.json();
    const user = json.filter((user) => user.username == discord.value);

    if (json.filter((user) => user.username == discord.value).length >= 1) {
      submit.style.display = "none";
      error.style.display = "none";

      data = {
        id: user[0].id,
        date: user[0].date,
        username: user[0].username,
        voted: true,
      };

      await fetch("https://api.megacord.org/items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: key,
        },
        body: JSON.stringify(data),
      });

      discord.style.background = "#57f287";
      discord.style.fontWeight = "bold";
      discord.style.borderRadius = "5px";
      discord.value = "Vote Successful!";
      discord.readOnly = true;
    } else {
      error.style.display = "block";
      error.value = "Invalid Discord Username";
      console.error(
        "Invalid Discord Username was provided. Not found in database."
      );
    }
  } else {
    error.style.display = "block";
    error.value = "Enter a Discord Username";
    console.error("No Discord Username was provided.");
  }
};
