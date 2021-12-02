const { IOS_CANCEL } = require("blockly/msg/en");
const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

nunjucks.configure("views", { autoescape: true, express: app });

app.get("/blockly", (req, res) => {
  res.render("index.html");
});

app.use(express.json());
app.use("/scripts", express.static(__dirname + "/../node_modules/"));
app.use("/blocks/", express.static(__dirname + "/blocks/"));

console.log(__dirname);

const port = process.env.PORT || 8080;

let moves = [];
let sockets = [];
const validMoves = ["up", "down", "left", "right"];

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);
  sockets.push({ id: socket.id, socket, snake: undefined });
  //console.log(sockets);
  socket.on("setName", (name) => {
    console.log(`Name ${name} set by ${socket.id}`);
    const snakeExists = sockets.findIndex((o) => o.name === name);
    const socketIndex = sockets.findIndex((o) => o.id === socket.id);
    if (
      snakeExists !== -1 &&
      socketIndex !== -1 &&
      snakeExists !== socketIndex
    ) {
      console.log(`${name} found at ${socketIndex}`);
      console.log(
        `Duplicate name: overwriting ${sockets[snakeExists].id} in favour of ${socket.id}`
      );
      sockets[snakeExists] = { id: socket.id, socket, name: name };
      sockets.splice(socketIndex, 1);
      console.log(sockets);
    } else if (socketIndex !== -1) {
      console.log(`Socket found at ${socketIndex}, adding ${name}`);
      sockets[socketIndex] = { id: socket.id, socket, name: name };
    }

    //console.log(sockets);
  });
  // socket.on("receiveMove", (move) => {
  //   res.send({ move });
  // });
});

app.get("/:id/", (req, res) => {
  const snakeName = req.params.id;
  console.log(`Snake name: ${snakeName}`);
  let snakeSocket = sockets.find((o) => o.name === snakeName);

  if (snakeSocket !== null) {
    console.log(`Socket ${snakeSocket.id} found for ${snakeName}`);
    console.log(`Emitting info request to ${snakeSocket.id}`);
    snakeSocket.socket.emit("requestInfo", (info) => {
      console.log(`sending info for ${snakeName}`);
      console.log(info);
      res.send(info);
    });
  } else {
    console.log(`sending default info`);
    res.send(info());
  }
});

app.post("/:id/start", (req, res) => {
  res.send(req.body);
});

app.post("/:id/move", (req, res) => {
  //console.log(req.body);
  const snakeName = req.params.id;
  console.log(`Snake name: ${snakeName}`);
  let snakeSocket = sockets.find((o) => o.name === snakeName);

  if (snakeSocket !== null) {
    console.log(`Socket ${snakeSocket.id} found for ${snakeName}`);
    console.log(`Emitting move to ${snakeSocket.id}`);
    snakeSocket.socket.emit("receiveMove", req.body, (move) => {
      console.log(`${snakeSocket.id} sent ${move} for ${snakeName}`);
      if (validMoves.includes(move)) {
        res.json({ move, shout: snakeName });
      } else {
        console.log(`${snakeName} sent invalid move`);
        res.json({ move: "left", shout: snakeName });
      }
    });
  } else {
    console.log(`No socket found for ${snakeName}`);
  }

  // app.socket.emit("receiveMove", req.body, (move) => {
  //   //console.log({ res, move });
  //   res.json({ move });
  // });
});

app.post("/:id/end", (req, res) => {
  res.send(req.body);
});

http.listen(port, () => {
  console.log(`Listening on ${port}`);
});
