//express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// const server = require("http").createServer(app);
// const io = require("socket.io")(server);
const PORT_CHAT = 3000;

//.env
const dotenv = require("dotenv");
dotenv.config();

//routes
const pingRoute = require("./routes/ping");
const authRoutes = require("./routes/authentication/app-auth"); //authentication routes
const antherRoutes = require("./routes/private/anther");

//middleware
app.use(express.json());
app.use("/api/ping", pingRoute);
app.use("/api/auth", authRoutes);
app.use("/api/anther", antherRoutes);

//listen on port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Chat
// io.on("connection", (socket) => {
//   console.log("a user has connected :)");
//   socket.emit("chat-message", "hello (from-server)");
// });
var server = require("http").createServer();
var io = require("socket.io")(server);
io.on("connection", function (client) {
  console.log("SERVER: this clinet joined:", client.id);
  client.on("event", function (data) {
    console.log(client.id, data);
  });
  client.on("disconnect", function () {});
});
// server.listen(3000);

server.listen(PORT_CHAT, () => {
  console.log(`Server(chat) is running on port ${PORT_CHAT}`);
});

// const test = require("./sql/data/populateInterestsTable");

module.exports = app;
