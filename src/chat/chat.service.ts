import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@Injectable()
export class ChatService {
  private World: Map<string, Socket[]> = new Map<string, Socket[]>();

  private logger: Logger = new Logger('Chat');

  private getUserFromUrl(url: string) {
    if (!url) {
      this.logger.error('could not get the connection url');
    } else {
      const regex = /.+sender=.+&.*/g;
      if (url.match(regex)) {
        const user = url.substring(url.search('=') + 1, url.search('&'));
        if (!user || user === '') {
          this.logger.error('sender is undefined');
          return undefined;
        }
        return user;
      } else {
        this.logger.error('sender parameter does not exist');
      }
    }
  }

  addUserToWorld(socket: Socket) {
    const sender = this.getUserFromUrl(socket.request?.url);
    if (!sender) {
      return;
    }
    let user = this.World.get(sender);
    if (!user) {
      this.logger.debug(`user addedd ${sender}`);
      const sockets: Socket[] = [];
      sockets.push(socket);
      this.World.set(sender, sockets);
    } else {
      user.push(socket);
      this.logger.debug(`update existing client ${sender}`);
    }
  }

  deleteUserFromWorld(socket: Socket) {
    const sender = this.getUserFromUrl(socket.request?.url);
    const user = this.World.get(sender);
    if (user) {
      this.logger.debug(`client ${sender} is out`);
      this.World.delete(sender);
    } else {
      this.logger.error(
        'Could not disconnect client because client does not exist',
      );
    }
  }

	getSocketsAssociatedWithUser(user: string) {
		const sockets = this.World.get(user);
		return sockets;
	}
}
