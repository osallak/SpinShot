import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards';
import { FriendsGuard } from 'src/friends/guards/friends.guard';
import { UserDecorator } from 'src/global/decorators/global.decorators';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';
import { PaginationResponse } from 'src/global/interfaces';
import { SerialisedUser, User } from 'src/types';
import { SearchDto } from './dto/search.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyPasswordDto } from './dto/verify-password.dto';
import {
  GetProfileDoc,
  GetUserGamesDoc,
  SearchDoc,
  UpdateUserDoc,
} from './swagger/user.swagger';
import { UserService } from './user.service';
import { UserStatus } from '@prisma/client';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SearchDoc()
  @Get()
  async search(@Query() query: SearchDto): Promise<PaginationResponse<User[]>> {
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
  @Get('/games/:id')
  async getUserGames(
    @Param('id') id: string,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginationResponse<any>> {
    return await this.userService.getUserGames(id, query);
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

  @GetProfileDoc()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get the current user',
    schema: {
      example: {},
    },
  })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@UserDecorator() user: User): Promise<SerialisedUser> {
    return await this.userService.getUser(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('application/json')
  @Put('/me/password')
  async verifyPassword(
    @UserDecorator() user: User,
    @Body() body: VerifyPasswordDto,
    @Res() res: Response,
  ): Promise<void> {
    const isMatch = await this.userService.verifyPassword(
      user?.id,
      body.password,
    );
    isMatch ? res.sendStatus(200) : res.sendStatus(401);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/status/:id')
  async getUserStatus(@Param('id') id: string): Promise<{status: UserStatus}> {
    return await this.userService.getUserStatus(id);
  }
}
