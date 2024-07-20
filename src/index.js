const express = require('express');
const app = express();
const PORT = 3000;

const server = app.listen(PORT, () => console.log(`Server init port: ${PORT}`));

const SocketClient = require('./SocketClient');
const appSocket = new SocketClient(server);

appSocket.init();

app.get('/users-count-app', async (req, res) => {
    const usersCount = await appSocket.getAllCountUsers()

    return res.status(200).json({
        status: 200,
        data: {
            count: usersCount
        }
    });
});

app.get('/delete-all-users', async (req, res) => {
    await appSocket.deleteAllUsers();

    return res.status(200).json({ 
        status: 200,
        message: 'Users all deleted.'
    });
});