import { FriendshipStatus } from '@prisma/client';

export type Friendship = {
  userId?: string;
  friendId?: string;
  state?: FriendshipStatus;
  sender?: string;
  blocker?: string;
};
