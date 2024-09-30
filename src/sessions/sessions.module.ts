import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sessions } from 'src/database/sessions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sessions]), UserModule],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
