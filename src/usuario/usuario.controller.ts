import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  Cadastrar(@Body() createUsuarioDto: CreateUsuarioDto) {
   return this.usuarioService.Criar(createUsuarioDto)
  }

  @Get()
  findAll() {
    return this.usuarioService.Listar();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.Usuario(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.Atualizar(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.Apagar(id);
  }
}
