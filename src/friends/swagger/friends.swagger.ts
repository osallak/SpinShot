import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';

export const AddFriendDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiCreatedResponse({
      schema: {
        example: {
          message: 'Added successfully',
        },
        description: 'add user by id',
      },
    }),
  );

export const GetFriendsDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description:
        'an object holding an array of friends with pagination metadata',
    }),
  );

export const AcceptFriendDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      schema: {
        example: {
          status: 201,
          description: 'friend request accepted',
        },
      },
    }),
  );

export const BlockFriendDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      schema: {
        example: {
          status: 201,
          description: 'user blocked successfully',
        },
      },
    }),
  );

export const UnblockFriendDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      schema: {
        example: {
          status: 201,
          description: 'user unblocked successfully',
        },
      },
    }),
  );

export const UnfriendDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      schema: {
        example: {
          status: 201,
          description: 'friend removed successfully',
        },
      },
    }),
  );
