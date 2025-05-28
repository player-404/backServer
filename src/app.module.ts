import { Module, Inject } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './DB/db.module';
import { UserModule } from './user/user.module';
import dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [DBModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(@Inject('DATABASE_CONNECTION') private readonly connection) {}
}
