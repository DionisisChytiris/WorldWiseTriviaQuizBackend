import { Reply } from 'src/replies/reply.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: string; // <-- Unique user identifier

  @Column()
  content: string;

  @Column({ nullable: true })
  sender: string; // or userId if you have user entities

  @Column({ nullable: true })
  reply: string;

  @Column({ nullable: true })
  repliedBy: string; // admin's name or ID

  @CreateDateColumn()
  sentAt: Date;

  @OneToMany(() => Reply, (reply) => reply.message, { cascade: true })
  replies: Reply[];
}
