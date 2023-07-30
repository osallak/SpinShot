import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
  Res,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload } from './interfaces/jwt.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async createToken(user: any) {
    const payload: JwtAuthPayload = {
      username: user.username,
      sub: user.id,
      iss: 'Transcendence',
    };

    return { token: await this.jwtService.signAsync(payload) };
  }

  async sendMailVerification(user: any) {
    const verificationToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      iss: 'Transcendence',
    });

    if (!verificationToken) {
      throw new InternalServerErrorException('Could not create token');
    }

    const url = `https://localhost:3000/auth/verify?token=${verificationToken}`; //TODO: change in production
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Verify your email',
      text: url,
    });
  }
  async signUp(user: CreateUserDto) {
    const returnedUser = await this.userService.signUp(user);
    if (!returnedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    try {
      await this.sendMailVerification(returnedUser);
    } catch (e) {
      this.logger.error(e.message ?? 'Could not send verification email');
      throw new InternalServerErrorException('Could not send verification email');
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
      } catch(e) {
        this.logger.error(e.message ?? 'Could not send verification email');
        throw new InternalServerErrorException('Could not send verification email');
      }
      throw new UnauthorizedException('Email not verified'); //TODO: to be discussed with frontend 
    }

    return await this.createToken(user);
  }

  async sendMail(user: any) {}

  async verifyEmail(token: string, res: any) {
    this.logger.verbose(token);
    if (!token) {
      throw new BadRequestException();
    }
    try {
      const decoded: any = await this.jwtService.verifyAsync(token);
      if (!decoded) {
        throw new BadRequestException();
      }

      if (!(await this.userService.verifyEmail(decoded.email))) {
        throw new BadRequestException();
      }

      res.redirect('https://youtube.com'); //TODO: change to frontend url
    } catch (e) {
      this.logger.error(e.message);
      throw new BadRequestException();
    }
  }
}
