import { PaginationResponse } from 'src/global/interfaces/global.intefraces';
import { SerialisedUser, User } from 'src/types';

export function serializeUser(user: User): SerialisedUser {
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

export function serializePaginationResponse<T>(
  data: T,
  totalCount: number,
  pageSize: number,
): PaginationResponse<T> {
  return {
    data,
    pagination: {
      pageCount: Math.ceil(totalCount / pageSize),
      totalCount: totalCount,
      pageSize: pageSize,
    },
  };
}
