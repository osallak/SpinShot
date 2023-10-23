export default interface IMsgDataTypes {
    from: string;
    to: string;
    content: string;
    timestamp: string;
  }


  export interface sendRoomMessageDto {
    from: string;
    roomName: string;
    content: string;
    timestamp: string;
  }