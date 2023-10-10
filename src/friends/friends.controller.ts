import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { UserDecorator } from 'src/global/decorators/global.decorators';
import { PaginationResponse, Response } from 'src/global/interfaces';
import { User } from 'src/types/user.types';
import { FriendsQueryDto } from './dto/pagination.dto';
import { FriendsService } from './friends.service';
import { FriendsGuard } from './guards/friends.guard';
import {
  AcceptFriendDoc,
  AddFriendDoc,
  BlockFriendDoc,
  GetFriendsDoc,
  RejectDoc,
  UnblockFriendDoc,
  UnfriendDoc,
} from './swagger/friends.swagger';

@ApiTags('friends')
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @AddFriendDoc()
  @Post('add/:id')
  @UseGuards(JwtAuthGuard, FriendsGuard)
  async addFriend(
    @Param('id') id: string,
    @UserDecorator() user: User,
  ): Promise<Response> {
    return await this.friendsService.addFriend(id, user.id);
  }

  @GetFriendsDoc()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getFriends(
    @UserDecorator() user: User,
    @Query() query: FriendsQueryDto,
  ): Promise<PaginationResponse<any>> {
    return await this.friendsService.getAll(user, query);
  }

  @AcceptFriendDoc()
  @Post('/accept/:id')
  @UseGuards(JwtAuthGuard, FriendsGuard)
  accept(
    @Param('id') id: string,
    @UserDecorator() user: User,
  ): Promise<Response> {
    return this.friendsService.accept(user.id, id);
  }

  @BlockFriendDoc()
  @UseGuards(JwtAuthGuard, FriendsGuard)
  @Post('/block/:id')
  block(
    @Param('id') id: string,
    @UserDecorator() user: User,
  ): Promise<Response> {
    return this.friendsService.block(user.id, id);
  }

  @UnblockFriendDoc()
  @Post('/unblock/:id')
  @UseGuards(JwtAuthGuard)
  unblock(
    @Param('id') id: string,
    @UserDecorator() user: User,
  ): Promise<Response> {
    return this.friendsService.unblock(user.id, id);
  }

  @UnfriendDoc()
  @UseGuards(JwtAuthGuard, FriendsGuard)
  @Post('/unfriend/:id')
  async unfriend(
    @Param('id') id: string,
    @UserDecorator() user: User,
  ): Promise<Response> {
    return this.friendsService.unfriend(user.id, id);
  }

  @Post('/reject/:id')
  @RejectDoc()
  async reject(
    @Param('id') id: string,
    @UserDecorator() user: User,
  ): Promise<Response> {
    return this.friendsService.reject(user.id, id);
  }
}
