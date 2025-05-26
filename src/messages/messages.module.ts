import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message } from './message.entity';
import { Reply } from 'src/replies/reply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Reply])],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
