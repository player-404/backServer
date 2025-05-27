import { Module } from '@nestjs/common';
import { DBController } from './db.controller';
import { DBService } from './db.service';
import { DBproviders } from './db.prividers';

@Module({
  providers: [DBService, DBproviders],
  exports: [DBService],
  controllers: [DBController],
})
export class DBModule {}
