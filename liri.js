require("dotenv").config();

var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');
var fs = require("fs");
var spotify = require('node-spotify-api');




var userInput = process.argv[2]; 
var userInput2 = process.argv[3]; 

// console.log(userInput); 


function twitter(){
    console.log("working");
 
    var client = new Twitter(keys.twitter);
     
    var params = {screen_name: 'cnn'};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        //   fs.appendFile("saved-tweets.txt",)
          for (var i = 0; i < tweets.length; i++) {
            console.log(`${i + 1}.  ` + tweets[i].text);
            console.log("============================================");
            console.log("");
          };
        
      } else {
          console.log("Error: " + error);
      }
    });

};




function spotify(song){

    var spotify = new SpotifyWebApi({
        id:keys.spotify.id,
        secret:keys.spotify.secret
    });

    spotify.search({ type: 'track', query: song}, function(error, data){
      if(!error){
        for(var i = 0; i < data.tracks.items.length; i++){
          var songData = data.tracks.items[i];
          console.log("Artist: " + songData.artists[0].name);
          console.log("Song: " + songData.name);
          console.log("Preview URL: " + songData.preview_url);
          console.log("Album: " + songData.album.name);
          console.log("-----------------------");
          
        }
      } else{
        console.log('Error occurred.');
      }
    });
  }
  

function movie(){

    var omdbRequest = " "; 
   
    var omdbMovie = "http://www.omdbapi.com/?apikey=40e9cece&t=" + omdbRequest;

    
    request(omdbMovie, function (error, response, body) {

        if (error) {
            return console.log(error);
        }
        console.log("Title of the movie: " + JSON.parse(body).Title);
        console.log("Year the movie came out: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Country where the movie was produced: " + JSON.parse(body).Country);
        console.log("Movie language: " + JSON.parse(body).Language);
        console.log("Movie plot: " + JSON.parse(body).Plot);
        console.log("Actors in the movie: " + JSON.parse(body).Actors);
    
    });
};


function decider(){
    switch(userInput){
        case "my-tweets": 
            twitter();
            break; 
        case "spotify-this-song":
            spotify();
            break;
        case "movie-this":
            movie();
            break; 
        case "do-what-it-says":
            text();
            break;
        default:
            console.log("Please enter valid input")

    }

};

decider(); 



