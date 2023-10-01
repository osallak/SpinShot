import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerialisedUser } from 'src/types';
import { UpdateUserDto } from '../dto/update-user.dto';

export const SearchDoc = () =>
  applyDecorators(
    ApiTags('user'),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description: 'Search users',
      content: {
        schema: {
          example: {
            data: [
              {
                id: '62a6ddee-9308-4bbc-a819-5064597383a3',
                username: 'osallak',
                email: 'oussamasallak1@gmail.com',
                avatar: 'https://cdn.discordapp.com/avatars/6226/2626.png',
                firstName: 'Oussama',
                lastName: 'Sallak',
              },
            ],
          },
        },
      },
    }),
  );

export const GetProfileDoc = () =>
  applyDecorators(
    ApiTags('user'),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      schema: {
        example: {
          id: '62a6ddee-9308-4bbc-a819-5064597383a3',
          username: 'osallak',
          email: 'oussamasallak1@gmail.com',
          profile: {
            name: {
              givenName: 'Oussama',
              lastName: 'Sallak',
            },
            avatar: 'https://cdn.discordapp.com/avatars/6226/2626.png',
            country: 'Morocco',
            rank: 'VETERAN',
            level: 1,
          },
        },
      },
    }),
  );


  export const GetUserGamesDoc = () =>
  applyDecorators(
    ApiTags('user'),
    ApiBearerAuth(),
    ApiResponse({
        status: 200,
        description: 'Get user games by username (pagination',
    })
);


export const UpdateUserDoc = () =>
applyDecorators(
    ApiTags('user'),
    ApiBearerAuth(),
    ApiCreatedResponse({
        description: 'Update user by username',
    }),
    ApiBody({
        type: UpdateUserDto,
    }),
);