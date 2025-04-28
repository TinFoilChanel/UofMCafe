const express = require('express');
const http = require('http');
const socketIo = require('socket.io');


const app = express();

app.use(express.static('public'));


const server = http.createServer(app);


const io = socketIo(server);

let users = {}; 


io.on('connection', (socket) => {
  console.log('A user connected');
  

  const userId = `User-${Math.floor(Math.random() * 1000)}`;
  users[socket.id] = userId;

  
  io.emit('update-users', Object.values(users));

  
  io.emit('chat-message', `${userId} has joined the chat.`);

  socket.on('send-chat-message', (message) => {
    const userName = users[socket.id];
    const formattedMessage = `${userName}: ${message}`;
    io.emit('chat-message', formattedMessage); 
  });

  
  socket.on('send-chat-message', (message) => {
    if (message === '.exit') {
      const userName = users[socket.id];
      delete users[socket.id];
      io.emit('update-users', Object.values(users)); 
      io.emit('chat-message', `${userName} has left the chat.`); 
      socket.disconnect(); 
    }
  });


  socket.on('disconnect', () => {
    console.log('A user disconnected');
    const userName = users[socket.id];
    delete users[socket.id]; 
    io.emit('update-users', Object.values(users)); 
    io.emit('chat-message', `${userName} has left the chat.`); 
  });
});


const IP = '0.0.0.0'; 
const PORT = 3001;


server.listen(PORT, IP, () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});