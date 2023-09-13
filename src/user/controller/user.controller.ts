import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  Query,
  Patch,
  Body,
  ConsoleLogger,
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

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('search')
  async search(
    @Query() query: SearchDto,
    @UserDecorator() user: User,
  ): Promise<PaginationResponse<User[]>> {
    return await this.userService.search(query);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Get user by username' })
  @Get('/profile/:username')
  async getUser(@Param('username') username: string): Promise<SerialisedUser> {
    return await this.userService.getUser(username);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get user games by username' })
  @UseGuards(JwtAuthGuard)
  @Get('/games/:username')
  async getUserGames(
    @Param('username') username: string,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginationResponse<any>> {
    return await this.userService.getUserGames(username, query);
  }

  @ApiResponse({
    status: 200,
    content: {
      schema: {
        example: {
          username: 'john_doe',
          email: 'valid@email.com',
        },
      },
    },
    description: 'Update user by username',
    type: UpdateUserDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(
    @UserDecorator() user: User,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(user.id, body);
  }
}
