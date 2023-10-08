export default interface dataConversation {
  sentAt: string;
  sender: string;
  message: string;
}

interface other {
  avatar: string;
  id: string;
  username: string;
}

export default interface dataSubSideBar {
  message: string;
  other: other;
  sender: string;
  sentAt: string;
}
