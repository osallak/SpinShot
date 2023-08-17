import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { FortyTwoProfile } from '../interfaces';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid';
import { HOST } from 'src/global/constants/global.constants';
@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('INTRA_CLIENT_ID'),
      clientSecret: configService.get('INTRA_APP_SECRET'),
      callbackURL: `${HOST}:${configService.get('PORT') || 3000}/auth/42/cb`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const {
      username,
      name: { familyName, givenName },
      _json: { image },
      emails: [{ value }],
    } = profile as FortyTwoProfile;

    const country: string = profile._json.campus[0].country;
    const data = {
      username: username,
      email: value,
      firstName: givenName,
      lastName: familyName,
      avatar: image.link,
      country: country,
    };

    let user = await this.userService.findOneByEmail(value);
    if (user && ((user.mailVerified && !user.is42User) || !user.mailVerified)) {
      return await this.userService.mergeAccounts(data);
    } else if (user && user.is42User) {
      return user;
    }

    user = await this.userService.findOneByUsername(username);
    if (user && !user.is42User) {
      const newUsername = `${username}-${uuidv4()}`;
      return await this.userService.create42User({
        ...data,
        username: newUsername,
      });
    } 
    return user ??  await this.userService.create42User(data);
  }
}
