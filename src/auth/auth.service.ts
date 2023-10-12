import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger
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
import { JwtAuthPayload } from './interfaces/jwt.interface';
import { FortyTwoDto } from './dto/FortyTwo.dto';
@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(
    user: any,
    isTwoFaAuthenticated: boolean,
  ): Promise<JwtResponse> {
    const payload: JwtAuthPayload = {
      isTwoFaAuthenticated,
      isTwoFactorEnabled: user.twoFactorAuth,
      username: user.username,
      sub: user.id,
      iss: this.configService.get('JWT_ISSUER'),
    };

    try {
      return {
        token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new InternalServerErrorException('Could not create token');
    }
  }

  async sendMailVerification(user: User): Promise<void> {
    //todo: sign the tokens with a different secrets
    //todo: user a template for the mail

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
      this.logger.error(e.message);
      throw new InternalServerErrorException('Could not create token');
    }
  }

  async signUp(user: CreateUserDto): Promise<User> {
    try {
      const returnedUser: User = await this.userService.createUser(user);
      await this.sendMailVerification(returnedUser);
      return returnedUser;
    } catch (e) {
      this.logger.error(e.message);
      throw e;
    }
  }

  async signIn(
    username: string,
    pass: string,
    isTwoFaAuthenticated: boolean,
  ): Promise<JwtResponse> {
    try {
      const user: User = await this.userService.signIn(username, pass);
      return await this.generateToken(user, isTwoFaAuthenticated);
    } catch (e) {
      this.logger.error(e.message);
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
      this.logger.error(error.message);
      throw error;
    }
  }


  async registerFortyTwoUser(user: FortyTwoDto): Promise<JwtResponse> {
    const returnedUser = await this.userService.registerFortyTwoUser(user);
    return await this.generateToken({
      username: returnedUser.username,
      sub: returnedUser.id,
    } as JwtAuthPayload, false);
  }
}
