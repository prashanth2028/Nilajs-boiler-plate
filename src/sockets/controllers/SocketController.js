import { Message } from "../models/Message";

class SocketController {
  // Method to handle saving and emitting messages
  async saveAndEmitMessage(io, data) {
    try {
      const newMessage = new Message(data);
      await newMessage.save();

      // Emit the message to all connected clients
      io.emit('chatMessage', data);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  }

  // Method to fetch previous messages
  async fetchPreviousMessages(socket) {
    try {
      const messages = await Message.find();
      socket.emit('previousMessages', messages);
    } catch (err) {
      console.error("Error fetching previous messages:", err);
    }
  }
}

export default  new SocketController();
