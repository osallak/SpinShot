import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response as EResponse } from 'express';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'src/global/interfaces';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { TwoFaAuthDto } from './dtos/two-fa-auth.dto';
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
    code: TwoFaAuthDto,
    status: boolean,
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
        if (status && u.twoFactorAuth) {
          return reject({
            status: 400,
            message: '2FA is already enabled',
          });
        }
        if (!status && !u.twoFactorAuth) {
          return reject({
            status: 400,
            message: '2FA is already disabled',
          });
        }
        let isValid = false;
        if (u?.twoFactorAuthSecret) {
          isValid = authenticator.verify({
            token: code.code,
            secret: u.twoFactorAuthSecret,
          });
        }
        let update = { twoFactorAuth: status };
        if (status === false) {
          update['twoFactorAuthSecret'] = null;
        }
        if (isValid) {
          await this.userService.updateData(user?.id, update);
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

  public async authenticateTwoFactorAuth(
    user: any,
    code: TwoFaAuthDto,
  ): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        const u: any = await this.userService.findOneById(user?.id);
        const isValid = authenticator.verify({
          token: code.code,
          secret: u?.twoFactorAuthSecret,
        });
        if (!isValid) {
          return reject({
            status: 400,
            message: '2FA code is invalid',
          });
        }
        await this.userService.updateData(user?.id, {
          isTwoFactorAuthenticated: true,
        });
        const accessToken = await this.authService.generateToken(u);
        resolve({
          status: 200,
          message: '2FA code is valid',
          data: accessToken,
        });
      } catch (e) {
        return reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }

  async getTwoFaStatus(userId: string): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!userId) {
          return reject({
            status: 400,
            message: 'User not found',
          });
        }
        const user = await this.userService.findOneById(userId);
        if (!user) {
          return reject({
            status: 400,
            message: 'User not found',
          });
        }
        return resolve({
          status: 200,
          message: '2FA status',
          data: user.twoFactorAuth,
        });
      } catch (e) {
        return reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }
  async signOut(userId: string): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!userId) {
          return reject({
            status: 400,
            message: 'User not found',
          });
        }
        await this.userService.updateData(userId, {
          isTwoFactorAuthenticated: false,
        });
        return resolve({
          status: 200,
          message: 'Signed out successfully',
        });
      } catch {
        return reject({
          status: 500,
          message: 'Internal Server Error',
        });
      }
    });
  }
}
