import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response as ExpressResponse, Request } from 'express';
import { ChatService } from './chat.service';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  // this is for bigInt because it cannot be serialized
  private toObject() {
    return JSON.parse(
      JSON.stringify(
        this,
        (_, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
      ),
    );
  }

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
  async getAll(
    @Req() req: Request,
    @Res({ passthrough: true }) expressResponse: ExpressResponse,
  ) {
    const response = await this.chatService.getAllLatestMessages(
      (req as any)?.user?.id,
    );
    const { status, content } = response;
    expressResponse.status(status).send(this.toObject.call(content));
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
  @Get('individual')
  async getIndividualMessagesWithAUser(
    @Req() req: Request,
    @Query() query: PaginationQueryDto,
    @Query('user') receiverId: string,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const res = await this.chatService.getIndividualMessages(
      (req as any)?.user?.id,
      query,
      receiverId,
    );
    const { status, content } = res;
    response.status(status).send(this.toObject.call(content));
  }
}
