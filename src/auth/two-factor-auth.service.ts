import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Response as EResponse } from 'express';
import { authenticator } from 'otplib';
import { ConfigService } from '@nestjs/config';
import { toFileStream } from 'qrcode';
import { Response } from 'src/global/interfaces';
@Injectable()
export class TwoFactorAuthService {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  public async generateTwoFactorAuthSecret(user: any): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const u = await this.userService.findOneById(user?.id);
        if (u && u.twoFactorAuth) {
          return reject({
            status: 400,
            message: 'QR already generated',
          });
        }
        const secret = authenticator.generateSecret();
        const app_name = this.configService.get('APP_NAME');
        const otpAuthUrl = authenticator.keyuri(
          user.username,
          app_name,
          secret,
        );
        await this.userService.updateData(user.id, {
          twoFactorAuthSecret: secret,
        });
        return resolve({
          status: 200,
          message: 'QR generated',
          data: {
            otpAuthUrl,
            secret,
          },
        });
      } catch (e) {
        return reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }

  public async qrCodeStreamPipe(stream: EResponse, otpAuthUrl: string) {
    return toFileStream(stream, otpAuthUrl);
  }

  public async changeTwoFaStatus(id: string, status: boolean) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.userService.updateData(id, { twoFactorAuth: status });
        return resolve({
          status: 200,
          message: '2FA status changed',
        });
      } catch (e) {
        return reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }

  public async validateTwoFactorAuthCode(
    user: any,
    code: string,
  ): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const u: any = await this.userService.findOneById(user?.id);
        if (!u) {
          return reject({
            status: 404,
            message: 'User not found',
          });
        }
        const isValid = authenticator.verify({
          token: code,
          secret: u?.twoFactorAuthSecret,
        });
        if (isValid) {
          await this.userService.updateData(user?.id, { twoFactorAuth: true });
          return resolve({
            status: 200,
            message: '2FA code is valid',
          });
        } else {
          return reject({
            status: 400,
            message: '2FA code is invalid',
          });
        }
      } catch (e) {
        return reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }
}
