import { Injectable } from '@nestjs/common';

@Injectable()
export class FunctionsService {
    formataDara(dataInicial: Date) {
        const data = new Date(dataInicial)
        const dataEntrada = data.toISOString().slice(0, 10).split("-")
        
        const dataFormatada = `${dataEntrada[2]}/${dataEntrada[1]}/${dataEntrada[0]}`
        
        return dataFormatada
    }
}
