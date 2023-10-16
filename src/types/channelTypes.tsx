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
