import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { FriendsGuard } from 'src/friends/guards/friends.guard';
import { UserDecorator } from 'src/global/decorators/global.decorators';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';
import { PaginationResponse } from 'src/global/interfaces';
import { SerialisedUser, User } from 'src/types';
import { SearchDto } from '../dto/search.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { GetProfileDoc, GetUserGamesDoc, SearchDoc, UpdateUserDoc } from '../swagger/user.swagger';
import { UserService } from '../user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SearchDoc()
  @Get()
  async search(
    @Query() query: SearchDto,
  ): Promise<PaginationResponse<User[]>> {
    return await this.userService.search(query);
  }

  @GetProfileDoc()
  @UseGuards(JwtAuthGuard, FriendsGuard)
  @Get('/profile/:id')
  async getUser(@Param('id') id: string): Promise<SerialisedUser> {
    return await this.userService.getUser(id);
  }

  @GetUserGamesDoc()
  @UseGuards(JwtAuthGuard)
  @Get('/games/:username')
  async getUserGames(
    @Param('username') username: string,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginationResponse<any>> {
    return await this.userService.getUserGames(username, query);
  }

  @UpdateUserDoc()
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(
    @UserDecorator() user: User,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(user.id, body);
  }
}
