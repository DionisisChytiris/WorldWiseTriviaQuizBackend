import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Message } from './messages/message.entity';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // or container name if using Docker
      port: 5432,
      username: 'postgres',
      password: 'DiosCfu!8200',
      database: 'testingNest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // disable in production
    }),
    MessagesModule,
  ],
})
export class AppModule {}
