import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Req,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
// import { Request } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('/signup/local')
  // async signupLocal(@Request() userDto: any) {
  //   console.log('inside controller signupLocal');
  //   return await this.authService.signUp(userDto);
  // }

  // @Post('/signin/local')
  // // @UseGuards(LocalAuthGuard)
  // async signinLocal(@Request() req: any) {
  //   return req.user;
  // }

  // @Get('/user')
  // // @UseGuards(JwtAuthGuard)
  // async getUser(@Req() req: any) {
  //   return req.user;
  // }

  @Get()
 logout(): string {
    return 'user logged out';
  }
}
