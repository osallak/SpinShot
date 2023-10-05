import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { JwtAuthGuard } from './guards';
import { Response, Request } from 'express';
import { stat } from 'fs';

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
	async turnOnTwoFactorAuth(@Req() request: Request, @Res() response: Response, @Body('code') code: string) {
		try {
			const res = await this.twoFactorAuthService.validateTwoFactorAuthCode(request?.user, code);
			return response.status(res.status).send(res.message);
		} catch(e) {
			return response.status(e.status).send(e.message);
		}
	}

}
