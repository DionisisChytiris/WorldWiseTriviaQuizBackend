import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        synchronize: true,
        autoLoadEntities: true,
        ssl: {
          rejectUnauthorized: false, // if needed on Render
        },
      }),
    }),
    MessagesModule,
  ],
})
export class AppModule {}
