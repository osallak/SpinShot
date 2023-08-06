import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Req,
  Body,
  UseGuards,
  Res,
  Param,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { FortyTwoAuthGuard } from './guards/42-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup/local')
  async signupLocal(@Body() userDto: CreateUserDto, @Res() res: any) {
    await this.authService.signUp(userDto);
    res.status(201).send();
  }

  @Post('/signin/local')
  @UseGuards(LocalAuthGuard)
  async signinLocal(@Body() user: any) {
    return await this.authService.signIn(user.username, user.password);
  }

  @Get('verify')
  async verifyEmail(@Req() req: Request, @Res() res: any) {
    console.log('reqToken: ', req.query.token);
    await this.authService.verifyEmail(req.query.token as string, res);
  }

  @Get('42')
  @UseGuards(FortyTwoAuthGuard)
  login42() {
    //? this will redirect to 42 login page
  }

  @Get('42/cb')
  @UseGuards(FortyTwoAuthGuard)
  async login42Callback(@Req() req: any, @Res() res: any) {
    res.cookie('jwt', 'test');
    res.redirect(`http://localhost:3000/auth/test`);
  }
  //the following routes are for testing purposes
  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req: any) {
    return req.user;
  }

  @Get('/test')
  // @UseGuards(FortyTwoAuthGuard)
  async test(@Req() req: any): Promise<any> {
    console.log(req.cookies);
    return req.cookies;
  }
}
