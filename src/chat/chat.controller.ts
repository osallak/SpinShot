import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { ChatService } from './chat.service';
import { PaginationQueryDto } from 'src/global/dto/pagination-query.dto';

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

  @Get('all/:id')
  async getAll(
    @Param('id') param: string,
    @Res({ passthrough: true }) expressResponse: ExpressResponse,
  ) {
    const response = await this.chatService.getAllLatestMessages(param);
    const { status, content } = response;
    expressResponse.status(status).send(this.toObject.call(content));
  }

  @Get('individual/:id')
  async getIndividualMessagesWithAUser(
    @Param('id') userId: string,
    @Query() query: PaginationQueryDto,
    @Query('user') receiverId: string,
    @Res({ passthrough: true }) response: ExpressResponse,
  ) {
    const res = await this.chatService.getIndividualMessages(
      userId,
      query,
      receiverId,
    );
    const { status, content } = res;
    response.status(status).send(this.toObject.call(content));
  }
}
