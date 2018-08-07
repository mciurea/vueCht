const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket)=>{

    socket.on('disconnect', ()=>{
        console.log('some user disconnected');
    });

    socket.on('userConnected', (data)=>{
        socket.broadcast.emit('newUser', data+' is now online');
    });

    socket.on('newMessage', (data)=>{
        io.emit('newMessage', data);
    });

    socket.on('typing', (data)=>{
        socket.broadcast.emit('userTyping', data);
    });

    socket.on('stopTyping', (data)=>{
        socket.broadcast.emit('userStopTyping', data);
    });
})


http.listen(3000, ()=>{
    console.log('server started on port 3000');
});
