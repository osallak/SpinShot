import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { FortyTwoAuthGuard } from './guards/42-auth.guard';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/signup/local')
  async signupLocal(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const ret = await this.authService.signUp(userDto);
    res.status(HttpStatus.CREATED).send(ret);
    // return 'test success';
  }

  @Post('/signin/local')
  @UseGuards(LocalAuthGuard)
  async signinLocal(@Body() user: any) {
    return await this.authService.signIn(user.username, user.password);
  }

  @Get('verify')
  async verifyEmail(@Req() req: Request, @Res() res: any) {
    await this.authService.verifyEmail(req.query.token as string, res, false);
  }
  @Get('reject')
  async rejectMailVerification(@Req() req: Request, @Res() res: any) {
    await this.authService.verifyEmail(req.query.token as string, res, true);
  }

  @Get('42')
  @UseGuards(FortyTwoAuthGuard)
  login42() {}

  @Get('42/cb')
  @UseGuards(FortyTwoAuthGuard)
  async login42Callback(@Req() req: any, @Res() res: any) {
    console.log(req);
    res.cookie('jwt', 'test'); //todo: replace with jwt token
    res.redirect(this.configService.get('FRONTEND_ORIGIN'));
  }

}
