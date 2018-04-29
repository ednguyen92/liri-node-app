require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
    case "spotify-this-song":
      getSpotify();
      break;   
    }

    function getSpotify(value) {
                if (value === "") {
                    value = "The Sign"
                }
              //same song info as above but looking at info for "The Sign" by Ace of Base.
              spotify.search({ type: 'track', query: value}, function(err, data) {
               if (err) {
                  return console.log('Error occurred: ' + err);
                }
                console.log(data);
              })
            }