const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const jsonServer = require("json-server");
const fetch = require("fetch").fetchUrl;
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(middlewares);
app.use("/api", router);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const server = require("http").createServer(app);
const io = require("socket.io")(server);
const users = {};

io.on("connection", client => {
  const logout = () => {
    const { username } = client;

    if (!username) return;

    users[username] = users[username].filter(val => {
      return val !== client;
    });

    delete client.userid;
    delete client.username;

    console.log("logout", username);
  };

  const refresh = () => {
    const { userid, username } = client;

    fetch(`http://localhost:8080/api/users/${userid}/notes`, (error, meta, body) => {
      const notes = JSON.parse(body.toString());

      users[username].map(cl => {
        cl.emit("notes", { notes: notes });
      });
    });
  };

  client.on("del", data => {
    const { id } = data;

    fetch(
      `http://localhost:8080/api/notes/${id}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "DELETE"
      },
      (error, meta, body) => {
        refresh();
      }
    );
  });

  client.on("disconnect", logout);

  client.on("login", data => {
    const { username } = data;

    client.username = username;

    if (username in users) users[username].push(client);
    else users[username] = [client];

    fetch(`http://localhost:8080/api/users?username=${username}`, (error, meta, body) => {
      const users = JSON.parse(body.toString());
      const attach = user => {
        client.userid = user.id;
        refresh();
      };

      if (users.length && "id" in users[0]) return attach(users[0]);

      fetch(
        `http://localhost:8080/api/users`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          payload: JSON.stringify({ username: username })
        },
        (error, meta, body) => {
          const user = JSON.parse(body.toString());

          fetch(
            `http://localhost:8080/api/users/${user.id}/notes`,
            {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              payload: JSON.stringify({
                note: `Welcome <b>${username}</b>,<br /><br />this is your <i>first</i> note!`
              })
            },
            (error, meta, body) => {
              attach(user);
            }
          );
        }
      );
    });

    console.log("login", username);
  });

  client.on("logout", logout);
});

server.listen(8080);
