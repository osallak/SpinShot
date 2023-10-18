interface userChannelCredentials {
  id: string;
  username: string;
  avatar: string;
}

interface channelMessage {
  message: string;
  user: userChannelCredentials;
  sentAt: string;
}

export default interface channelType {
  id: string;
  type: string;
  messages: channelMessage[];
}

interface user {
  avatar: string;
  username: string;
}
export interface usersListType {
  user: user;
  userId: string;
  userStatus: string;
  muteDuration:string;
  mutedAt: string;
}
