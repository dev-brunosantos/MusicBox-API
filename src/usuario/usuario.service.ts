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

  async Listar() {
    const usuarios = await this.prisma.usuario.findMany()
    if (!usuarios) {
      throw new HttpException("Não existe nenhum usuário cadastrado no banco de dados.", HttpStatus.NOT_FOUND)
    }
    return usuarios
  }

  async Usuario(id: string) {
    const usuario = await this.prisma.usuario.findFirst({ where: { id } })

    if (!usuario) {
      throw new HttpException("Não existe nenhum usuário vinculado ao ID informado.", HttpStatus.NOT_FOUND)
    }
    return usuario;
  }

  async Atualizar(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const idUsuario = await this.prisma.usuario.findFirst({ where: { id } })

      if (!idUsuario) {
        throw new HttpException("Não existe nenhum usuário vinculado ao ID informado.", HttpStatus.NOT_FOUND)
      }

      const usuarioEditado = await this.prisma.usuario.update({
        where: { id },
        data: updateUsuarioDto
      })

      return {
        status: "Os dados foram atualizados com sucesso.",
        dados_antigos: idUsuario,
        dados_atualizados: usuarioEditado
      }
    } catch (error) {
      throw new HttpException("Tivemos um problema interno, por favor tente novamente.", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async Apagar(id: string) {
    try {
      const usuarioExistente = await this.prisma.usuario.findFirst({
        where: { id }
      })

      if (!usuarioExistente) {
        throw new HttpException("Não existe nenhum usuário vinculado ao ID informado.", HttpStatus.NOT_FOUND)
      }

      await this.prisma.usuario.delete({ where: { id } })

      return {
        mensagem: `Dados do usuário ${usuarioExistente.nome.toUpperCase()} ${usuarioExistente.sobrenome.toUpperCase()} foram apagados com sucesso.`
      }
    } catch (error) {
      throw new HttpException("Tivemos um problema interno, por favor tente novamente.", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
