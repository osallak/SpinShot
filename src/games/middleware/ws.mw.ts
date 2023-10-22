import { Socket } from 'socket.io'
import { WsJwtGuard } from 'src/games/guard/ws.guard' 

export type SocketIoMiddleWare = {
    (client: Socket, next: (err?: Error) => void);
}

export const SocketAuthMidleware = (): SocketIoMiddleWare => {
    return (client, next) => {
        try {
            WsJwtGuard.validateToken(client);
            next();
        } catch(error) {
            next(error);
        }
    }
}