export const CHAT_PORT = 8001;

export const OPTIONS = {
  cors: {
    origin: '*',
  },
  namespace: 'chat',
};

export const PRIVATE_MESSAGE = 'pm';
export const GROUP_MESSAGE = 'gm';
export const MESSAGE_SENT = 'lsm';
export const EXCEPTION = 'exception';
export const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal Server Error';
export const BAD_REQUEST = 'Bad Request';
export const USER_BLOCKED_MESSAGE = 'User Is Blocked';
export const USER_SOCKETS_MESSAGE = 'User Does Not Have Sockets';
export const INVALID_DATA_MESSAGE = 'Invalid Data';
export const USER_DOESNT_EXIST_MESSAGE = 'User Does Not Exist';
export const ANONYMOUS_USER_MESSAGE = 'User Is Not a Friend of Yours';
export const INVALID_TOKEN_MESSAGE = 'Token Is Invalid';