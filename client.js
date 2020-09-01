const socket = io('http://localhost:3000'); //this is where the server is hosted on
//script.js is referring to the actual webpage
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

socket.on('chat-message', data => { //whenever we receive a socket event named 'chat-message', print out the data
    console.log(data);
}); 

messageForm.addEventListener('submit', e => { //whenever we submit form, we stop form from submitting
    e.preventDefault(); //this prevents page from refreshing
    const message = messageInput.value;
    socket.emit('send-chat-message', message); //this creates a socket with the send-chat-message as keyword and sends the message variable as data
    messageInput.value = ''; //empties the value after its been sent
}); 