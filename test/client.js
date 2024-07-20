const { io } = require('socket.io-client');

const socket = io('https://api-app-vx.glitch.me/');

const SendMensageServer = (message) => {
    socket.send(message);
}

const closeConnection = (socket) => {
    socket.close();
}

socket.on('connect', () => {
    console.log('Connected to the server');

    // SendMensageServer('Olá servidor!');

    socket.on('message', (msg) => {
        console.log(`Messagem do servidor: ${msg}`);
    })

    // setTimeout(() => closeConnection(socket), 8000);
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server');


});