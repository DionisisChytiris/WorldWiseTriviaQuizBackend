// src/messages/messages.controller.ts
import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { ReplyMessageDto } from 'src/dto/reply-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.messagesService.create(dto);
  }
  @Post('reply/:id')
  replyToMessage(@Param('id') id: string, @Body() dto: ReplyMessageDto) {
    return this.messagesService.replyToMessage(+id, dto);
  }
  @Get('users')
  async getAllUserIds(): Promise<string[]> {
    return this.messagesService.findAllUserIds();
  }

  @Get('user-messages/:userId')
  async getUserMessagesWithReplies(@Param('userId') userId: string) {
    return this.messagesService.findMessagesWithRepliesByUserId(userId);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':userId')
  findByUserId(@Param('userId') userId: string) {
    return this.messagesService.findByUserId(userId);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.messagesService.remove(+id);
    if (!deleted) {
      throw new NotFoundException('Message not found');
    }
    return { message: 'Deleted successfully' };
  }
}
