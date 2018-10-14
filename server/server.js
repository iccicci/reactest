const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const jsonServer = require("json-server");

app.use(express.static(path.join(__dirname, "..", "build")));
app.use("/api", jsonServer.router("../db.json"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

var server = require("http").createServer(app);
var io = require("socket.io")(server);
var users = {};

io.on("connection", client => {
  var logout = () => {
    const username = client.username;

    users[username] = users[username].filter(val => {
      return val !== client;
    });

    delete client.username;

    console.log("logout", username);
  };

  client.on("login", data => {
    const { username } = data;

    client.username = username;

    if (username in users) users[username].push(client);
    else users[username] = [client];

    console.log("login", username);
  });

  client.on("logout", logout);
  client.on("disconnect", logout);
});

server.listen(8080);
