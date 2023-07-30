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

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req: any) {
    return req.user;
  }

  @Get('verify')
  async verifyEmail(@Req() req: Request, @Res() res: any) {
   await this.authService.verifyEmail(req.query.token as string, res);
  }

  @Get('/test')
  @UseGuards(JwtAuthGuard)
  async test(): Promise<any> {
    return 'test success';
  }
}
