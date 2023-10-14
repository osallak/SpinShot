export default interface dataConversation {
  sentAt: string;
  sender: string;
  message: string;
}

export default interface dataSubSideBar {
  message: string;
  other: user;
  sender: string;
  sentAt: string;
}


// -------------------individual Object----------------------
interface user {
  avatar: string;
  id: string;
  username: string;
}

export interface individualData {
  message: string;
  other: user;
  sender: string;
  sentAt: string;
}
// -------------------individual Object----------------------



// ---------------------rooms Object-----------------------
interface userRoomCredentials {
  id: string;
  username: string;
  avatar: string;
}

interface roomMessage {
  message: string;
  user: userRoomCredentials
  sentAt: string;
}

export interface roomsData {
  id: string;
  type: string;
  messages: roomMessage;
}
// ---------------------rooms Object-----------------------



// --------------------------all Objects----------------------------
export default interface allMessagesType {
  individual: individualData[];
  room: roomsData[];
}
// --------------------------all Objects----------------------------
