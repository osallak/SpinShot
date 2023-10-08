
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends PrismaClientExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: 'Duplicate unique field',
        });
        break;
      }
      case 'P2003': {
        response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Record not found',
        });
        break;
      }

      default:
        console.log('exceptionCode: ', exception.code);
        super.catch(exception, host);
        break;
    }
  }
}