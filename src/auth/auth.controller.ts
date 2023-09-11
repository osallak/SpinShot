import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  UseGuards,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { FortyTwoAuthGuard } from './guards/42-auth.guard';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';
import { ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtResponse, User } from 'src/types';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'object with user mail and username',
  })
  @ApiTags('local auth')
  @Post('/signup/local')
  async signupLocal(
    @Body() userDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const user: any = await this.authService.signUp(userDto);
    res.json(user).send();
  }

  @ApiTags('local auth')
  @ApiResponse({
    status: 201,
    description: 'object with jwt token',
    content: {
      schema: {
        example: {
          token: 'jwt token',
        },
      },
    },
  })
  @Post('/signin/local')
  @UseGuards(LocalAuthGuard)
  async signinLocal(@Req() req: Request): Promise<JwtResponse> {
    console.log((<any>req).user);
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
  login42(): void {}

  @ApiExcludeEndpoint()
  @Get('42/cb')
  @UseGuards(FortyTwoAuthGuard)
  async login42Callback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    res.cookie('jwt', 'test'); //todo: replace with jwt token
    res.redirect(this.configService.get('FRONTEND_ORIGIN'));
  }
}
