const { IOS_CANCEL } = require("blockly/msg/en");
const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const { info, start, move, end } = require("./logic");

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

io.on("connection", (socket) => {
  console.log("a user connected");
  app.socket = socket;
  // socket.on("receiveMove", (move) => {
  //   res.send({ move });
  // });
});

app.get("/", (req, res) => {
  res.send(info());
});

app.post("/start", (req, res) => {
  res.send(start(req.body));
});

app.post("/move", (req, res) => {
  console.log("Emitting move");
  app.socket.emit("receiveMove", req.body, (move) => {
    //console.log({ res, move });
    res.json({ move });
  });
});

app.post("/end", (req, res) => {
  res.send(end(req.body));
});

http.listen(port, () => {
  console.log(`Listening on ${port}`);
});
