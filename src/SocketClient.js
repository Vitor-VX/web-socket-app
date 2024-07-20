const { Server } = require('socket.io');
const {
    UserAdd,
    UserDelete,
    GetAllUsersOn,
    writeClear
} = require('./utils/filesUtils');

class SocketClient {
    constructor(server) {
        this.io = new Server(server);
    }

    init() {
        this.io.on('connection', async (socket) => {
            const idUser = socket.id;

            if (!idUser) return;

            await UserAdd(idUser)

            socket.on('disconnect', async () => {
                await UserDelete(idUser);
            });
        });
    }

    async getAllCountUsers() {
        return await GetAllUsersOn()
    }

    async deleteAllUsers() {
        return await writeClear()
    }
}

module.exports = SocketClient