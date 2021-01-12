function postContent(){
    clearSlides();
    hideSlideContainers();
    var youtube = JSON.parse(localStorage.getItem('youtube'));
    for(var i = 0; i<youtube.length; i++) {
      document.getElementById("container"+i).style.visibility = "visible";
      postContentByGame(i);
   }
  }

function clearSlides() {
  $('#slideCarousel0 .carousel-inner').empty;
  $('#slideCarousel1 .carousel-inner').empty;
  $('#slideCarousel2 .carousel-inner').empty;
}

function hideSlideContainers() {
    document.getElementById("container0").style.visibility = "hidden";
    document.getElementById("container1").style.visibility = "hidden";
    document.getElementById("container2").style.visibility = "hidden";
}

function postContentByGame(slideId) {
        
            console.log("youtube from sessionStorage");
            console.log(JSON.parse(localStorage.getItem('youtube'))); 
            var youtube = JSON.parse(localStorage.getItem('youtube'));
            console.log("youtube");
            console.log(youtube); 
            var twitch = JSON.parse(localStorage.getItem('twitch'));
            var streamer = twitch[slideId];
            var game = youtube[slideId];
            var key = Object.keys(game);
            var gameName = key[0];
            var gameData = game[gameName];
            var keyTwitch = Object.keys(streamer);
            var gameNameTwitch = key[0];
            var streamerData = streamer[gameNameTwitch];
            $('#gamepic'+slideId).attr('src', 'https://static-cdn.jtvnw.net/ttv-boxart/'+gameName+'-185x280.jpg');

            //Add content to a slide

            //Youtube
            var rowIndex = -1;
            $('#slideCarousel'+slideId+' .carousel-inner').empty();
            for(var i = 0; i < gameData.length; i++) {
            if(i % 4 === 0) {
              rowIndex++;
              if(i === 0) {
                $('#slideCarousel'+slideId+' .carousel-inner').append('<div class="item active" id=row'+rowIndex+'><div class="row"></div></div>');
              }
              else {
                $('#slideCarousel'+slideId+' .carousel-inner').append('<div class="item" id=row'+rowIndex+'><div class="row"></div></div>');
              }
            }
            console.log(rowIndex);
             $('#slideCarousel'+slideId+' .carousel-inner .item[id=row'+rowIndex+'] .row').append('<div class="col-sm-3"><iframe width="256" height="144" src="https://www.youtube.com/embed/'+gameData[i].videoId+'" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');    
          }

          //Twitch
          for(var i = 0; i < streamerData.length; i++){
            $('#stream'+i+'_game'+slideId).attr('src', 'https://player.twitch.tv/?channel='+streamerData[i].channel_name+'&parent=sveningvarstechsupport.com');
          }
      }


 function getContentByGameName(){
        return function() {
        var searchToken = document.getElementById("search_bar").value;
    $.ajax({
      method: "GET",
      url: 'http://localhost:5000/content/game/' + searchToken,
      headers: {"Accept": "application/json"}
    })
    .done(function(data) {
    var youtube = data.Youtube;
    var twitch = data.Twitch;
    localStorage.setItem('youtube', JSON.stringify(youtube));
    localStorage.setItem('twitch', JSON.stringify(twitch));
    });
  }
}