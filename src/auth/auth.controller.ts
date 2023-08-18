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
import { CreateUserDto, SignInUserDto } from 'src/user/dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { FortyTwoAuthGuard } from './guards/42-auth.guard';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiExcludeEndpoint,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Sign } from 'crypto';
import { JwtResponse } from 'src/types';

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
    const ret = await this.authService.signUp(userDto);
    res.status(HttpStatus.CREATED).send(ret);
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
  async signinLocal(@Body() user: SignInUserDto): Promise<JwtResponse> {
    const ret = await this.authService.signIn(user.username, user.password);
    return ret;
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
