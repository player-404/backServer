import { Module } from '@nestjs/common';
import { DBModule } from '../DB/db.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';

@Module({
  imports: [DBModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
