import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

export const SignupDoc = () =>
  applyDecorators(
    ApiTags('local auth'),
    ApiCreatedResponse({
      description: 'object with user mail and username',
    }),
    ApiConflictResponse({
      status: 409,
      description: 'duplicate unique field',
    }),
  );

export const SigninDoc = () =>
  applyDecorators(
    ApiTags('local auth'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            default: 'john_doe',
          },
          password: {
            type: 'string',
            default: 'password',
          },
        }
      }
    }),
    ApiResponse({
      status: 201,
      description: 'object with jwt token',
      content: {
        schema: {
          example: {
            token: 'jwt token',
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Invalid credentials or email not verified',
    }),
  );
