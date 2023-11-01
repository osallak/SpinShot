import { SerialisedUser, User } from 'src/types';
import { PaginationResponse } from '../interfaces';

export class SerializeService {
  public serializeUser(user: User): SerialisedUser {
    return {
      username: user.username,
      email: user.email,
      profile: {
        name: {
          givenName: user.firstName ?? null,
          lastName: user.lastName ?? null,
        },
        avatar: user.avatar,
        country: user.country || null,
        rank: user.logs.rank,
        level: user.logs.level,
      },
      logs: user.logs,
      achievements: user.HaveAchievement,
    };
  }

  public serializePaginationResponse<T>(
    data: T,
    totalCount: number,
    pageSize: number,
  ): PaginationResponse<T> {
    return {
      data,
      pagination: {
        pageCount: Math.ceil(totalCount / pageSize),
        totalCount: totalCount,//total count of all the data
        pageSize: pageSize,
      },
    };
  }
}

export const serializeService = new SerializeService();
