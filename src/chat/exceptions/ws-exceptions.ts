import { WsException } from '@nestjs/websockets';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { Catch, ArgumentsHost } from '@nestjs/common';
import { WsExceptionType } from '../types/exceptions.type';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class WsExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
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
