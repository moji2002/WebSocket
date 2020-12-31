const { log } = require('console');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('connection established');
    socket.on('price', (value) => {
        socket.emit('price', value + 'server');
    });
});



http.listen(port, () => {
    console.log('listening on *:' + port);
});