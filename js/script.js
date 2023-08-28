function vote() {
  var nav = document.getElementById("nav");
  var vote = document.getElementById("vote");
  nav.style.display = "none";
  vote.style.display = "block";
}
function sendVote() {
  var discord = document.getElementById("discord");
  var error = document.getElementById("error");
  if (discord.value != "") {
    document.getElementById("submit").style.display = "none";
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
