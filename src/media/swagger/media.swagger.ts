import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

export const MediaDoc = () =>
  applyDecorators(
    ApiTags('users'),
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiResponse({ status: 200, description: 'File uploaded successfully' }),
    ApiBadRequestResponse({
      description:
        'File size should not exceed 5m and should be of type jpeg or png',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
