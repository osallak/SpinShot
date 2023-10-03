import {
  Controller,
  Get,
  UseGuards,
  Param,
  Query,
  Patch,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { UserService } from '../user.service';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerialisedUser, User } from 'src/types';
import { PaginationResponse } from 'src/global/interfaces';
import { UserDecorator } from 'src/global/decorators/global.decorators';
import { JwtPayload } from 'jsonwebtoken';
import { SearchDto } from '../dto/search.dto';
import { GetProfileDoc, GetUserGamesDoc, SearchDoc, UpdateUserDoc } from '../swagger/user.swagger';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SearchDoc()
  @Get()
  async search(
    @Query() query: SearchDto,
    @UserDecorator() user: User,
  ): Promise<PaginationResponse<User[]>> {
    return await this.userService.search(query);
  }

  @GetProfileDoc()
  @UseGuards(JwtAuthGuard)
  @Get('/profile/:username')
  async getUser(@Param('username') username: string): Promise<SerialisedUser> {
    return await this.userService.getUser(username);
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
