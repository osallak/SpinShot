import { CanActivate, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { WsUnauthorizedException } from './exceptions/ws-exceptions';
import { ANONYMOUS_USER_MESSAGE } from './chat.configuration';
@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  canActivate(context: any): boolean | any | Promise<boolean | any> {
    const bearerToken =
    // context.args[0].handshake.headers?.authorization?.split(' ')[1];
    context.args[0].handshake.auth['token'];
    try {
      const decoded = jwt.verify(
        bearerToken,
        this.configService.get('JWT_SECRET'),
      ) as any;
      return new Promise((resolve, reject) => {
        return this.userService
          .findOneByUsername(decoded.username)
          .then((user) => {
            if (user) {
              resolve(user);
            } else {
              reject(new WsUnauthorizedException(ANONYMOUS_USER_MESSAGE));
            }
          })
          .catch(() => {
            reject(new WsUnauthorizedException(ANONYMOUS_USER_MESSAGE));
          })
      });
    } catch (ex) {
      throw new WsUnauthorizedException(ANONYMOUS_USER_MESSAGE);
    }
  }
}
