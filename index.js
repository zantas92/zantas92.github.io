function getContentFromSteamID(){
    return function() {
    var steamId = document.getElementById("SteamID").value;
    $.ajax({
      method: "GET",
      url: 'http://localhost:5000/content/steam/' + steamId,
      headers: {"Accept": "application/json"},
    })
    .done(function(data) {
    var youtube = data.Youtube;
    var twitch = data.Twitch;
    localStorage.setItem('youtube', JSON.stringify(youtube));
    localStorage.setItem('twitch', JSON.stringify(twitch));
   });
  }
}
