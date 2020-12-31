const { default: axios } = require('axios');
const { log } = require('console');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let prices = {};
const getPrices = async () => {
    try {
        const res = await axios.get('https://api.coinex.com/v1/common/currency/rate');
        prices = res.data.data;
    } catch (error) {
        console.log('unable to connect');
    }
};
getPrices();
setInterval(getPrices, 5000);

io.on('connection', (socket) => {
    console.log('connection established');


    socket.on('price', (value) => {
        // socket.emit('price', value + ' server'); emit to single connection
        // io.emit('price', value); // emit to all connection
        socket.emit('price', prices[value]); //emit to single connection;

    });
});




http.listen(port, () => {
    console.log('listening on *:' + port);
});