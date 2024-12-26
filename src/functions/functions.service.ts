import { Injectable } from '@nestjs/common';

@Injectable()
export class FunctionsService {
    // formataDara(data: Date): string {
    //     const dataEntrada = data.toISOString().slice(0, 10).split("-")

    //     const dataFormatada = `${dataEntrada[2]}/${dataEntrada[1]}/${dataEntrada[0]}`

    //     return dataFormatada
    // }
    formataDara(dataInicial: number):string {
        if(typeof dataInicial !== 'number') {
            throw new Error("O valor forncedido não é um timestamp válido")
        }

        const data = new Date(dataInicial)
        const dataEntrada = data.toISOString().slice(0, 10).split("-")
        
        const dataFormatada = `${dataEntrada[2]}/${dataEntrada[1]}/${dataEntrada[0]}`
        
        return dataFormatada
    }
}
