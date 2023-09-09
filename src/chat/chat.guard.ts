import { CanActivate, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { WsUnauthorizedException } from './exceptions/ws-exceptions';
@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken =
      context.args[0].handshake.headers?.authorization?.split(' ')[1];
    try {
      const decoded = jwt.verify(
        bearerToken,
        this.configService.get('JWT_SECRET'),
      ) as any;
      console.log(decoded);
      return new Promise((resolve, reject) => {
        return this.userService
          .findOneByUsername(decoded.username)
          .then((user) => {
            if (user) {
              const { iat, expt } = decoded;
              const timeDiff = expt - iat;
              if (timeDiff <= 0) {
                reject(new WsUnauthorizedException('Token Expired'));
              } else {
                resolve(user);
              }
            } else {
              reject(new WsUnauthorizedException('Invalid User'));
            }
          });
      });
    } catch (ex) {
      return false;
    }
  }
}
