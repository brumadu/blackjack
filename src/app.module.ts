import { Module } from '@nestjs/common';
import { SessionsModule } from './sessions/sessions.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, SessionsModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
