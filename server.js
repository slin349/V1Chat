const io = require('socket.io')(3000);
//server.js is basically referring to this console and not the webpage

io.on('connection', socket => { //when user joins website, it sends message 'Hello World'
    console.log('User connected')
    socket.emit('chat-message', 'Hello World') //'chat-message' is the event name, 'Hello World' is the data being sent

    socket.on('send-chat-message', message => { //waits for this socket to be called and sends out the message coming from the client side
        console.log(message);
    })
}); 
