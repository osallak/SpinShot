interface user {
    avatar: string;
    id: string;
    username: string;
  }
  
export default interface individualType {
    message: string;
    other: user;
    sender: string;
    sentAt: string;
}

