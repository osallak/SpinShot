

interface userType {
  avatar: string;
  id: string;
  username: string;
}

interface messagesType {
  message: string;
  sentAt: string;
  user: userType;
}

export default interface conversationChannelType {
  messages: messagesType[]
}
