import { Module } from '@nestjs/common';
import { FunctionsService } from './functions.service';

@Module({
  providers: [FunctionsService],
  exports: [FunctionsService]
})
export class FunctionsModule {}
