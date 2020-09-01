//server.js is basically referring to this console and not the webpage
const io = require('socket.io')(3000);

const users = {}

io.on('connection', socket => { //when user joins website

    socket.on('new-user', name =>{
        console.log(`${name} connected`);
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
    })

    socket.on('send-chat-message', message => { //waits for this socket to be called and sends out the message coming from the client side
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]}); //sends message to everyone thats connected on website except for the person that sent the message
    })

    socket.on('disconnect', () => { //when user disconnects send that name data to client side and delete user from array
        console.log(`${users[socket.id]} disconnected`);
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    })
}); 
