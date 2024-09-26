import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionsModule } from './sessions/sessions.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SessionsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
