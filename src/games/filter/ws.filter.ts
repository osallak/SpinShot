import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException, HttpException)
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const client: Socket = host.switchToWs().getClient();
    const error =
      exception instanceof WsException
        ? exception.getError()
        : exception.getResponse();
    const details =
      error instanceof Object
        ? { ...error }
        : { event: 'events', statusCode: 500, message: error };//todo: event property should be discussed
    client.send(
      JSON.stringify({
        ...details,
      }),
    );
  }
}
