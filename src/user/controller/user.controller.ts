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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:username')
  async getUser(@Param('username') username: string) {
    return await this.userService.getUser(username);
  }

  @Get('/:username/games')
  async getUserGames(
    @Param('username') username: string,
    @Query() query: PaginationQueryDto,
  ) {
    return await this.userService.getUserGames(username, query);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(
    @Req() req: Request,
    @Body() body: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return await this.userService.update((<any>req).user.username, body);
  }
}
