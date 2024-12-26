import { Module } from '@nestjs/common';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CargoModule } from 'src/cargo/cargo.module';

@Module({
  imports: [UsuarioModule, CargoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
