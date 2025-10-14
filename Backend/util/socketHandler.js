import { Server } from 'socket.io';

function initializeSocketIO(httpServer) {

    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('SocketHandler: Establisheda new Socket Connection');

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        socket.on('disconnect', () => {
            console.log('SocketHandler: A client has left');
        });
    });

    return io;
}

export default initializeSocketIO;