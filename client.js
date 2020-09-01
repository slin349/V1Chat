//script.js is referring to the actual webpage
const socket = io('https://v1chat.herokuapp.com/'); //this is where the server is hosted on
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?');
appendMessage(`Welcome to the chat room, ${name}!`); //welcome message
socket.emit('new-user', name); //sends data back to server

socket.on('chat-message', data => { //whenever we receive a socket event named 'chat-message', print out the data
    appendMessage(`${data.name}: ${data.message}`); //Calls on the function and included the name as well as the text being sent
}); 

socket.on('user-connected', name => { //whenever we receive a socket event named 'user-connected', welcome them
    appendMessage(`${name} has joined the room`);
}); 

socket.on('user-disconnected', name => { //when user disconnects show message
    appendMessage(`${name} has left the room`);
}); 

messageForm.addEventListener('submit', e => { //whenever we submit form, we stop form from submitting
    e.preventDefault(); //this prevents page from refreshing
    const message = messageInput.value; //create variable to store the text value
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message); //this creates a socket with the send-chat-message as keyword and sends the message variable as data
    messageInput.value = ''; //empties the value after its been sent
}); 

function appendMessage(message){ //used to create text box when people send messages
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement); //add the element to the container, in this case another div
}