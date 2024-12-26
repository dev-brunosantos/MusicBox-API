import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';

@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Post()
  create(@Body() createCargoDto: CreateCargoDto) {
    return this.cargoService.Criar(createCargoDto);
  }

  @Get()
  findAll() {
    return this.cargoService.Listar();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cargoService.FiltrarId(Number(id));
  }

  @Get('nome/:cargo')
  buscarCargoNome(@Param('cargo') cargo: string) {
    return this.cargoService.FiltrarNome(cargo)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCargoDto: UpdateCargoDto) {
    return this.cargoService.Atualizar(Number(id), updateCargoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cargoService.Apagar(Number(id));
  }
}
