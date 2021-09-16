const express = require("express");
const nunjucks = require("nunjucks");
const http = require("http");
const { info, start, move, end } = require("./logic");

const app = express();
nunjucks.configure("views", { autoescape: true, express: app });

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/blockly", (req, res) => {
  res.render("index.html");
});

app.use(express.json());
app.use("/scripts", express.static(__dirname + "/../node_modules/"));

console.log(__dirname);

const port = process.env.PORT || 8080;

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.get("/", (req, res) => {
  res.send(info());
});

app.post("/start", (req, res) => {
  res.send(start(req.body));
});

app.post("/move", (req, res) => {
  io.emit("receiveMove", req.body);
  res.send(move(req.body));
});

app.post("/end", (req, res) => {
  res.send(end(req.body));
});

// Start the Express server
// app.listen(port, () => {
//   console.log(`Starting Battlesnake Server at http://0.0.0.0:${port}...`);
// });

server.listen(8080, () => {
  console.log("Listening on 8080");
});
