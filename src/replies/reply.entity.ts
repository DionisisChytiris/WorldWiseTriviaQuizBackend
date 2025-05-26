import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Message } from '../messages/message.entity';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reply: string;

  @Column()
  repliedBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Message, (message) => message.replies, {
    onDelete: 'CASCADE',
  })
  message: Message;
}
