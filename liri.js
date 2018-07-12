require("dotenv").config();

var request = require("request");
var keys = require("./keys.js");
var Twitter = require('twitter');

var userInput = process.argv[2]; 
var userInput2 = process.argv[3]; 

// console.log(userInput); 


function twitter(){
    console.log("working");
 
    var client = new Twitter(keys.twitter);
     
    var params = {screen_name: 'cnn'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          for (let i = 0; i < tweets.length; i++) {
            console.log(`${i + 1}.  ` + tweets[i].text);
            console.log("============================================")
            console.log("");
    
              
          }
        
      } else {
          console.log("Error: " + error);
      }
    });

};

function spotify(){

};

function movie(){

};

function text(){

};

function decider(){
    switch(userInput){
        case "my-tweets": 
            twitter();
            break; 
        case "spotify-this-song":
            spofity();
            break;
        case "movie-this":
            movie();
            break; 
        case "do-whta-it says":
            text();
            break;
        default:
            console.log("Please enter valid input")

    }

};

decider(); 



