const http = require('http'); 
const socketio = require('socket.io'); 
const express = require('express'); 
const app = express(); 
let roomName;

const server = http.createServer(app);


server.listen(3001, () => {
    console.log('Server Running at http://127.0.0.1:3001'); 
})

var io = socketio.listen(server);

io.sockets.on('connection', (socket) => {
    // message

    socket.on('joinRoom', (data) => {
        console.log(data);
        socket.join(data.roomName);
        roomName = data.roomName;
    });

    socket.on('message', (data)=>{
        io.sockets.in(roomName).emit('message', data); 
        console.log(data); 
    }); 
})
