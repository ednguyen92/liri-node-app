require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var value = process.argv.slice(3);

switch (action) {
  case "my-tweets":
    getTwitter();
    break;

  case "spotify-this-song":
    if (process.argv.length < 4) {
      value = "Mine"
    }
    getSpotify(value);
    break;

  case "movie-this":
    if (process.argv.length < 4) {
      value = "Mr Nobody"
    }
    getMovie();
    break;

  case "do-what-it-says":
    doIt();
    break;

}

function getTwitter() {
  var params = { screen_name: 'PUBG', count: 21 };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(
          "-----------------------------------------" +
          "\n @PUBG: " + tweets[i].text + "\n Created At: " + tweets[i].created_at +
          "\n-----------------------------------------");

        fs.appendFile(
          "-----------------------------------------" +
          "\n @PUBG: " + tweets[i].text + "\n Created At: " + tweets[i].created_at +
          "\n-----------------------------------------");

      }

    }
  });
}

function getSpotify(value) {
  spotify.search({ type: 'track', query: value }, function (error, data) {
    if (error) {
      return console.log('Error occurred: ' + error);
    }

    var song = data.tracks.items[0]

    console.log(
      "-----------------------------------------" +
      "\n Artist(s): " + song.artists[0].name +
      "\n Song Title: " + song.name +
      "\n Preview Song: " + song.preview_url +
      "\n Album: " + song.album.name +
      "\n-----------------------------------------");

    fs.appendFile("spotifyLog.txt",
      "-----------------------------------------" +
      "\n Artist(s): " + song.artists[0].name +
      "\n Song Title: " + song.name +
      "\n Preview Song: " + song.preview_url +
      "\n Album: " + song.album.name +
      "\n-----------------------------------------")

  })
}

function getMovie() {

  request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

    if (!error && response.statusCode === 200) {
      
      console.log(
        "-------------------------------------------" +
        "\n Movie Title: " + JSON.parse(body).Title +
        "\n Year: " + JSON.parse(body).Year +
        "\n IMDB Rating: " + JSON.parse(body).imdbRating +
        "\n Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
        "\n Produced In: " + JSON.parse(body).Country +
        "\n Language: " + JSON.parse(body).Language +
        "\n Plot: " + JSON.parse(body).Plot +
        "\n Actors: " + JSON.parse(body).Actors +
        "\n-------------------------------------------");

      fs.appendFile("omdbLog.txt",
        "-------------------------------------------" +
        "\n Movie Title: " + JSON.parse(body).Title +
        "\n Year: " + JSON.parse(body).Year +
        "\n IMDB Rating: " + JSON.parse(body).imdbRating +
        "\n Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
        "\n Produced In: " + JSON.parse(body).Country +
        "\n Language: " + JSON.parse(body).Language +
        "\n Plot: " + JSON.parse(body).Plot +
        "\n Actors: " + JSON.parse(body).Actors +
        "\n-------------------------------------------")

    }

  });
}

function doIt() {
  fs.readFile('random.txt', "utf8", function (error, data) {
    var txt = data.split(',');

    getSpotify(txt[1]);
  });
}

