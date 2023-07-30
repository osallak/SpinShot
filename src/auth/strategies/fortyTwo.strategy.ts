import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { FortyTwoProfile } from '../interfaces';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientId: configService.get<string>('INTRA_CLIENT_ID'),
      clientSecret: configService.get<string>('INTRA_APP_SECRET'),
      callbackUrl: configService.get<string>('CALLBACK_URL'),
      // profileFields: {
      //     'username': 'login',
      //     'name.familyName': 'last_name',
      //     'name.givenName': 'first_name',
      //     'emails.0.value': 'email',
      //     'photos.0.value': ''
      // }
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    //? here goes the logic for validating user
    return true;
  }
}
