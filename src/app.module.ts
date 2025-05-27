import { Module, Inject } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './DB/db.module';
import dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [DBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(@Inject('DATABASE_CONNECTION') private readonly connection) {}
}
