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
  User: user;
  muteDuration:any;
  mutedAt: any;
  userId: string;
  userRole: string;
  userStatus: any;
}
