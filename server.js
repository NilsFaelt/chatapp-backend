const express = require("express");
const app = express();
const port = 4001;
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User with id ${socket.id} connected`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(data);
  });

  socket.on("send_message", (data) => {
    console.log(data.message);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recive_message", data, socket.id);
    console.log("sneding a sms", data);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
