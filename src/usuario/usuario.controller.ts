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
  Listar() {
    return this.usuarioService.Listar();
  }

  @Get(':id')
  Filtrar(@Param('id') id: string) {
    return this.usuarioService.Usuario(id);
  }

  @Patch(':id')
  Editar(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.Atualizar(id, updateUsuarioDto);
  }

  @Delete(':id')
  Apagar(@Param('id') id: string) {
    return this.usuarioService.Apagar(id);
  }
}
