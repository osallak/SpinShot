import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { WsExceptionType } from '../types/exceptions.type';
import { Socket } from 'socket.io';

@Catch(WsException, HttpException)
export class WsExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const client: Socket = host.switchToWs().getClient();
    const error =
      exception instanceof WsException
        ? exception.getError()
        : exception.getResponse();
    const details =
      error instanceof Object
        ? { ...error }
        : { event: 'error', statusCode: 500, message: error };
    client.emit("exception",
      JSON.stringify({
        ...details,
      }),
    );
  }
}



export class WsTypeException extends WsException {
  readonly type: WsExceptionType;
  constructor(type: WsExceptionType, message: string | unknown) {
    const error = {
      type,
      message,
    };
    super(error);
    this.type = type;
  }
}

export class WsBadRequestException extends WsTypeException {
  constructor(message: string | unknown) {
    super('BadRequest', message);
  }
}

export class WsUnauthorizedException extends WsTypeException {
  constructor(message: string | unknown) {
    super('Unauthorized', message);
  }
}

export class WsUnknownException extends WsTypeException {
  constructor(message: string | unknown) {
    super('Unknown', message);
  }
}
