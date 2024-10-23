import SocketController from "./controllers/SocketController";

export const commonSocket = (io) => { 
    io.on('connection', (socket) => {
        console.log('socket-id:', socket.id);
        console.log('connected successfully..!');

        // Handle socket connection errors
        socket.on('connect_error', () => {
            console.log("Something went wrong in connection");
        });

        // Handle socket disconnection
        socket.on('disconnect', () => {
            console.log("Connection is disconnected");
        });

        // Fetch and emit previous messages when a user connects
        SocketController.fetchPreviousMessages(socket);

        // Handle new chat message events
        socket.on('sendmessage', (data) => {
            SocketController.saveAndEmitMessage(io, data);
        });
    });
};
