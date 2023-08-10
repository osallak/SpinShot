import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload } from './interfaces/jwt.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HOST, VERIFICATION_PATH, REJECTION_PATH} from 'src/global/global.constants';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(user: any) {
    const payload: JwtAuthPayload = {
      username: user.username,
      sub: user.id,
      iss: this.configService.get('JWT_ISSUER'),
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async sendMailVerification(user: any) {
    //todo: sign the tokens with a different secrets
    //todo: user a template for the mail

    const token = await this.jwtService.signAsync({
      email: user.email,
      iss: this.configService.get('JWT_ISSUER'),
    });

    if (!token) {
      throw new InternalServerErrorException('Could not create token');
    }

    const verifyUrl = `${HOST}:${
      this.configService.get('PORT') || 3000
    }${VERIFICATION_PATH}${token}`;

    const rejectUrl = `${HOST}:${
      this.configService.get('PORT') || 3000
    }${REJECTION_PATH}${token}`;

    this.mailerService.sendMail({
      to: user.email,
      subject: 'Verify your email',
      text: `verify: ${verifyUrl}
      not you? ${rejectUrl}`, //TODO: change this to a template
    });
  }

  async signUp(user: CreateUserDto) {
    const returnedUser = await this.userService.signUp(user);
    if (!returnedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    try {
      await this.sendMailVerification(returnedUser);
      return returnedUser;
    } catch (e) {
      this.logger.error(e.message ?? 'Could not send verification email');
      throw new InternalServerErrorException(
        'Could not send verification email',
      );
    }
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.signIn(username, pass);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.mailVerified === false) {
      try {
        await this.sendMailVerification(user);
      } catch (e) {
        this.logger.error(e.message ?? 'Could not send verification email');
        throw new InternalServerErrorException(
          'Could not send verification email',
        );
      }
      throw new UnauthorizedException('Email not verified'); //TODO: to be discussed with frontend team
    }

    return await this.generateToken(user);
  }

  async verifyEmail(token: string, res: any, reject: boolean) {
    if (!token) throw new BadRequestException();
    try {
      const decoded: any = await this.jwtService.verifyAsync(token);
      if (!decoded) throw new BadRequestException();

      if (!(await this.userService.verifyEmail(decoded.email, reject))) {
        throw new BadRequestException();
      }

      !reject
        ? res.redirect(this.configService.get('SIGN_IN_URL'))
        : res.send('account deleted');
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException();
    }
  }
}
