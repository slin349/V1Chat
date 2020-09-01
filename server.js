//server.js is basically referring to this console and not the webpage
const io = require('socket.io')(3000);

const users = {}

io.on('connection', socket => { //when user joins website

    socket.on('new-user', name =>{
        console.log(`${name} connected to chat room`);
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    })

    socket.on('send-chat-message', message => { //waits for this socket to be called and sends out the message coming from the client side
        console.log(message);
        socket.broadcast.emit('chat-message', message); //sends message to everyone thats connected on website except for the person that sent the message
    })
}); 
