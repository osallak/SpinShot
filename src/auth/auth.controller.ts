import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserDecorator } from 'src/global/decorators/global.decorators';
import { JwtResponse, User } from 'src/types';
import { CreateUserDto } from 'src/user/dto';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './guards/42-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SigninDoc, SignupDoc } from './swagger/auth.swagger';
import { FortyTwoDto } from './dto/FortyTwo.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @SignupDoc()
  @Post('/local/signup')
  async signupLocal(
    @Body() userDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const user: User = await this.authService.signUp(userDto);
    res.json(user).send();
  }

  @SigninDoc()
  @Post('/local/signin')
  @UseGuards(LocalAuthGuard)
  async signinLocal(@Req() req: Request): Promise<JwtResponse> {
    return (<any>req).user;
  }

  @ApiExcludeEndpoint()
  @Get('verify')
  async verifyEmail(
    @Res() res: Response,
    @Query('token') token: string,
  ): Promise<void> {
    await this.authService.verifyOrReject(token, res, false);
  }

  @ApiExcludeEndpoint()
  @Get('reject')
  async rejectMailVerification(
    @Res() res: Response,
    @Query('token') token: string,
  ) {
    await this.authService.verifyOrReject(token as string, res, true);
  }
  @ApiTags('42')
  @Get('42')
  @UseGuards(FortyTwoAuthGuard)
  async login42(
    @Req() req: Request,
    @Res() res: Response,
    @UserDecorator() user: FortyTwoDto,
  ): Promise<any> {
    try {
      const { token } = await this.authService.registerFortyTwoUser(user);
      return res.status(200).json({ token: token });
    } catch (e) {
      return res.status(500).send('Internal Server Error');
    }

  }


}
