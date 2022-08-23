const express = require("express");
const app = express();
const port = 4001;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const { getRoom } = require("./functions/getRoom");
const { db, insertMessage } = require("./db/db");
const loggMessages = require("./functions/loggMessages");
const getAllMessages = require("./functions/getAllMessages");
const getAllRooms = require("./functions/getAllRooms");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  socket.on("send_message", (data) => {
    loggMessages(data);
  });
  next();
});

io.on("connection", (socket) => {
  console.log(`User with id ${socket.id} connected`);

  socket.on("join_room", (data) => {
    socket.join(data.choosenRooom);
    console.log(`User: ${data.user} has joined room: ${data.choosenRooom}`);
  });
  socket.on("leave_room", (data) => {
    socket.leave(data.choosenRooom);
    console.log(`User: ${data.user} has left room: ${data.choosenRooom}`);
  });

  socket.on("send_message", (data) => {
    console.log("message recived", data);
    if (data.message === "") {
      console.log("Not allowed to send empty messages");
      return;
    }
    insertMessage(data);
    async function sendAllMessages() {
      const allMessages = await getAllMessages(data);
      console.log(allMessages, "all messages");
      if (allMessages) {
        socket.to(data.room).emit("recive_message", allMessages);
      }
    }
    sendAllMessages();
  });

  socket.on("back_to_room", (data) => {
    async function sendAllMessages() {
      const allMessages = await getAllMessages(data);
      console.log(allMessages, "all messages", data);
      if (allMessages) {
        socket.to(data.room).emit("recive_message", allMessages);
      }
    }
    sendAllMessages(data);
  });

  socket.on("addRoom", (data) => {
    async function getTheRoom() {
      const room = await getRoom(data.room);
    }
    getTheRoom();
    if (data.room === "") {
      console.log("Couldnt add room, make sure name is correct");
      return;
    }

    const sql = `INSERT INTO chatRooms(name) VALUES(?)`;
    db.run(sql, [data.room], (err) => {
      if (err) console.log(err);
    });
  });

  socket.on("get_rooms", () => {
    async function rooms() {
      const data = await getAllRooms();
      socket.emit("get_rooms", data);
    }
    rooms();
  });

  socket.on("delete_room", (data) => {
    const deleteMessages = `DELETE FROM messages WHERE room = ?`;
    const delSql = `DELETE FROM chatRooms WHERE name = ?`;
    db.query(delSql, [data]);
    db.query(deleteMessages, [data]);
    console.log(data);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
