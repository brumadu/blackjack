import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Sessions } from './sessions.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      username: 'postgres',
      password: 'postgres',
      port: 5432,
      entities: [User, Sessions],
      synchronize: true,
      logging: true
    }),
  ],
})
export class DatabaseModule {}
