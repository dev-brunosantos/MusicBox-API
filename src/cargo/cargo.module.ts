import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoController } from './cargo.controller';
import { PrismaModule } from '../prisma/prisma.module';
// FUNÇÃO TESTE
import { FunctionsModule } from 'src/functions/functions.module';

@Module({
  imports: [PrismaModule, FunctionsModule],
  controllers: [CargoController],
  providers: [CargoService],
})
export class CargoModule {}
