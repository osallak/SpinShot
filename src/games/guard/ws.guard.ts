import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';
import { verify } from 'jsonwebtoken';
import { JwtAuthPayload } from 'src/auth/interfaces/jwt.interface';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  static jwtSecret: string;
  constructor(configService: ConfigService) {
    WsJwtGuard.jwtSecret = configService.get('JWT_SECRET');
  }

  canActivate(context: ExecutionContext): boolean {
    if (context.getType() !== 'ws') return true;
    const client: Socket = context.switchToWs().getClient();
    WsJwtGuard.validateToken(client);
    return true;
  }

  static validateToken(client: Socket): JwtAuthPayload{
    const { token } = client.handshake.auth;
    // const { authorization } = client?.handshake?.headers;
    if (!token)
      throw new WsException({
        statusCode: 400,
        message: 'Invalid token',
      });
    // const token: string = authorization.split(' ')[1];
    // if (!token) throw new WsException('Invalid token');
    const payload = verify(token, WsJwtGuard.jwtSecret);
    return payload as JwtAuthPayload;
  }
}
