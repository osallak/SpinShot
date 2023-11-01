import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { HOST } from 'src/global/constants/global.constants';
import { User } from 'src/types';
import { FortyTwoProfile } from '../interfaces';
import { UserService } from 'src/user/user.service';
@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(configService: ConfigService, private readonly userService:UserService) {
    super({
      clientID: configService.get('INTRA_CLIENT_ID'),
      clientSecret: configService.get('INTRA_APP_SECRET'),
      callbackURL: configService.get('INTRA_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<User> {
    const {
      username,
      name: { familyName, givenName },
      _json: { image },
      emails: [{ value }],
    } = profile as FortyTwoProfile;

    const country: string = profile._json.campus[0].country;
    const user =  {
      username: username,
      email: value,
      firstName: givenName,
      lastName: familyName,
      avatar: image.link,
      country: country,
    } as User;
    return user;
  }
}
