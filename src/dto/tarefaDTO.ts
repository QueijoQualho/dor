import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class TarefaDTO {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsOptional()
    @IsString()
    descricao?: string;

    @IsOptional()
    @IsString()
    data?: string;

    @IsNotEmpty()
    @IsEnum(['ALTA', 'MEDIA', 'BAIXA'])
    prioridade: string;

    @IsNotEmpty()
    @IsEnum(['A_FAZER', 'FAZENDO', 'CONCLUIDA'])
    status: string;

    @IsNotEmpty()
    userId: number; 
}
