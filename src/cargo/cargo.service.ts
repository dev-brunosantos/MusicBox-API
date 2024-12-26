import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CargoService {

  constructor(private prisma: PrismaService) {}

  create(createCargoDto: CreateCargoDto) {
    return 'This action adds a new cargo';
  }

  async Listar() {
    const cargos = await this.prisma.cargo.findMany()
    if(!cargos) {
      throw new HttpException("Não existe nenhum registro de cargos cadastrado no sistema.", HttpStatus.NOT_FOUND)
    } 

    return cargos
  }

  findOne(id: number) {
    return `This action returns a #${id} cargo`;
  }

  update(id: number, updateCargoDto: UpdateCargoDto) {
    return `This action updates a #${id} cargo`;
  }

  remove(id: number) {
    return `This action removes a #${id} cargo`;
  }
}
