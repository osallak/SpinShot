import { UserStatus } from "@prisma/client";

export type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  avatar?: string;
  country?: string;
  twoFactorAuth?: boolean;
  status?: UserStatus;
  mailVerified?: boolean;
  is42User?: boolean;
  logs?: any;
  HaveAchievement?: any;
};

export type SerialisedUser = {
    username: string;
    email: string;
    profile: {
        name: {
            givenName: string;
            lastName: string;
        };
        avatar: string;
        country: string;
        rank: number;
        level: number;
    };
    logs: any;
    achievements: any;
}