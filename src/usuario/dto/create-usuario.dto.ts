import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    nome: string;
    
    @IsOptional()
    @IsString()
    @MinLength(3)
    sobrenome?: string;
    
    @IsString()
    @MinLength(10)
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @MinLength(6, { message: "A senha deve conter no mínimo 6 caracteres."})
    @IsNotEmpty()
    senha: string;
}
