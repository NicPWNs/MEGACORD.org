function vote() {
  var nav = document.getElementById("nav");
  var vote = document.getElementById("vote");
  var error = document.getElementById("error");
  var discord = document.getElementById("discord");
  var sub;
  var ref = document.referrer;
  if (ref.match(/^https?:\/\/([^\/]+\.)?adfoc\.us(\/|$)/i)) {
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
function sendVote() {
  var discord = document.getElementById("discord");
  var error = document.getElementById("error");
  var submit = document.getElementById("submit");
  if (discord.value != "") {
    submit.style.display = "none";
    error.style.display = "none";
    discord.style.background = "#57f287";
    discord.style.fontWeight = "bold";
    discord.style.borderRadius = "5px";
    discord.value = "Vote Successful!";
    discord.readOnly = true;
  } else {
    error.style.display = "block";
    error.value = "Enter a Discord Username";
  }
}
