import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import {
  HOST,
  REJECTION_PATH,
  VERIFICATION_PATH,
} from 'src/global/constants/global.constants';
import { User } from 'src/types';
import { JwtResponse } from 'src/types/common.types';
import { CreateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { FortyTwoDto } from './dto/FortyTwo.dto';
import { JwtAuthPayload } from './interfaces/jwt.interface';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(user: any): Promise<JwtResponse> {
    const payload: JwtAuthPayload = {
      isTwoFactorEnabled: user.twoFactorAuth,
      isTwoFaAuthenticated: user.isTwoFactorAuthenticated,
      username: user.username,
      sub: user.id,
      iss: this.configService.get('JWT_ISSUER'),
    };

    try {
      return {
        token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      throw new InternalServerErrorException('Could not create token');
    }
  }

  async sendMailVerification(user: User): Promise<void> {
    try {
      const token: string = await this.jwtService.signAsync({
        email: user.email,
        iss: this.configService.get('JWT_ISSUER'),
      });

      if (!token) {
        throw new InternalServerErrorException('Could not create token');
      }

      const verifyUrl: string = `${HOST}:${
        this.configService.get('PORT') || 3000
      }${VERIFICATION_PATH}${token}`;

      const rejectUrl: string = `${HOST}:${
        this.configService.get('PORT') || 3000
      }${REJECTION_PATH}${token}`;

      this.mailerService.sendMail({
        to: user.email,
        subject: 'Verify your email',
        text: `verify: ${verifyUrl}
        not you? ${rejectUrl}`, //TODO: change this to a template
      });
    } catch (e) {
      throw new InternalServerErrorException('Could not create token');
    }
  }

  async signUp(user: CreateUserDto): Promise<User> {
    try {
      const returnedUser: User = await this.userService.createUser(user);
      return returnedUser;
    } catch (e) {
      throw e;
    }
  }

  async signIn(username: string, pass: string): Promise<JwtResponse> {
    try {
      const user: User = await this.userService.signIn(username, pass);
      return await this.generateToken(user);
    } catch (e) {
      throw e;
    }
  }

  async verifyOrReject(
    token: string,
    res: Response,
    reject: boolean,
  ): Promise<void> {
    if (!token) throw new BadRequestException();
    try {
      const decoded: any = await this.jwtService.verifyAsync(token);
      if (!decoded) throw new BadRequestException();
      if (!(await this.userService.verifyEmail(decoded.email, reject)))
        throw new BadRequestException();

      !reject
        ? res.redirect(this.configService.get('SIGN_IN_URL'))
        : res.send('account deleted'); //todo: to be discussed
    } catch (error) {
      throw error;
    }
  }

  async registerFortyTwoUser(user: FortyTwoDto): Promise<JwtResponse> {
    const returnedUser = await this.userService.registerFortyTwoUser(user);
    const token: any = await this.generateToken({
      id: returnedUser?.id,
      twoFactorAuth: returnedUser?.twoFactorAuth,
      isTwoFactorAuthenticated: returnedUser?.isTwoFactorAuthenticated,
      username: returnedUser.username,
    } as any);
    return token;
  }
}
