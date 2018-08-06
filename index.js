const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket)=>{
    console.log("some user connected");
})


http.listen(3000, ()=>{
    console.log('server started on port 3000');
});