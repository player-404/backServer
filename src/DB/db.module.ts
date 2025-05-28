import { Module } from '@nestjs/common';
import { DBproviders } from './db.prividers';

@Module({
  providers: [DBproviders],
  exports: [DBproviders],
})
export class DBModule {}
