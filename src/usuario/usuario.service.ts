import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuarioService {

  constructor(private prisma: PrismaService) { }

  async Criar(createUsuarioDto: CreateUsuarioDto) {
    const usuarioExistente = await this.prisma.usuario.findFirst({
      where: { email: createUsuarioDto.email }
    })

    if (!usuarioExistente) {
      const novoUsuario = await this.prisma.usuario.create({
        data: {
          nome: createUsuarioDto.nome,
          sobrenome: createUsuarioDto.sobrenome,
          email: createUsuarioDto.email,
          senha: createUsuarioDto.senha
        }
      })

      return {
        mensagem: `Usuário ${novoUsuario.nome.toUpperCase()} ${novoUsuario.sobrenome.toUpperCase()} foi cadastrado com sucesso. `
      }
    }

    throw new HttpException("Usuário já cadastrado no sistema, por gentileza, verificar.", HttpStatus.BAD_REQUEST)
  }

  async findAll() {
    const usuarios = await this.prisma.usuario.findMany()
    if (!usuarios) {
      throw new HttpException("Não existe nenhum usuário cadastrado no banco de dados.", HttpStatus.NOT_FOUND)
    }
    return usuarios
  }

  async findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  async remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
