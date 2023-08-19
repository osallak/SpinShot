import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  Query,
  Patch,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { UserService } from '../user.service';
import { Request } from 'express';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerialisedUser, User } from 'src/types';
import { PaginationResponse } from 'src/global/interfaces';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiTags('user')
  @ApiResponse({ status: 200, description: 'Get user by username' })
  @Get('/:username')
  async getUser(@Param('username') username: string): Promise<SerialisedUser> {
    return await this.userService.getUser(username);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiTags('user')
  @ApiResponse({ status: 200, description: 'Get user games by username' })
  @Get('/:username/games')
  async getUserGames(
    @Param('username') username: string,
    @Query() query: PaginationQueryDto,
  ): Promise<PaginationResponse<any>> {
    return await this.userService.getUserGames(username, query);
  }

  @ApiTags('user')
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
    @Req() req: Request,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update((<any>req).user.id, body);
    //todo: should i return a new jwt token? (make sure that it's signed with email instead of username)
  }
}
