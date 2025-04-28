const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an Express app
const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));  // ✅ Leave this as-is

// Create HTTP server and attach it to the Express app
const server = http.createServer(app);

// Initialize socket.io with the HTTP server
const io = socketIo(server);

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle chat messages
  socket.on('send-chat-message', (message) => {
    io.emit('chat-message', message); // Broadcast to all clients
  });

  // Handle disconnects
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


const IP = '10.0.0.243'; // 
const PORT = 3001;


server.listen(PORT, IP, () => {
  console.log(`Server is running on http://${IP}:${PORT}`);
});