// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

function checkHttps(req, res, next) {
  // protocol check, if http, redirect to https

  if (req.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    res.redirect("https://" + req.hostname + req.url);
  }
}

app.all("*", checkHttps);

const fs = require("fs");
//cleardb();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
  // response.sendFile(__dirname + "/views/working.html");
});

app.get("/index", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
  // response.sendFile(__dirname + "/views/working.html");
});

app.get("/updates", function (request, response) {
  response.sendFile(__dirname + "/views/updates.html");
});

app.get("/contact", function (request, response) {
  response.sendFile(__dirname + "/views/contact.html");
});

app.get("/ping", function (request, response) {
  response.sendStatus(200);
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get("*", function (req, res) {
  res.sendFile(__dirname + "/views/404.html");
});
// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
