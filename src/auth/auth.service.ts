import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(user: any) {
    const payload: JwtAuthPayload = {
      username: user.username,
      sub: user.id,
      iss: 'Transcendence',
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(user: CreateUserDto) {
    this.logger.verbose('entred');
    const returnedUser = await this.userService.signUp(user);
    if (!returnedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    this.logger.log('new user: ' + returnedUser.username);
    return await this.createToken(returnedUser);
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.signIn(username, pass);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    this.logger.log('new signin from: ' + user.username);
    return await this.createToken(user);
  }
}
