import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { JwtAuthGuard } from './guards';
import { Response, Request, response } from 'express';
import { stat } from 'fs';
import { TwoFaAuthDto } from './dtos/two-fa-auth.dto';

@ApiTags('2Fa')
@Controller('2fa')
export class TwoFactorAuthController {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('generate-qr')
  async generateQrCode(@Res() response: Response, @Req() request: Request) {
    try {
      const { data } =
        await this.twoFactorAuthService.generateTwoFactorAuthSecret(
          request?.user,
        );
      response.setHeader('content-type', 'image/png');
      return this.twoFactorAuthService.qrCodeStreamPipe(
        response,
        data?.otpAuthUrl,
      );
    } catch (e) {
      return response.status(e.status).send(e.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('turn-on-qr')
  async turnOnTwoFactorAuth(
    @Req() request: Request,
    @Res() response: Response,
    @Body() code: TwoFaAuthDto,
  ) {
    try {
      const res = await this.twoFactorAuthService.validateTwoFactorAuthCode(
        request?.user,
        code,
        true,
      );
      return response.status(res.status).send(res.message);
    } catch (e) {
      return response.status(e.status).send(e.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('turn-off-qr')
  async turnOffTwoFactorAuth(
    @Req() request: Request,
    @Res() response: Response,
    @Body() code: TwoFaAuthDto,
  ) {
    try {
      const res = await this.twoFactorAuthService.validateTwoFactorAuthCode(
        request?.user,
        code,
        false,
      );
      return response.status(res.status).send(res.message);
    } catch (e) {
      return response.status(e.status).send(e.message);
    }
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('authenticate')
  async authenticate(
    @Req() request: Request,
    @Res() response: Response,
    @Body() code: TwoFaAuthDto,
  ) {
    try {
      const res = await this.twoFactorAuthService.authenticateTwoFactorAuth(
        request?.user,
        code,
      );
      return response.status(res.status).json(res?.data);
    } catch (e) {
      return response.status(e.status).send(e.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('signOut')
  async signOut(@Req() request: Request, @Res() response: Response) {
    try {
      const res = await this.twoFactorAuthService.signOut(
        (request?.user as any)?.id,
      );
      return response.status(res.status).json(res.message);
    } catch (e) {
      return response.status(e.status).send(e.message);
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('status')
  async getTwoFaStatus(@Req() request: Request, @Res() response: Response) {
    try {
      const res = await this.twoFactorAuthService.getTwoFaStatus(
        (request?.user as any)?.id,
      );
      return response.status(res.status).json(res?.data);
    } catch (e) {
      return response.status(e.status).send(e.message);
    }
  }
}
