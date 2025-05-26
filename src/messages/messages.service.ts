// // src/messages/messages.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Message } from './message.entity';
// import { CreateMessageDto } from '../dto/create-message.dto';
// import { ReplyMessageDto } from 'src/dto/reply-message.dto';
// import { Reply } from 'src/replies/reply.entity';

// @Injectable()
// export class MessagesService {
//   constructor(
//     @InjectRepository(Message)
//     private messageRepo: Repository<Message>,
//     @InjectRepository(Reply)
//     private readonly replyRepository: Repository<Reply>,
//   ) {}

//   create(dto: CreateMessageDto) {
//     const msg = this.messageRepo.create(dto);
//     return this.messageRepo.save(msg);
//   }
//   findAll() {
//     return this.messageRepo.find();
//   }
//   async remove(id: number) {
//     const message = await this.messageRepo.findOneBy({ id });
//     if (!message) {
//       throw new Error('Message not found');
//     }
//     return this.messageRepo.remove(message);
//   }
//   // messages.service.ts
//   async replyToMessage(id: number, dto: ReplyMessageDto) {
//     const message = await this.messageRepo.findOneBy({ id });
//     if (!message) throw new Error('Message not found');

//     message.reply = dto.reply;
//     message.repliedBy = dto.repliedBy;
//     return this.messageRepo.save(message);
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from '../dto/create-message.dto';
import { ReplyMessageDto } from '../dto/reply-message.dto';
import { Reply } from '../replies/reply.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
  ) {}

  async create(dto: CreateMessageDto) {
    const message = this.messageRepository.create(dto); // includes userId
    return this.messageRepository.save(message);
  }

  async findAll() {
    return this.messageRepository.find({
      relations: ['replies'],
      order: { sentAt: 'DESC' },
    });
  }

  async findByUserId(userId: string) {
    return this.messageRepository.find({
      where: { userId },
      relations: ['replies'],
      order: { sentAt: 'DESC' },
    });
  }

  async findAllUserIds(): Promise<string[]> {
    const userIds: { userId: string }[] = await this.messageRepository
      .createQueryBuilder('message')
      .select('DISTINCT "userId"', 'userId') // <-- Fix: use quotes here
      .where('"userId" IS NOT NULL')
      .getRawMany();

    return userIds.map((row) => row.userId);
  }

  async replyToMessage(id: number, dto: ReplyMessageDto) {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['replies'],
    });

    if (!message) throw new NotFoundException('Message not found');

    const reply = this.replyRepository.create({
      reply: dto.reply,
      repliedBy: dto.repliedBy,
      message,
    });

    return this.replyRepository.save(reply);
  }

  async findMessagesWithRepliesByUserId(userId: string) {
    // Example with TypeORM relations:
    return this.messageRepository.find({
      where: { userId },
      relations: ['replies'], // assuming 'replies' is relation set up
      order: {
        sentAt: 'DESC',
        replies: {
          createdAt: 'ASC',
        },
      },
    });
  }

  async remove(id: number) {
    const result = await this.messageRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
