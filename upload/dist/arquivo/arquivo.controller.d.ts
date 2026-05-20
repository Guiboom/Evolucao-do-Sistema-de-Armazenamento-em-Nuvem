import { ExceptionFilter, ArgumentsHost, PayloadTooLargeException } from '@nestjs/common';
import { ArquivoService } from './arquivo.service';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
export declare class TamanhoArquivoFilter implements ExceptionFilter {
    catch(exception: PayloadTooLargeException, host: ArgumentsHost): void;
}
export declare class ArquivoController {
    private readonly arquivoService;
    constructor(arquivoService: ArquivoService);
    uploadFile(file: Express.Multer.File): {
        message: string;
        arquivo: string;
    };
    findAll(): {
        total: number;
        files: {
            filename: string;
            size: number;
            criado: Date;
        }[];
    };
    findOne(id: string): string;
    update(id: string, updateArquivoDto: UpdateArquivoDto): string;
    remove(nome: string): {
        message: string;
    };
}
