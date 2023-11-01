import { Socket } from 'socket.io';

export class ChatUser {
  private id: string;
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

  setId(id: string) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  getSockets() {
    let copy = this.sockets;
    return copy;
  }
}
