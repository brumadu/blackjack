import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService],
  imports: [UserModule],
})
export class SessionsModule {}
