import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response as ExpressResponse, Request } from 'express';
import { ChatService } from './chat.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { toObject } from 'src/global/interfaces';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'For each conversation of a User X get it latest message',
  })
  @ApiResponse({
    status: 404,
    description: 'User was not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to retrieve messages from database',
  })
  @ApiTags('chat')
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAll(@Req() req: Request, @Res() expressResponse: ExpressResponse) {
    try {
      const response = await this.chatService.getAllLatestMessages(
        (req as any)?.user?.id,
      );
      const { status, content } = response;
      return expressResponse.status(status).json(toObject.call(await content));
    } catch (e) {
      return expressResponse.status(500).json('Internal Server Error');
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Return all messages between the logged in user and a user',
  })
  @ApiResponse({
    status: 404,
    description:
      'Either the logged in user does not exist or the other user does not exist',
  })
  @ApiResponse({
    status: 500,
    description: 'Failed to retrieve messages from database',
  })
  @ApiTags('chat')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('individual/:user')
  async getIndividualMessagesWithAUser(
    @Req() req: Request,
    @Param('user') receiverId: string,
    @Res() response: ExpressResponse,
  ) {
    try {
      const res = await this.chatService.getIndividualMessages(
        (req as any)?.user?.id,
        receiverId,
      );
      if (res) {
        return response.status(res.status).json(toObject.call(res.content));
      }
    } catch {
      return response.status(500).json('Internal Server Error');
    }
  }
}
