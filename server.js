const express = require("express");
const bodyParser = require("body-parser")
const path = require("path");
const app = express();
const jsonServer = require("json-server");

app.use(express.static(path.join(__dirname, "build")));
app.use('/api', jsonServer.router("db.json"));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

var server = require("http").createServer(app);
var io = require("socket.io")(server);

io.on("connection", function(client) {
  console.log("connected");
  client.on("data", function(data) { console.log(data); });
  client.on("disconnect", function() {});
});

server.listen(8080);
