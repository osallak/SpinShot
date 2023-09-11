import { Controller, Get, Post, Param, UseGuards, Query } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { UserDecorator } from 'src/global/decorators/global.decorators';
import { PaginationResponse, Response } from 'src/global/interfaces';
import { User } from 'src/types/user.types';
import { FriendsQueryDto } from './dto/pagination.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('friends')
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiResponse({
    status: 201,
    schema: {
      example: {
        status: 201,
        message: 'Added successfully',
      },
    },
  })
  @ApiBearerAuth()
  @Post('add/:id')
  @UseGuards(JwtAuthGuard)
  async addFriend(
    @Param('id') id: string,
    @UserDecorator() user: User,
  ): Promise<Response> {
    return await this.friendsService.addFriend(id, user.id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description:
      'an object holding an array of friends and  pagination metadata',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getFriends(
    @UserDecorator() user: User,
    @Query() query: FriendsQueryDto,
  ): Promise<PaginationResponse<any>> {
    return await this.friendsService.getAll(user, query);
  }

  @ApiBearerAuth()
  @ApiResponse({
    schema: {
      example: {
        status: 201,
        description: 'friend request accepted',
      },
    },
  })
  @Post('/accept/:id')
  @UseGuards(JwtAuthGuard)
  accept(
    @Param('id') id: string,
    @UserDecorator() user: User,
  ): Promise<Response> {
    return this.friendsService.accept(user.id, id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    schema: {
      example: {
        status: 201,
        message: 'user blocked successfully',
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('/block/:id')
  block(
    @Param('id') id: string,
    @UserDecorator() user: User,
  ): Promise<Response> {
    return this.friendsService.block(user.id, id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    schema: {
      example: {
        status: 201,
        message: 'user unblocked successfully',
      },
    },
  })
  @Post('/unblock/:id')
  @UseGuards(JwtAuthGuard)
  unblock(
    @Param('id') id: string,
    @UserDecorator() user: User,
  ): Promise<Response> {
    return this.friendsService.unblock(user.id, id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    schema: {
      example: {
        status: 201,
        message: 'friend removed successfully',
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('/unfriend/:id')
  async unfriend(@Param('id') id: string, @UserDecorator() user: User): Promise<Response> {
    return this.friendsService.unfriend(user.id, id);
    
  }
}
