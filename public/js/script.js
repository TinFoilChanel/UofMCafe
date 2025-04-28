// Initialize socket connection to the server
const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('Socket connected:', socket.connected); // Should log 'true'
});

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded");

  // Get the message container, input, and send button
  const messages = document.getElementById('message-container');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');

  // Listen for incoming messages from the server
  socket.on('chat-message', (msg) => {
    console.log("Received message:", msg); // Log the received message
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
  });

  // Send message when the button is clicked
  sendButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the form from submitting
    const message = messageInput.value;
    if (message.trim() !== '') {
      console.log("Sending message:", message); // Log the message being sent
      socket.emit('send-chat-message', message); // Emit message to the server
      messageInput.value = ''; // Clear the input field
    }
  });

  // Optionally, send message when Enter key is pressed
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });
});