import { Socket } from 'socket.io';

export class ChatUser {
  private username: string;
  private sockets: Socket[];
  private lastMessageSent: string;

  constructor() {
    this.sockets = [];
    this.lastMessageSent = '';
  }

  setLastMessageSent(message: string) {
    this.lastMessageSent = message;
  }

  getLastMessageSent() {
    return this.lastMessageSent;
  }

  addSocket(socket: Socket) {
    this.sockets.push(socket);
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }

  getSockets() {
    let copy = this.sockets;
    return copy;
  }
}
