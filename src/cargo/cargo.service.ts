import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { PrismaService } from '../prisma/prisma.service'
import { FunctionsService } from '../functions/functions.service';

@Injectable()
export class CargoService {

  constructor(
    private prisma: PrismaService,
    private formata: FunctionsService
  ) { }

  async Criar(createCargoDto: CreateCargoDto) {
    const cargoExistente = await this.prisma.cargo.findFirst({
      where: { cargo: createCargoDto.cargo }
    })

    if (cargoExistente) {
      throw new HttpException("O cargo informado ja esta cadastrado no bando de dados.", HttpStatus.CONFLICT)
    }

    const criarCargo = await this.prisma.cargo.create({
      data: {
        cargo: createCargoDto.cargo
      }
    })

    return { mensagem: `O cargo ${criarCargo.cargo.toUpperCase()} foi cadastrado com sucesso.` }
  }

  async Listar() {
    const cargos = await this.prisma.cargo.findMany()
    if (!cargos) {
      throw new HttpException("Não existe nenhum registro de cargos cadastrado no sistema.", HttpStatus.NOT_FOUND)
    }

    return cargos
  }

  async FiltrarId(id: number) {
    const cargoId = await this.prisma.cargo.findFirst({ where: { id } })

    if (!cargoId) {
      throw new HttpException("Não foi encontrado nenhum cargo vinculado ao ID informado.", HttpStatus.NOT_FOUND)
    }

    return cargoId
  }

  async FiltrarNome(cargo: string) {
    const cargoNome = await this.prisma.cargo.findFirst({ where: { cargo } })

    if (!cargoNome) {
      throw new HttpException("Não foi encontrado nenhum cargo com o nome informado.", HttpStatus.NOT_FOUND)
    }

    return cargoNome
  }

  async Atualizar(id: number, updateCargoDto: UpdateCargoDto) {
    try {
      const idCargo = await this.prisma.cargo.findFirst({
        where: { id },
        select: {
          id: true,
          cargo: true,
          dt_atualizacao: true
        }
      })

      
      if (idCargo) {

        const cargoEditado = await this.prisma.cargo.update({
          where: { id },
          data: updateCargoDto
        })

        return {
          status: "Atualização realizada com sucesso.",
          dados_antigos: idCargo,
          dados_atualizados: cargoEditado
        }
      }


      throw new HttpException("Nenhum cargo foi encontrado com o vinculado ao ID informado.", HttpStatus.NOT_FOUND)

    } catch (error) {
      throw new HttpException("Erro interno! Por favor, tente novamente.", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async Apagar(id: number) {
    try {
      const cargoId = await this.prisma.cargo.findFirst({ where: { id }})

      if(!cargoId) {
        throw new HttpException("Não foi encontrado nenhum cargo vinculado ao ID informado.", HttpStatus.NOT_FOUND)
      }

      await this.prisma.cargo.delete({ where: { id }})
      
      return { mensagem: `O cargo ${cargoId.cargo.toUpperCase()} foi apagado com sucesso.`}

    } catch (error) {
      throw new HttpException("Erro interno! Por favor, tente novamente.", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
