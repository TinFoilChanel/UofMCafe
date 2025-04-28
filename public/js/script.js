
const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('Socket connected:', socket.connected); 
});

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded");


  const messages = document.getElementById('message-container');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const usersContainer = document.getElementById('users-container');

  
  socket.on('chat-message', (msg) => {
    console.log("Received message:", msg); 
    const messageElement = document.createElement('div');
    messageElement.textContent = msg; 
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight; 
  });


  socket.on('update-users', (users) => {
    console.log("Updated users list:", users);

    
    usersContainer.innerHTML = '';

    
    users.forEach((user) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      usersContainer.appendChild(dot);
    });
  });

  
  sendButton.addEventListener('click', (event) => {
    event.preventDefault(); 
    const message = messageInput.value;
    if (message.trim() !== '') {
      console.log("Sending message:", message); 
      socket.emit('send-chat-message', message); 
      messageInput.value = ''; 
    }
  });

  
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });
});