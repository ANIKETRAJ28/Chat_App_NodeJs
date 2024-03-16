const express = require("express");
const http = require('http');
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("msg_send", (data) => {
        // io.emit("msg_rcvd", data); // for all the clients
        // socket.emit("msg_rcvd", data); // for the same client
        socket.broadcast.emit("msg_rcvd", data); // for the other client
    });
});

app.use("/", express.static(__dirname + "/public"));

server.listen(3000, () => {
    console.log("server started");
});