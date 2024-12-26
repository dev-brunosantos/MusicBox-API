import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CargoService {

  constructor(private prisma: PrismaService) {}

  async Criar(createCargoDto: CreateCargoDto) {
    const cargoExistente = await this.prisma.cargo.findFirst({
      where: { cargo: createCargoDto.cargo }
    })

    if(cargoExistente) {
      throw new HttpException("O cargo informado ja esta cadastrado no bando de dados.", HttpStatus.CONFLICT)
    }

    const criarCargo = await this.prisma.cargo.create({
      data: {
        cargo: createCargoDto.cargo
      }
    })

    return { mensagem: `O cargo ${criarCargo.cargo.toUpperCase()} foi cadastrado com sucesso.`}
  }

  async Listar() {
    const cargos = await this.prisma.cargo.findMany()
    if(!cargos) {
      throw new HttpException("Não existe nenhum registro de cargos cadastrado no sistema.", HttpStatus.NOT_FOUND)
    } 

    return cargos
  }

  async FiltrarId(id: number) {
    const cargoId = await this.prisma.cargo.findFirst({ where: { id }})

    if(!cargoId) {
      throw new HttpException("Não foi encontrado nenhum cargo vinculado ao ID informado.", HttpStatus.NOT_FOUND)
    }

    return cargoId
  }

  update(id: number, updateCargoDto: UpdateCargoDto) {
    return `This action updates a #${id} cargo`;
  }

  remove(id: number) {
    return `This action removes a #${id} cargo`;
  }
}
